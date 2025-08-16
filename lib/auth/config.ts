import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Adapter } from "next-auth/adapters"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          },
          include: {
            profile: true,
            instructorProfile: true,
            studentProfile: true
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.firstName && user.lastName 
            ? `${user.firstName} ${user.lastName}` 
            : user.firstName || user.email,
          image: user.avatar,
          role: user.instructorProfile ? 'instructor' : 'student'
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.role = user.role
      }
      
      // Handle Google sign-in
      if (account?.provider === "google" && profile) {
        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email! },
          include: {
            instructorProfile: true,
            studentProfile: true
          }
        })

        if (existingUser) {
          token.role = existingUser.instructorProfile ? 'instructor' : 'student'
        } else {
          // Create new user with Google data
          const newUser = await prisma.user.create({
            data: {
              email: profile.email!,
              firstName: profile.given_name || profile.name?.split(' ')[0],
              lastName: profile.family_name || profile.name?.split(' ').slice(1).join(' '),
              avatar: profile.picture,
              emailVerified: true,
              profile: {
                create: {
                  profileVisibility: 'public'
                }
              },
              studentProfile: {
                create: {
                  skillLevel: 'beginner'
                }
              }
            }
          })
          token.role = 'student'
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        return true
      }
      return true
    }
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup",
  },
  events: {
    async createUser({ user }) {
      // This runs when a new user is created via OAuth
      console.log("New user created:", user.email)
    }
  }
}