import { prisma } from '../prisma'
import { Prisma } from '@prisma/client'
import type { 
  CourseWithDetails, 
  CourseCard, 
  EnrollmentWithProgress,
  CourseFilters,
  CourseSort,
  PaginatedResponse 
} from './types'

// ============================================================================
// COURSE QUERIES
// ============================================================================

export async function getCourseById(id: string): Promise<CourseWithDetails | null> {
  return prisma.course.findUnique({
    where: { id },
    include: {
      owner: {
        include: {
          instructorProfile: true
        }
      },
      category: true,
      modules: {
        include: {
          lessons: {
            include: {
              quiz: true,
              assignment: true
            }
          }
        },
        orderBy: {
          sortOrder: 'asc'
        }
      },
      instructors: {
        include: {
          user: true
        }
      },
      reviews: {
        include: {
          author: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
      _count: {
        select: {
          enrollments: true,
          reviews: true
        }
      }
    }
  })
}

export async function getCourses(
  filters: CourseFilters = {},
  sort: CourseSort = 'newest',
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<CourseCard>> {
  const skip = (page - 1) * limit
  
  // Build where clause
  const where: Prisma.CourseWhereInput = {
    isPublished: true,
    ...(filters.category && {
      category: {
        slug: filters.category
      }
    }),
    ...(filters.level && {
      level: filters.level
    }),
    ...(filters.price === 'free' && {
      isFree: true
    }),
    ...(filters.price === 'paid' && {
      isFree: false
    }),
    ...(filters.rating && {
      averageRating: {
        gte: filters.rating
      }
    }),
    ...(filters.language && {
      language: filters.language
    })
  }
  
  // Build orderBy clause
  const orderBy: Prisma.CourseOrderByWithRelationInput = (() => {
    switch (sort) {
      case 'newest':
        return { createdAt: 'desc' }
      case 'oldest':
        return { createdAt: 'asc' }
      case 'popular':
        return { enrollCount: 'desc' }
      case 'rating':
        return { averageRating: 'desc' }
      case 'price-low':
        return { price: 'asc' }
      case 'price-high':
        return { price: 'desc' }
      case 'alphabetical':
        return { title: 'asc' }
      default:
        return { createdAt: 'desc' }
    }
  })()
  
  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        category: {
          select: {
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true
          }
        }
      }
    }),
    prisma.course.count({ where })
  ])
  
  return {
    data: courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  }
}

export async function searchCourses(
  query: string,
  filters: CourseFilters = {},
  page: number = 1,
  limit: number = 12
): Promise<PaginatedResponse<CourseCard>> {
  const skip = (page - 1) * limit
  
  const where: Prisma.CourseWhereInput = {
    isPublished: true,
    OR: [
      {
        title: {
          contains: query,
          mode: 'insensitive'
        }
      },
      {
        description: {
          contains: query,
          mode: 'insensitive'
        }
      },
      {
        tags: {
          has: query
        }
      }
    ],
    ...filters
  }
  
  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      where,
      skip,
      take: limit,
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            avatar: true
          }
        },
        category: {
          select: {
            name: true,
            slug: true
          }
        },
        _count: {
          select: {
            enrollments: true,
            reviews: true
          }
        }
      },
      orderBy: {
        _relevance: {
          fields: ['title', 'description'],
          search: query,
          sort: 'desc'
        }
      }
    }),
    prisma.course.count({ where })
  ])
  
  return {
    data: courses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    }
  }
}

// ============================================================================
// USER QUERIES
// ============================================================================

export async function getUserEnrollments(
  userId: string,
  status?: 'active' | 'completed'
): Promise<EnrollmentWithProgress[]> {
  return prisma.enrollment.findMany({
    where: {
      studentId: userId,
      ...(status === 'completed' && {
        completedAt: {
          not: null
        }
      }),
      ...(status === 'active' && {
        completedAt: null
      })
    },
    include: {
      course: {
        include: {
          modules: {
            include: {
              lessons: true
            }
          }
        }
      },
      progress: {
        include: {
          lesson: true
        }
      }
    },
    orderBy: {
      enrolledAt: 'desc'
    }
  })
}

export async function getUserProgress(
  userId: string,
  courseId: string
) {
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: userId,
        courseId: courseId
      }
    },
    include: {
      progress: {
        include: {
          lesson: {
            include: {
              module: true
            }
          }
        }
      },
      course: {
        include: {
          modules: {
            include: {
              lessons: true
            }
          }
        }
      }
    }
  })
  
  if (!enrollment) return null
  
  const totalLessons = enrollment.course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  )
  
  const completedLessons = enrollment.progress.filter(
    p => p.isCompleted
  ).length
  
  return {
    ...enrollment,
    stats: {
      totalLessons,
      completedLessons,
      progressPercentage: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
    }
  }
}

// ============================================================================
// ANALYTICS QUERIES
// ============================================================================

export async function getCourseAnalytics(courseId: string, instructorId: string) {
  // Verify instructor owns the course
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      ownerId: instructorId
    }
  })
  
  if (!course) throw new Error('Course not found or access denied')
  
  const [
    enrollments,
    completions,
    reviews,
    revenue
  ] = await Promise.all([
    prisma.enrollment.count({
      where: { courseId }
    }),
    prisma.enrollment.count({
      where: {
        courseId,
        completedAt: { not: null }
      }
    }),
    prisma.review.aggregate({
      where: { courseId },
      _avg: { rating: true },
      _count: { rating: true }
    }),
    prisma.enrollment.aggregate({
      where: {
        courseId,
        paymentStatus: 'paid'
      },
      _sum: { paymentAmount: true }
    })
  ])
  
  return {
    totalEnrollments: enrollments,
    completionRate: enrollments > 0 ? (completions / enrollments) * 100 : 0,
    averageRating: reviews._avg.rating || 0,
    totalReviews: reviews._count.rating,
    totalRevenue: revenue._sum.paymentAmount || 0
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

export async function updateCourseStats(courseId: string) {
  const [enrollCount, reviews] = await Promise.all([
    prisma.enrollment.count({
      where: { courseId }
    }),
    prisma.review.aggregate({
      where: { courseId },
      _avg: { rating: true }
    })
  ])
  
  await prisma.course.update({
    where: { id: courseId },
    data: {
      enrollCount,
      averageRating: reviews._avg.rating
    }
  })
}

export async function updateUserStats(userId: string) {
  const [instructorStats, studentStats] = await Promise.all([
    prisma.course.aggregate({
      where: { ownerId: userId },
      _count: { id: true },
      _sum: { enrollCount: true }
    }),
    prisma.enrollment.count({
      where: {
        studentId: userId,
        completedAt: { not: null }
      }
    })
  ])
  
  // Update instructor profile if exists
  await prisma.instructorProfile.updateMany({
    where: { userId },
    data: {
      totalCourses: instructorStats._count.id,
      totalStudents: instructorStats._sum.enrollCount || 0
    }
  })
  
  // Update student profile if exists
  await prisma.studentProfile.updateMany({
    where: { userId },
    data: {
      totalCoursesCompleted: studentStats
    }
  })
}