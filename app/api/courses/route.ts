import { NextRequest, NextResponse } from "next/server"
import { getCourses } from "@/lib/db/queries"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const category = searchParams.get('category') || undefined
    const level = searchParams.get('level') || undefined
    const price = searchParams.get('price') || undefined
    const rating = searchParams.get('rating') ? parseFloat(searchParams.get('rating')!) : undefined
    const language = searchParams.get('language') || undefined
    const sort = (searchParams.get('sort') as any) || 'newest'

    const filters = {
      category,
      level,
      price,
      rating,
      language
    }

    const result = await getCourses(filters, sort, page, limit)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Courses API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}