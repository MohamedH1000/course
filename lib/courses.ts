export interface Course {
  id: string
  title: string
  description: string
  shortDescription: string
  instructor: {
    id: string
    name: string
    avatar?: string
    bio: string
  }
  thumbnail: string
  price: number
  originalPrice?: number
  duration: string // e.g., "4 hours 30 minutes"
  level: "beginner" | "intermediate" | "advanced"
  category: string
  tags: string[]
  rating: number
  reviewCount: number
  enrollmentCount: number
  lessons: Lesson[]
  requirements: string[]
  whatYouWillLearn: string[]
  createdAt: string
  updatedAt: string
  isPublished: boolean
  language: "en" | "ar"
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration: string // e.g., "15 minutes"
  videoUrl: string
  order: number
  isPreview: boolean
  resources?: Resource[]
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "link" | "file"
  url: string
}

export interface CourseProgress {
  courseId: string
  userId: string
  completedLessons: string[]
  currentLesson: string
  progressPercentage: number
  enrolledAt: string
  lastAccessedAt: string
}

export interface CourseEnrollment {
  id: string
  courseId: string
  userId: string
  enrolledAt: string
  status: "active" | "completed" | "cancelled"
}

// Mock course data
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description:
      "Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and MongoDB to build modern web applications.",
    shortDescription: "Master full-stack web development with hands-on projects",
    instructor: {
      id: "2",
      name: "John Instructor",
      avatar: "/instructor-avatar.png",
      bio: "Senior Full-Stack Developer with 8+ years of experience",
    },
    thumbnail: "/web-development-course.png",
    price: 99.99,
    originalPrice: 199.99,
    duration: "40 hours",
    level: "beginner",
    category: "Web Development",
    tags: ["JavaScript", "React", "Node.js", "MongoDB"],
    rating: 4.8,
    reviewCount: 1250,
    enrollmentCount: 5420,
    lessons: [
      {
        id: "1-1",
        title: "Introduction to Web Development",
        description: "Overview of web development and what you will learn",
        duration: "12 minutes",
        videoUrl: "/placeholder-video.mp4",
        order: 1,
        isPreview: true,
      },
      {
        id: "1-2",
        title: "HTML Fundamentals",
        description: "Learn the building blocks of web pages",
        duration: "45 minutes",
        videoUrl: "/placeholder-video.mp4",
        order: 2,
        isPreview: false,
      },
      {
        id: "1-3",
        title: "CSS Styling Basics",
        description: "Style your web pages with CSS",
        duration: "38 minutes",
        videoUrl: "/placeholder-video.mp4",
        order: 3,
        isPreview: false,
      },
    ],
    requirements: ["Basic computer skills", "No programming experience required"],
    whatYouWillLearn: [
      "Build responsive websites from scratch",
      "Master modern JavaScript ES6+",
      "Create dynamic web applications with React",
      "Build backend APIs with Node.js",
      "Work with databases using MongoDB",
    ],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-20T00:00:00Z",
    isPublished: true,
    language: "en",
  },
  {
    id: "2",
    title: "Advanced React Development",
    description:
      "Take your React skills to the next level with advanced patterns, performance optimization, and modern React features.",
    shortDescription: "Master advanced React patterns and performance optimization",
    instructor: {
      id: "2",
      name: "John Instructor",
      avatar: "/instructor-avatar.png",
      bio: "Senior Full-Stack Developer with 8+ years of experience",
    },
    thumbnail: "/react-advanced-course.png",
    price: 149.99,
    originalPrice: 249.99,
    duration: "25 hours",
    level: "advanced",
    category: "Frontend Development",
    tags: ["React", "TypeScript", "Performance", "Testing"],
    rating: 4.9,
    reviewCount: 890,
    enrollmentCount: 2340,
    lessons: [
      {
        id: "2-1",
        title: "Advanced React Patterns",
        description: "Learn render props, HOCs, and compound components",
        duration: "35 minutes",
        videoUrl: "/placeholder-video.mp4",
        order: 1,
        isPreview: true,
      },
      {
        id: "2-2",
        title: "Performance Optimization",
        description: "Optimize your React applications for better performance",
        duration: "42 minutes",
        videoUrl: "/placeholder-video.mp4",
        order: 2,
        isPreview: false,
      },
    ],
    requirements: ["Solid understanding of React basics", "JavaScript ES6+ knowledge"],
    whatYouWillLearn: [
      "Master advanced React patterns",
      "Optimize React application performance",
      "Implement complex state management",
      "Write comprehensive tests for React apps",
    ],
    createdAt: "2024-02-01T00:00:00Z",
    updatedAt: "2024-02-05T00:00:00Z",
    isPublished: true,
    language: "en",
  },
  {
    id: "3",
    title: "تطوير تطبيقات الويب الحديثة",
    description:
      "تعلم تطوير تطبيقات الويب الحديثة باستخدام أحدث التقنيات والأدوات. دورة شاملة تغطي جميع جوانب تطوير الويب.",
    shortDescription: "تعلم تطوير تطبيقات الويب من الصفر إلى الاحتراف",
    instructor: {
      id: "4",
      name: "أحمد المدرس",
      avatar: "/arabic-instructor.png",
      bio: "مطور ويب خبير مع أكثر من 10 سنوات من الخبرة",
    },
    thumbnail: "/arabic-web-development.png",
    price: 79.99,
    originalPrice: 159.99,
    duration: "35 ساعة",
    level: "beginner",
    category: "تطوير الويب",
    tags: ["JavaScript", "React", "CSS", "HTML"],
    rating: 4.7,
    reviewCount: 650,
    enrollmentCount: 1890,
    lessons: [
      {
        id: "3-1",
        title: "مقدمة في تطوير الويب",
        description: "نظرة عامة على تطوير الويب والأدوات المطلوبة",
        duration: "20 دقيقة",
        videoUrl: "/placeholder-video.mp4",
        order: 1,
        isPreview: true,
      },
      {
        id: "3-2",
        title: "أساسيات HTML",
        description: "تعلم لغة HTML وكيفية إنشاء صفحات الويب",
        duration: "50 دقيقة",
        videoUrl: "/placeholder-video.mp4",
        order: 2,
        isPreview: false,
      },
    ],
    requirements: ["مهارات الكمبيوتر الأساسية", "لا يتطلب خبرة برمجية مسبقة"],
    whatYouWillLearn: [
      "إنشاء مواقع ويب متجاوبة",
      "إتقان JavaScript الحديث",
      "تطوير تطبيقات تفاعلية",
      "العمل مع قواعد البيانات",
    ],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    isPublished: true,
    language: "ar",
  },
]

// Mock course API
export const courseAPI = {
  async getAllCourses(filters?: {
    category?: string
    level?: string
    language?: string
    search?: string
  }): Promise<Course[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredCourses = [...mockCourses]

    if (filters?.category) {
      filteredCourses = filteredCourses.filter((course) =>
        course.category.toLowerCase().includes(filters.category!.toLowerCase()),
      )
    }

    if (filters?.level) {
      filteredCourses = filteredCourses.filter((course) => course.level === filters.level)
    }

    if (filters?.language) {
      filteredCourses = filteredCourses.filter((course) => course.language === filters.language)
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm) ||
          course.description.toLowerCase().includes(searchTerm) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
      )
    }

    return filteredCourses
  },

  async getCourseById(id: string): Promise<Course | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return mockCourses.find((course) => course.id === id) || null
  },

  async enrollInCourse(courseId: string, userId: string): Promise<CourseEnrollment> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const enrollment: CourseEnrollment = {
      id: `enrollment-${courseId}-${userId}`,
      courseId,
      userId,
      enrolledAt: new Date().toISOString(),
      status: "active",
    }

    return enrollment
  },

  async getCourseProgress(courseId: string, userId: string): Promise<CourseProgress | null> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Mock progress data
    return {
      courseId,
      userId,
      completedLessons: ["1-1"],
      currentLesson: "1-2",
      progressPercentage: 15,
      enrolledAt: "2024-01-20T00:00:00Z",
      lastAccessedAt: new Date().toISOString(),
    }
  },
}
