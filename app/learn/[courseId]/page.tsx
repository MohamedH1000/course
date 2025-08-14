"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { VideoPlayer } from "@/components/video-player"
import { ProtectedRoute } from "@/components/protected-route"
import { type Course, type Lesson, courseAPI } from "@/lib/courses"
import { useAuth } from "@/contexts/auth-context"
import { CheckCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react"

function LearnCoursePage() {
  const params = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState<Course | null>(null)
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.courseId && user) {
      loadCourse(params.courseId as string)
      loadProgress(params.courseId as string, user.id)
    }
  }, [params.courseId, user])

  const loadCourse = async (courseId: string) => {
    try {
      const data = await courseAPI.getCourseById(courseId)
      setCourse(data)
      if (data && data.lessons.length > 0) {
        setCurrentLesson(data.lessons[0])
      }
    } catch (error) {
      console.error("Failed to load course:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadProgress = async (courseId: string, userId: string) => {
    try {
      const progress = await courseAPI.getCourseProgress(courseId, userId)
      if (progress) {
        setCompletedLessons(progress.completedLessons)
        // Set current lesson based on progress
        if (course) {
          const currentLessonFromProgress = course.lessons.find((l) => l.id === progress.currentLesson)
          if (currentLessonFromProgress) {
            setCurrentLesson(currentLessonFromProgress)
          }
        }
      }
    } catch (error) {
      console.error("Failed to load progress:", error)
    }
  }

  const handleLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId])
    }
  }

  const goToNextLesson = () => {
    if (!course || !currentLesson) return

    const currentIndex = course.lessons.findIndex((l) => l.id === currentLesson.id)
    if (currentIndex < course.lessons.length - 1) {
      setCurrentLesson(course.lessons[currentIndex + 1])
    }
  }

  const goToPreviousLesson = () => {
    if (!course || !currentLesson) return

    const currentIndex = course.lessons.findIndex((l) => l.id === currentLesson.id)
    if (currentIndex > 0) {
      setCurrentLesson(course.lessons[currentIndex - 1])
    }
  }

  const progressPercentage = course ? (completedLessons.length / course.lessons.length) * 100 : 0

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Course not found</h1>
          <p className="text-muted-foreground">The course you're trying to access doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-4 gap-0 min-h-screen">
        {/* Sidebar - Course Content */}
        <div className="lg:col-span-1 bg-card border-r border-border overflow-y-auto">
          <div className="p-6">
            <h2 className="font-semibold text-lg mb-2">{course.title}</h2>
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              {course.lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    currentLesson?.id === lesson.id ? "bg-primary/10 border border-primary/20" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setCurrentLesson(lesson)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-medium mt-0.5">
                      {completedLessons.includes(lesson.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm leading-tight">{lesson.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        {lesson.isPreview && (
                          <Badge variant="outline" className="text-xs">
                            Preview
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - Video Player */}
        <div className="lg:col-span-3 flex flex-col">
          {currentLesson && (
            <>
              <div className="flex-1 p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">{currentLesson.title}</h1>
                  <p className="text-muted-foreground">{currentLesson.description}</p>
                </div>

                <VideoPlayer
                  src={currentLesson.videoUrl}
                  title={currentLesson.title}
                  onComplete={() => handleLessonComplete(currentLesson.id)}
                />
              </div>

              {/* Navigation */}
              <div className="border-t border-border p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={goToPreviousLesson}
                    disabled={course.lessons.findIndex((l) => l.id === currentLesson.id) === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      Lesson {course.lessons.findIndex((l) => l.id === currentLesson.id) + 1} of {course.lessons.length}
                    </p>
                  </div>

                  <Button
                    onClick={goToNextLesson}
                    disabled={course.lessons.findIndex((l) => l.id === currentLesson.id) === course.lessons.length - 1}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProtectedLearnPage() {
  return (
    <ProtectedRoute>
      <LearnCoursePage />
    </ProtectedRoute>
  )
}
