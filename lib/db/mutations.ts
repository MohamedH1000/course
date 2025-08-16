import { prisma } from '../prisma'
import { Prisma } from '@prisma/client'

// ============================================================================
// COURSE MUTATIONS
// ============================================================================

export async function createCourse(data: {
  title: string
  description?: string
  categoryId?: string
  ownerId: string
  price?: number
  level: string
  language?: string
}) {
  const course = await prisma.course.create({
    data: {
      ...data,
      slug: generateSlug(data.title),
      isFree: !data.price || data.price === 0
    },
    include: {
      owner: true,
      category: true
    }
  })
  
  // Create default forum for the course
  await prisma.forum.create({
    data: {
      title: `${course.title} Discussion`,
      description: `Discussion forum for ${course.title}`,
      courseId: course.id
    }
  })
  
  return course
}

export async function updateCourse(
  courseId: string,
  ownerId: string,
  data: Partial<{
    title: string
    description: string
    shortDescription: string
    thumbnail: string
    price: number
    level: string
    maxStudents: number
    isPublished: boolean
    tags: string[]
  }>
) {
  // Verify ownership
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      ownerId
    }
  })
  
  if (!course) {
    throw new Error('Course not found or access denied')
  }
  
  const updateData: any = { ...data }
  
  // Update slug if title changed
  if (data.title) {
    updateData.slug = generateSlug(data.title)
  }
  
  // Update isFree based on price
  if (data.price !== undefined) {
    updateData.isFree = data.price === 0
  }
  
  return prisma.course.update({
    where: { id: courseId },
    data: updateData,
    include: {
      owner: true,
      category: true,
      modules: {
        include: {
          lessons: true
        }
      }
    }
  })
}

export async function deleteCourse(courseId: string, ownerId: string) {
  // Verify ownership
  const course = await prisma.course.findFirst({
    where: {
      id: courseId,
      ownerId
    }
  })
  
  if (!course) {
    throw new Error('Course not found or access denied')
  }
  
  // Check if course has enrollments
  const enrollmentCount = await prisma.enrollment.count({
    where: { courseId }
  })
  
  if (enrollmentCount > 0) {
    throw new Error('Cannot delete course with active enrollments')
  }
  
  return prisma.course.delete({
    where: { id: courseId }
  })
}

// ============================================================================
// MODULE & LESSON MUTATIONS
// ============================================================================

export async function createModule(data: {
  title: string
  description?: string
  courseId: string
  sortOrder: number
}) {
  return prisma.module.create({
    data,
    include: {
      lessons: true
    }
  })
}

export async function createLesson(data: {
  title: string
  description?: string
  content?: string
  videoUrl?: string
  duration?: number
  type: string
  moduleId: string
  createdById: string
  sortOrder: number
}) {
  return prisma.lesson.create({
    data,
    include: {
      module: {
        include: {
          course: true
        }
      }
    }
  })
}

export async function updateLessonProgress(
  enrollmentId: string,
  lessonId: string,
  data: {
    isCompleted?: boolean
    timeSpent?: number
    lastPosition?: number
    watchTime?: number
  }
) {
  const progress = await prisma.lessonProgress.upsert({
    where: {
      enrollmentId_lessonId: {
        enrollmentId,
        lessonId
      }
    },
    update: {
      ...data,
      ...(data.isCompleted && {
        completedAt: new Date()
      }),
      updatedAt: new Date()
    },
    create: {
      enrollmentId,
      lessonId,
      ...data,
      ...(data.isCompleted && {
        completedAt: new Date()
      })
    }
  })
  
  // Update enrollment progress percentage
  await updateEnrollmentProgress(enrollmentId)
  
  return progress
}

// ============================================================================
// ENROLLMENT MUTATIONS
// ============================================================================

export async function enrollStudent(
  studentId: string,
  courseId: string,
  paymentAmount?: number
) {
  // Check if already enrolled
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId,
        courseId
      }
    }
  })
  
  if (existingEnrollment) {
    throw new Error('Already enrolled in this course')
  }
  
  // Check course capacity
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      _count: {
        select: {
          enrollments: true
        }
      }
    }
  })
  
  if (!course) {
    throw new Error('Course not found')
  }
  
  if (course.maxStudents && course._count.enrollments >= course.maxStudents) {
    throw new Error('Course is full')
  }
  
  const enrollment = await prisma.enrollment.create({
    data: {
      studentId,
      courseId,
      paymentAmount,
      paymentStatus: paymentAmount ? 'paid' : 'free'
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
      }
    }
  })
  
  // Update course enrollment count
  await prisma.course.update({
    where: { id: courseId },
    data: {
      enrollCount: {
        increment: 1
      }
    }
  })
  
  return enrollment
}

export async function updateEnrollmentProgress(enrollmentId: string) {
  const enrollment = await prisma.enrollment.findUnique({
    where: { id: enrollmentId },
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
      progress: true
    }
  })
  
  if (!enrollment) return
  
  const totalLessons = enrollment.course.modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0
  )
  
  const completedLessons = enrollment.progress.filter(
    p => p.isCompleted
  ).length
  
  const progressPercentage = totalLessons > 0 
    ? (completedLessons / totalLessons) * 100 
    : 0
  
  const isCompleted = progressPercentage === 100
  
  return prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      progressPercentage,
      ...(isCompleted && !enrollment.completedAt && {
        completedAt: new Date()
      }),
      lastAccessedAt: new Date()
    }
  })
}

// ============================================================================
// QUIZ & ASSIGNMENT MUTATIONS
// ============================================================================

export async function createQuiz(data: {
  title: string
  description?: string
  lessonId: string
  createdById: string
  timeLimit?: number
  maxAttempts?: number
  passingScore?: number
}) {
  return prisma.quiz.create({
    data,
    include: {
      questions: true
    }
  })
}

export async function submitQuizAttempt(
  studentId: string,
  quizId: string,
  answers: Array<{
    questionId: string
    answer: any
  }>
) {
  // Check attempt limit
  const quiz = await prisma.quiz.findUnique({
    where: { id: quizId },
    include: {
      questions: true,
      attempts: {
        where: { studentId }
      }
    }
  })
  
  if (!quiz) {
    throw new Error('Quiz not found')
  }
  
  if (quiz.attempts.length >= quiz.maxAttempts) {
    throw new Error('Maximum attempts exceeded')
  }
  
  // Create attempt
  const attempt = await prisma.quizAttempt.create({
    data: {
      studentId,
      quizId,
      startedAt: new Date()
    }
  })
  
  // Process answers and calculate score
  let totalScore = 0
  let maxScore = 0
  
  for (const answerData of answers) {
    const question = quiz.questions.find(q => q.id === answerData.questionId)
    if (!question) continue
    
    maxScore += question.points
    
    // Simple answer checking (you'd implement more sophisticated logic)
    const isCorrect = JSON.stringify(question.correctAnswer) === JSON.stringify(answerData.answer)
    const points = isCorrect ? question.points : 0
    totalScore += points
    
    await prisma.quizAnswer.create({
      data: {
        attemptId: attempt.id,
        questionId: question.id,
        answer: answerData.answer,
        isCorrect,
        points
      }
    })
  }
  
  // Update attempt with results
  const passed = (totalScore / maxScore) * 100 >= quiz.passingScore
  
  return prisma.quizAttempt.update({
    where: { id: attempt.id },
    data: {
      completedAt: new Date(),
      score: totalScore,
      maxScore,
      passed
    },
    include: {
      answers: {
        include: {
          question: true
        }
      }
    }
  })
}

// ============================================================================
// REVIEW MUTATIONS
// ============================================================================

export async function createReview(data: {
  rating: number
  title?: string
  content?: string
  courseId: string
  authorId: string
}) {
  // Check if user is enrolled
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: data.authorId,
        courseId: data.courseId
      }
    }
  })
  
  if (!enrollment) {
    throw new Error('Must be enrolled to leave a review')
  }
  
  // Check if already reviewed
  const existingReview = await prisma.review.findFirst({
    where: {
      courseId: data.courseId,
      authorId: data.authorId
    }
  })
  
  if (existingReview) {
    throw new Error('Already reviewed this course')
  }
  
  const review = await prisma.review.create({
    data,
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true
        }
      }
    }
  })
  
  // Update course average rating
  const reviews = await prisma.review.aggregate({
    where: { courseId: data.courseId },
    _avg: { rating: true }
  })
  
  await prisma.course.update({
    where: { id: data.courseId },
    data: {
      averageRating: reviews._avg.rating
    }
  })
  
  return review
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export async function bulkUpdateSortOrder(
  items: Array<{ id: string; sortOrder: number }>,
  table: 'modules' | 'lessons'
) {
  const updates = items.map(item => {
    if (table === 'modules') {
      return prisma.module.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder }
      })
    } else {
      return prisma.lesson.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder }
      })
    }
  })
  
  return Promise.all(updates)
}