import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["student", "instructor"]).default("student")
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Split name into first and last name
    const nameParts = name.trim().split(' ')
    const firstName = nameParts[0]
    const lastName = nameParts.slice(1).join(' ') || undefined

    // Create user with appropriate profile
    const userData: any = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      emailVerified: new Date(),
      profile: {
        create: {
          profileVisibility: 'public'
        }
      }
    }

    // Add role-specific profile
    if (role === 'instructor') {
      userData.instructorProfile = {
        create: {
          expertise: [],
          isVerified: false
        }
      }
    } else {
      userData.studentProfile = {
        create: {
          skillLevel: 'beginner',
          learningGoals: [],
          interests: []
        }
      }
    }

    const user = await prisma.user.create({
      data: userData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        createdAt: true,
        instructorProfile: {
          select: {
            id: true
          }
        },
        studentProfile: {
          select: {
            id: true
          }
        }
      }
    })

    // Return user data (excluding password)
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: `${user.firstName} ${user.lastName || ''}`.trim(),
        role: user.instructorProfile ? 'instructor' : 'student',
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    })

  } catch (error) {
    console.error("Registration error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}