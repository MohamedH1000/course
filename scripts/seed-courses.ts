#!/usr/bin/env tsx

/**
 * Seed script to populate courses for the booking form
 * Run this to add sample courses that guests can book
 */

import { prisma } from '../lib/prisma'

async function seedCourses() {
  console.log('🌱 Seeding courses for booking form...')

  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connection successful')

    // Get or create categories
    const categories = await getOrCreateCategories()

    // Get or create a sample instructor
    const instructor = await getOrCreateInstructor()

    // Create sample courses
    const courses = await createSampleCourses(instructor.id, categories)

    console.log(`✅ Created ${courses.length} sample courses`)
    console.log('🎉 Course seeding completed successfully!')

  } catch (error) {
    console.error('❌ Course seeding failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

async function getOrCreateCategories() {
  const categoryData = [
    {
      name: 'Web Development',
      slug: 'web-development',
      description: 'Learn modern web development technologies',
      icon: '🌐',
      color: '#3B82F6'
    },
    {
      name: 'Mobile Development',
      slug: 'mobile-development',
      description: 'Build mobile applications for iOS and Android',
      icon: '📱',
      color: '#10B981'
    },
    {
      name: 'Data Science',
      slug: 'data-science',
      description: 'Master data analysis and machine learning',
      icon: '📊',
      color: '#8B5CF6'
    },
    {
      name: 'Design',
      slug: 'design',
      description: 'UI/UX design and creative skills',
      icon: '🎨',
      color: '#EC4899'
    },
    {
      name: 'Business',
      slug: 'business',
      description: 'Business skills and entrepreneurship',
      icon: '💼',
      color: '#F59E0B'
    },
    {
      name: 'Languages',
      slug: 'languages',
      description: 'Learn new languages and communication',
      icon: '🌍',
      color: '#EF4444'
    }
  ]

  const categories = []

  for (const catData of categoryData) {
    let category = await prisma.category.findUnique({
      where: { slug: catData.slug }
    })

    if (!category) {
      category = await prisma.category.create({
        data: catData
      })
      console.log(`📁 Created category: ${category.name}`)
    }

    categories.push(category)
  }

  return categories
}

async function getOrCreateInstructor() {
  let instructor = await prisma.user.findUnique({
    where: { email: 'instructor@courseplatform.com' }
  })

  if (!instructor) {
    instructor = await prisma.user.create({
      data: {
        email: 'instructor@courseplatform.com',
        firstName: 'Sarah',
        lastName: 'Johnson',
        emailVerified: new Date(),
        profile: {
          create: {
            title: 'Senior Full-Stack Developer & Instructor',
            company: 'Tech Academy',
            profileVisibility: 'public'
          }
        },
        instructorProfile: {
          create: {
            expertise: ['React', 'Node.js', 'Python', 'UI/UX Design'],
            experience: '8+ years of software development and teaching experience',
            isVerified: true,
            verifiedAt: new Date()
          }
        }
      }
    })
    console.log(`👩‍🏫 Created instructor: ${instructor.firstName} ${instructor.lastName}`)
  }

  return instructor
}

async function createSampleCourses(instructorId: string, categories: any[]) {
  const courseData = [
    {
      title: 'Complete React & Next.js Development Course',
      slug: 'complete-react-nextjs-development-course',
      description: 'Master modern React development with Next.js, TypeScript, and advanced patterns. Build production-ready web applications from scratch.',
      shortDescription: 'Become a React expert with Next.js and TypeScript',
      level: 'intermediate',
      price: 149.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Web Development'],
      categorySlug: 'web-development',
      thumbnail: '/assets/react-advanced-course.png'
    },
    {
      title: 'Full-Stack Web Development Bootcamp',
      slug: 'full-stack-web-development-bootcamp',
      description: 'Complete guide to becoming a full-stack developer. Learn HTML, CSS, JavaScript, Node.js, Express, MongoDB, and deployment.',
      shortDescription: 'From zero to full-stack developer',
      level: 'beginner',
      price: 199.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['Full-Stack', 'JavaScript', 'Node.js', 'MongoDB', 'Express'],
      categorySlug: 'web-development',
      thumbnail: '/assets/web-development-course.png'
    },
    {
      title: 'React Native Mobile App Development',
      slug: 'react-native-mobile-app-development',
      description: 'Build cross-platform mobile applications with React Native. Create iOS and Android apps using a single codebase.',
      shortDescription: 'Build mobile apps for iOS and Android',
      level: 'intermediate',
      price: 129.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['React Native', 'Mobile', 'iOS', 'Android', 'JavaScript'],
      categorySlug: 'mobile-development',
      thumbnail: '/assets/placeholder.jpg'
    },
    {
      title: 'Python for Data Science & Machine Learning',
      slug: 'python-data-science-machine-learning',
      description: 'Learn Python programming for data analysis, visualization, and machine learning. Work with pandas, numpy, scikit-learn, and more.',
      shortDescription: 'Master data science with Python',
      level: 'intermediate',
      price: 179.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['Python', 'Data Science', 'Machine Learning', 'Pandas', 'NumPy'],
      categorySlug: 'data-science',
      thumbnail: '/assets/placeholder.jpg'
    },
    {
      title: 'UI/UX Design Masterclass',
      slug: 'ui-ux-design-masterclass',
      description: 'Complete guide to user interface and user experience design. Learn design principles, prototyping, and industry-standard tools.',
      shortDescription: 'Design beautiful and user-friendly interfaces',
      level: 'beginner',
      price: 99.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['UI Design', 'UX Design', 'Figma', 'Prototyping', 'Design Systems'],
      categorySlug: 'design',
      thumbnail: '/assets/placeholder.jpg'
    },
    {
      title: 'Arabic Language for Beginners',
      slug: 'arabic-language-beginners',
      description: 'Learn Modern Standard Arabic from scratch. Master reading, writing, speaking, and listening skills with native instructors.',
      shortDescription: 'Start your Arabic language journey',
      level: 'beginner',
      price: 89.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['Arabic', 'Language', 'Culture', 'Communication'],
      categorySlug: 'languages',
      thumbnail: '/assets/arabic-instructor.png'
    },
    {
      title: 'Digital Marketing & SEO Mastery',
      slug: 'digital-marketing-seo-mastery',
      description: 'Master digital marketing strategies including SEO, social media marketing, Google Ads, and content marketing.',
      shortDescription: 'Grow your business with digital marketing',
      level: 'intermediate',
      price: 119.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['Digital Marketing', 'SEO', 'Google Ads', 'Social Media', 'Content Marketing'],
      categorySlug: 'business',
      thumbnail: '/assets/placeholder.jpg'
    },
    {
      title: 'Advanced JavaScript Concepts',
      slug: 'advanced-javascript-concepts',
      description: 'Deep dive into advanced JavaScript concepts including closures, prototypes, async programming, and modern ES6+ features.',
      shortDescription: 'Master advanced JavaScript concepts',
      level: 'advanced',
      price: 159.99,
      currency: 'USD',
      isPublished: true,
      isDraft: false,
      tags: ['JavaScript', 'ES6', 'Async Programming', 'Closures', 'Prototypes'],
      categorySlug: 'web-development',
      thumbnail: '/assets/placeholder.jpg'
    }
  ]

  const createdCourses = []

  for (const courseInfo of courseData) {
    // Check if course already exists
    const existingCourse = await prisma.course.findUnique({
      where: { slug: courseInfo.slug }
    })

    if (existingCourse) {
      console.log(`⏭️ Course already exists: ${courseInfo.title}`)
      createdCourses.push(existingCourse)
      continue
    }

    // Find category
    const category = categories.find(cat => cat.slug === courseInfo.categorySlug)

    if (!category) {
      console.log(`⚠️ Category not found for course: ${courseInfo.title}`)
      continue
    }

    // Create course
    const course = await prisma.course.create({
      data: {
        title: courseInfo.title,
        slug: courseInfo.slug,
        description: courseInfo.description,
        shortDescription: courseInfo.shortDescription,
        level: courseInfo.level,
        price: courseInfo.price,
        currency: courseInfo.currency,
        isPublished: courseInfo.isPublished,
        isDraft: courseInfo.isDraft,
        tags: courseInfo.tags,
        thumbnail: courseInfo.thumbnail,
        ownerId: instructorId,
        categoryId: category.id
      }
    })

    console.log(`📚 Created course: ${course.title}`)
    createdCourses.push(course)
  }

  return createdCourses
}

// Run the seeding if this file is executed directly
if (require.main === module) {
  seedCourses()
}

export { seedCourses }