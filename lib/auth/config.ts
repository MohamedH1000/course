import { NextAuthOptions, Profile } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Adapter } from "next-auth/adapters"

interface GoogleProfile extends Profile {
  given_name?: string
  family_name?: string
  picture?: string
  email_verified?: boolean
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        // Map Google profile to our user schema
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
          role: 'student' // Default role for new Google users
        }
      }
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
          image: user.avatar || undefined,
          role: user.instructorProfile ? 'instructor' : 'student'
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger }) {
      // When user first signs in
      if (account && user) {
        token.role = user.role || 'student'
        token.userId = user.id
      }
      
      // For subsequent requests, get the role from database
      if (token.userId && !token.role) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId as string },
          select: { role: true }
        })
        if (dbUser) {
          token.role = dbUser.role || 'student'
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
      if (account?.provider === "google" && profile?.email) {
        try {
          const googleProfile = profile as GoogleProfile
          
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: { email: googleProfile.email! },
            include: {
              profile: true,
              studentProfile: true,
              instructorProfile: true
            }
          })

          if (!existingUser) {
            // Create user with additional fields
            await prisma.user.create({
              data: {
                email: googleProfile.email!,
                firstName: googleProfile.given_name || googleProfile.name?.split(' ')[0] || 'Google',
                lastName: googleProfile.family_name || googleProfile.name?.split(' ').slice(1).join(' ') || 'User',
                avatar: googleProfile.picture || '',
                emailVerified: new Date(),
                role: 'student',
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
            console.log('Created new Google user:', googleProfile.email)
          } else {
            // Update existing user if needed
            if (!existingUser.profile) {
              await prisma.userProfile.create({
                data: {
                  userId: existingUser.id,
                  profileVisibility: 'public'
                }
              })
            }
            if (!existingUser.studentProfile && !existingUser.instructorProfile) {
              await prisma.studentProfile.create({
                data: {
                  userId: existingUser.id,
                  skillLevel: 'beginner'
                }
              })
            }
            console.log('Google user already exists:', googleProfile.email)
          }
          
          return true
        } catch (error) {
          console.error('Error during Google sign-in:', error)
          return false
        }
      }
      return true
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  events: {
    async createUser({ user }) {
      // This runs when a new user is created via OAuth
      console.log("New user created via OAuth:", user.email)
      
      // Ensure the user has the required fields
      try {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
          include: {
            profile: true,
            studentProfile: true
          }
        })
        
        if (dbUser) {
          console.log("User found in database:", dbUser.email)
          
          // Create profile if it doesn't exist
          if (!dbUser.profile) {
            await prisma.userProfile.create({
              data: {
                userId: dbUser.id,
                profileVisibility: 'public'
              }
            })
            console.log("Created user profile for:", dbUser.email)
          }
          
          // Create student profile if it doesn't exist
          if (!dbUser.studentProfile) {
            await prisma.studentProfile.create({
              data: {
                userId: dbUser.id,
                skillLevel: 'beginner'
              }
            })
            console.log("Created student profile for:", dbUser.email)
          }
          
          // Update role if not set
          if (!dbUser.role) {
            await prisma.user.update({
              where: { id: dbUser.id },
              data: { role: 'student' }
            })
            console.log("Updated role for:", dbUser.email)
          }
        }
      } catch (error) {
        console.error("Error in createUser event:", error)
      }
    }
  },
  debug: process.env.NODE_ENV === 'development' // Enable debug mode in development
}