import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import nodemailer from "nodemailer"
import { translations } from "@/components/language-provider"

const bookingSchema = z.object({
  courseId: z.string().min(1, "Course selection is required"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().min(2, "Location is required"),
  message: z.string().optional()
})

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = bookingSchema.parse(body)

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: validatedData.courseId },
      select: {
        id: true,
        title: true,
        price: true,
        currency: true
      }
    })

    if (!course) {
      return NextResponse.json(
        { error: "Selected course not found" },
        { status: 404 }
      )
    }

    // Create guest booking
    const booking = await prisma.guestBooking.create({
      data: {
        courseId: validatedData.courseId,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        fullName: validatedData.fullName,
        email: validatedData.email,
        phone: validatedData.phone,
        location: validatedData.location,
        message: validatedData.message
      }
    })

    // Send email notification (using English for now, can be enhanced for multi-language)
    try {
      const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: process.env.CENTER_EMAIL || 'center@example.com', // Center's email
        subject: `New Course Booking: ${course.title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">${translations.en["booking.email.new_booking"]}</h2>

            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e293b;">${translations.en["booking.email.course_details"]}</h3>
              <p><strong>${translations.en["course.title"]}:</strong> ${course.title}</p>
              <p><strong>${translations.en["course.price"]}:</strong> ${course.currency} ${course.price || translations.en["course.free"]}</p>
            </div>

            <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #1e293b;">${translations.en["booking.email.student_details"]}</h3>
              <p><strong>${translations.en["booking.email.full_name"]}:</strong> ${validatedData.fullName}</p>
              <p><strong>${translations.en["booking.email.first_name"]}:</strong> ${validatedData.firstName}</p>
              <p><strong>${translations.en["booking.email.last_name"]}:</strong> ${validatedData.lastName}</p>
              <p><strong>${translations.en["booking.email.email"]}:</strong> ${validatedData.email}</p>
              <p><strong>${translations.en["booking.email.phone"]}:</strong> ${validatedData.phone || translations.en["booking.email.phone_not_provided"]}</p>
              <p><strong>${translations.en["booking.email.location"]}:</strong> ${validatedData.location}</p>
              ${validatedData.message ? `<p><strong>${translations.en["booking.email.message"]}:</strong> ${validatedData.message}</p>` : ''}
            </div>

            <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #92400e;">
                <strong>${translations.en["booking.email.booking_id"]}:</strong> ${booking.id}<br>
                <strong>${translations.en["booking.email.booking_date"]}:</strong> ${new Date(booking.createdAt).toLocaleDateString()}
              </p>
            </div>

            <p style="color: #64748b; font-size: 14px;">
              ${translations.en["booking.email.contact_soon"]}
            </p>
          </div>
        `
      }

      await transporter.sendMail(mailOptions)
    } catch (emailError) {
      console.error("Email sending failed:", emailError)
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        courseTitle: course.title,
        status: booking.status,
        createdAt: booking.createdAt
      },
      message: "Booking submitted successfully! We'll contact you soon."
    })

  } catch (error) {
    console.error("Booking error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to submit booking. Please try again." },
      { status: 500 }
    )
  }
}