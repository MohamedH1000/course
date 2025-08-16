import { Prisma } from '@prisma/client'

// User types with relations
export type UserWithProfile = Prisma.UserGetPayload<{
  include: {
    profile: true
    instructorProfile: true
    studentProfile: true
  }
}>

export type InstructorWithStats = Prisma.UserGetPayload<{
  include: {
    instructorProfile: true
    ownedCourses: {
      include: {
        enrollments: true
        reviews: true
      }
    }
  }
}>

// Course types with relations
export type CourseWithDetails = Prisma.CourseGetPayload<{
  include: {
    owner: {
      include: {
        instructorProfile: true
      }
    }
    category: true
    modules: {
      include: {
        lessons: {
          include: {
            quiz: true
            assignment: true
          }
        }
      }
      orderBy: {
        sortOrder: 'asc'
      }
    }
    instructors: {
      include: {
        user: true
      }
    }
    reviews: {
      include: {
        author: true
      }
    }
    _count: {
      select: {
        enrollments: true
        reviews: true
      }
    }
  }
}>

export type CourseCard = Prisma.CourseGetPayload<{
  include: {
    owner: {
      select: {
        firstName: true
        lastName: true
        avatar: true
      }
    }
    category: {
      select: {
        name: true
        slug: true
      }
    }
    _count: {
      select: {
        enrollments: true
        reviews: true
      }
    }
  }
}>

// Enrollment with progress
export type EnrollmentWithProgress = Prisma.EnrollmentGetPayload<{
  include: {
    course: {
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    }
    progress: {
      include: {
        lesson: true
      }
    }
  }
}>

// Lesson with content
export type LessonWithContent = Prisma.LessonGetPayload<{
  include: {
    quiz: {
      include: {
        questions: true
      }
    }
    assignment: true
    attachments: true
    module: {
      include: {
        course: true
      }
    }
  }
}>

// Quiz with questions and attempts
export type QuizWithDetails = Prisma.QuizGetPayload<{
  include: {
    questions: true
    attempts: {
      include: {
        answers: true
      }
    }
    lesson: {
      include: {
        module: {
          include: {
            course: true
          }
        }
      }
    }
  }
}>

// Forum types
export type ForumPostWithReplies = Prisma.ForumPostGetPayload<{
  include: {
    author: {
      select: {
        id: true
        firstName: true
        lastName: true
        avatar: true
      }
    }
    replies: {
      include: {
        author: {
          select: {
            id: true
            firstName: true
            lastName: true
            avatar: true
          }
        }
        children: {
          include: {
            author: {
              select: {
                id: true
                firstName: true
                lastName: true
                avatar: true
              }
            }
          }
        }
      }
    }
    _count: {
      select: {
        replies: true
      }
    }
  }
}>

// Analytics types
export type CourseAnalytics = {
  totalEnrollments: number
  completionRate: number
  averageRating: number
  totalRevenue: number
  monthlyEnrollments: Array<{
    month: string
    count: number
  }>
  lessonEngagement: Array<{
    lessonId: string
    lessonTitle: string
    completionRate: number
    averageTimeSpent: number
  }>
}

export type UserAnalytics = {
  totalCourses: number
  totalStudents: number
  totalRevenue: number
  averageRating: number
  monthlyRevenue: Array<{
    month: string
    amount: number
  }>
}

// Search and filter types
export type CourseFilters = {
  category?: string
  level?: string
  price?: 'free' | 'paid' | 'all'
  rating?: number
  duration?: 'short' | 'medium' | 'long'
  language?: string
}

export type CourseSort = 
  | 'newest'
  | 'oldest' 
  | 'popular'
  | 'rating'
  | 'price-low'
  | 'price-high'
  | 'alphabetical'

// API Response types
export type PaginatedResponse<T> = {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}