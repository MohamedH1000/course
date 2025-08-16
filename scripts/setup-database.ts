#!/usr/bin/env tsx

/**
 * Database setup script for the course platform
 * Run this after setting up your Supabase project and updating .env
 */

import { prisma } from '../lib/prisma'

async function setupDatabase() {
  console.log('🚀 Setting up database...')

  try {
    // Test database connection
    await prisma.$connect()
    console.log('✅ Database connection successful')

    // Create default categories
    console.log('📚 Creating default categories...')
    const categories = await createDefaultCategories()
    console.log(`✅ Created ${categories.length} categories`)

    // Create sample data (optional)
    if (process.env.NODE_ENV === 'development') {
      console.log('🎭 Creating sample data for development...')
      await createSampleData()
      console.log('✅ Sample data created')
    }

    // Set up database functions and triggers
    console.log('⚙️ Setting up database functions...')
    await setupDatabaseFunctions()
    console.log('✅ Database functions created')

    console.log('🎉 Database setup completed successfully!')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

async function createDefaultCategories() {
  const categories = [
    {
      name: 'Programming',
      slug: 'programming',
      description: 'Learn programming languages and software development',
      icon: '💻',
      color: '#3B82F6'
    },
    {
      name: 'Design',
      slug: 'design',
      description: 'UI/UX design, graphic design, and creative skills',
      icon: '🎨',
      color: '#EC4899'
    },
    {
      name: 'Business',
      slug: 'business',
      description: 'Business skills, entrepreneurship, and management',
      icon: '💼',
      color: '#10B981'
    },
    {
      name: 'Marketing',
      slug: 'marketing',
      description: 'Digital marketing, SEO, and growth strategies',
      icon: '📈',
      color: '#F59E0B'
    },
    {
      name: 'Data Science',
      slug: 'data-science',
      description: 'Data analysis, machine learning, and AI',
      icon: '📊',
      color: '#8B5CF6'
    },
    {
      name: 'Languages',
      slug: 'languages',
      description: 'Learn new languages and improve communication',
      icon: '🌍',
      color: '#EF4444'
    }
  ]

  const createdCategories = []
  for (const category of categories) {
    const existing = await prisma.category.findUnique({
      where: { slug: category.slug }
    })

    if (!existing) {
      const created = await prisma.category.create({
        data: category
      })
      createdCategories.push(created)
    }
  }

  return createdCategories
}

async function createSampleData() {
  // Create a sample instructor
  const instructor = await prisma.user.create({
    data: {
      email: 'instructor@example.com',
      firstName: 'John',
      lastName: 'Doe',
      emailVerified: true,
      profile: {
        create: {
          title: 'Senior Software Engineer',
          company: 'Tech Corp',
          profileVisibility: 'public'
        }
      },
      instructorProfile: {
        create: {
          expertise: ['JavaScript', 'React', 'Node.js'],
          experience: '5+ years of software development experience',
          isVerified: true,
          verifiedAt: new Date()
        }
      }
    }
  })

  // Create a sample student
  const student = await prisma.user.create({
    data: {
      email: 'student@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      emailVerified: true,
      profile: {
        create: {
          profileVisibility: 'public'
        }
      },
      studentProfile: {
        create: {
          learningGoals: ['Learn web development', 'Build projects'],
          interests: ['Programming', 'Design'],
          skillLevel: 'beginner'
        }
      }
    }
  })

  // Get programming category
  const programmingCategory = await prisma.category.findUnique({
    where: { slug: 'programming' }
  })

  if (programmingCategory) {
    // Create a sample course
    const course = await prisma.course.create({
      data: {
        title: 'Complete React Development Course',
        slug: 'complete-react-development-course',
        description: 'Learn React from scratch and build amazing web applications',
        shortDescription: 'Master React development with hands-on projects',
        level: 'beginner',
        price: 99.99,
        currency: 'USD',
        isPublished: true,
        isDraft: false,
        tags: ['React', 'JavaScript', 'Web Development'],
        ownerId: instructor.id,
        categoryId: programmingCategory.id,
        modules: {
          create: [
            {
              title: 'Introduction to React',
              description: 'Get started with React basics',
              sortOrder: 1,
              lessons: {
                create: [
                  {
                    title: 'What is React?',
                    description: 'Understanding React and its ecosystem',
                    content: 'React is a JavaScript library for building user interfaces...',
                    type: 'video',
                    duration: 600, // 10 minutes
                    sortOrder: 1,
                    isPublished: true,
                    createdById: instructor.id
                  },
                  {
                    title: 'Setting up Development Environment',
                    description: 'Install Node.js, npm, and create-react-app',
                    content: 'In this lesson, we will set up our development environment...',
                    type: 'video',
                    duration: 900, // 15 minutes
                    sortOrder: 2,
                    isPublished: true,
                    createdById: instructor.id
                  }
                ]
              }
            },
            {
              title: 'React Components',
              description: 'Learn about React components and JSX',
              sortOrder: 2,
              lessons: {
                create: [
                  {
                    title: 'Creating Your First Component',
                    description: 'Build a simple React component',
                    content: 'Components are the building blocks of React applications...',
                    type: 'video',
                    duration: 1200, // 20 minutes
                    sortOrder: 1,
                    isPublished: true,
                    createdById: instructor.id
                  }
                ]
              }
            }
          ]
        }
      },
      include: {
        modules: {
          include: {
            lessons: true
          }
        }
      }
    })

    // Create forum for the course
    await prisma.forum.create({
      data: {
        title: `${course.title} Discussion`,
        description: `Discussion forum for ${course.title}`,
        courseId: course.id
      }
    })

    console.log(`✅ Created sample course: ${course.title}`)
  }
}

async function setupDatabaseFunctions() {
  // Create database functions using raw SQL
  // These functions will help with performance and data integrity

  // Function to update course statistics
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION update_course_stats()
    RETURNS TRIGGER AS $$
    BEGIN
      UPDATE courses 
      SET 
        "enrollCount" = (
          SELECT COUNT(*) 
          FROM enrollments 
          WHERE "courseId" = NEW."courseId"
        ),
        "averageRating" = (
          SELECT AVG(rating) 
          FROM reviews 
          WHERE "courseId" = NEW."courseId"
        ),
        "updatedAt" = NOW()
      WHERE id = NEW."courseId";
      
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `

  // Trigger for enrollment changes
  await prisma.$executeRaw`
    DROP TRIGGER IF EXISTS enrollment_stats_trigger ON enrollments;
    CREATE TRIGGER enrollment_stats_trigger
      AFTER INSERT OR DELETE ON enrollments
      FOR EACH ROW
      EXECUTE FUNCTION update_course_stats();
  `

  // Trigger for review changes
  await prisma.$executeRaw`
    DROP TRIGGER IF EXISTS review_stats_trigger ON reviews;
    CREATE TRIGGER review_stats_trigger
      AFTER INSERT OR UPDATE OR DELETE ON reviews
      FOR each ROW
      EXECUTE FUNCTION update_course_stats();
  `

  // Function to calculate enrollment progress
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION calculate_enrollment_progress(enrollment_id TEXT)
    RETURNS DECIMAL AS $$
    DECLARE
      total_lessons INTEGER;
      completed_lessons INTEGER;
      progress_percentage DECIMAL;
    BEGIN
      -- Get total lessons for the course
      SELECT COUNT(l.id) INTO total_lessons
      FROM lessons l
      JOIN modules m ON l."moduleId" = m.id
      JOIN courses c ON m."courseId" = c.id
      JOIN enrollments e ON e."courseId" = c.id
      WHERE e.id = enrollment_id;
      
      -- Get completed lessons
      SELECT COUNT(lp.id) INTO completed_lessons
      FROM lesson_progress lp
      WHERE lp."enrollmentId" = enrollment_id 
        AND lp."isCompleted" = true;
      
      -- Calculate percentage
      IF total_lessons > 0 THEN
        progress_percentage := (completed_lessons::DECIMAL / total_lessons::DECIMAL) * 100;
      ELSE
        progress_percentage := 0;
      END IF;
      
      -- Update enrollment
      UPDATE enrollments 
      SET 
        "progressPercentage" = progress_percentage,
        "completedAt" = CASE 
          WHEN progress_percentage = 100 AND "completedAt" IS NULL 
          THEN NOW() 
          ELSE "completedAt" 
        END,
        "updatedAt" = NOW()
      WHERE id = enrollment_id;
      
      RETURN progress_percentage;
    END;
    $$ LANGUAGE plpgsql;
  `

  // Trigger for lesson progress updates
  await prisma.$executeRaw`
    CREATE OR REPLACE FUNCTION update_enrollment_progress()
    RETURNS TRIGGER AS $$
    BEGIN
      PERFORM calculate_enrollment_progress(NEW."enrollmentId");
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `

  await prisma.$executeRaw`
    DROP TRIGGER IF EXISTS lesson_progress_trigger ON lesson_progress;
    CREATE TRIGGER lesson_progress_trigger
      AFTER INSERT OR UPDATE ON lesson_progress
      FOR EACH ROW
      EXECUTE FUNCTION update_enrollment_progress();
  `

  console.log('✅ Database functions and triggers created')
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupDatabase()
}

export { setupDatabase }