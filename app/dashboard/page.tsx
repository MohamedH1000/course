"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/components/language-provider"
import { type Course, type CourseProgress, courseAPI } from "@/lib/courses"
import { BookOpen, Clock, Award, TrendingUp, Play, Settings, Bell, Download } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalCourses: number
  completedCourses: number
  totalHours: number
  certificates: number
  currentStreak: number
}

interface EnrolledCourse extends Course {
  progress: CourseProgress
}

function DashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    certificates: 0,
    currentStreak: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Mock enrolled courses data
      const mockEnrolledCourses: EnrolledCourse[] = [
        {
          ...(await courseAPI.getCourseById("1"))!,
          progress: {
            courseId: "1",
            userId: user.id,
            completedLessons: ["1-1"],
            currentLesson: "1-2",
            progressPercentage: 25,
            enrolledAt: "2024-01-20T00:00:00Z",
            lastAccessedAt: "2024-01-25T00:00:00Z",
          },
        },
        {
          ...(await courseAPI.getCourseById("2"))!,
          progress: {
            courseId: "2",
            userId: user.id,
            completedLessons: ["2-1", "2-2"],
            currentLesson: "2-3",
            progressPercentage: 80,
            enrolledAt: "2024-02-01T00:00:00Z",
            lastAccessedAt: "2024-02-10T00:00:00Z",
          },
        },
      ]

      setEnrolledCourses(mockEnrolledCourses)

      // Calculate stats
      const totalCourses = mockEnrolledCourses.length
      const completedCourses = mockEnrolledCourses.filter((c) => c.progress.progressPercentage >= 95).length
      const totalHours = mockEnrolledCourses.reduce((acc, course) => {
        const hours = Number.parseFloat(course.duration.split(" ")[0])
        return acc + hours
      }, 0)

      setStats({
        totalCourses,
        completedCourses,
        totalHours: Math.round(totalHours),
        certificates: completedCourses,
        currentStreak: 7,
      })
    } catch (error) {
      console.error("Failed to load dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              {getGreeting()}, {user?.name}!
            </h1>
            <p className="text-muted-foreground">Ready to continue your learning journey?</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            {user?.role === "instructor" && (
              <Button variant="outline" asChild>
                <Link href="/instructor/videos">
                  <Play className="h-4 w-4 mr-2" />
                  Manage Videos
                </Link>
              </Button>
            )}
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
                  <p className="text-xs text-muted-foreground">Enrolled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.completedCourses}</p>
                  <p className="text-xs text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalHours}h</p>
                  <p className="text-xs text-muted-foreground">Learning</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Download className="h-5 w-5 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.certificates}</p>
                  <p className="text-xs text-muted-foreground">Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Continue Learning</h2>
              <Button variant="outline" asChild>
                <Link href="/courses">Browse More Courses</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-all duration-300 border-border/50">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" className="bg-white/90 text-black hover:bg-white" asChild>
                        <Link href={`/learn/${course.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Continue
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(course.progress.progressPercentage)}%
                      </span>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.shortDescription}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <Progress value={course.progress.progressPercentage} className="h-2" />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {course.progress.completedLessons.length} of {course.lessons.length} lessons
                        </span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Learning Progress</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Activity</CardTitle>
                  <CardDescription>Your learning activity this week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                      <div key={day} className="flex items-center gap-4">
                        <span className="w-8 text-sm text-muted-foreground">{day}</span>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 3)}h</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                  <CardDescription>Progress across all enrolled courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{course.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(course.progress.progressPercentage)}%
                          </span>
                        </div>
                        <Progress value={course.progress.progressPercentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest learning activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Completed lesson",
                      course: "Complete Web Development Bootcamp",
                      lesson: "HTML Fundamentals",
                      time: "2 hours ago",
                    },
                    {
                      action: "Started course",
                      course: "Advanced React Development",
                      lesson: "Advanced React Patterns",
                      time: "1 day ago",
                    },
                    {
                      action: "Earned certificate",
                      course: "JavaScript Essentials",
                      lesson: "Course Completion",
                      time: "3 days ago",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.action}: {activity.lesson}
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.course}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Certificates & Achievements</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.certificates > 0 ? (
                [...Array(stats.certificates)].map((_, index) => (
                  <Card key={index} className="border-border/50 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                          <Award className="h-8 w-8 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">Course Completion</h3>
                          <p className="text-sm text-muted-foreground">Advanced React Development</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <p>Issued on February 10, 2024</p>
                          <p>Certificate ID: CERT-{1000 + index}</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">No certificates yet</h3>
                  <p className="text-muted-foreground mb-4">Complete courses to earn certificates</p>
                  <Button asChild>
                    <Link href="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Profile Settings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-sm">{user?.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-sm">{user?.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <div className="p-3 bg-muted rounded-lg">
                      <Badge variant="secondary">{user?.role}</Badge>
                    </div>
                  </div>

                  <Button className="w-full">Update Profile</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Preferences</CardTitle>
                  <CardDescription>Customize your learning experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Preferred Language</label>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-sm">English</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Notifications</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Course updates
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        New course recommendations
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Marketing emails
                      </label>
                    </div>
                  </div>

                  <Button className="w-full">Save Preferences</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ProtectedDashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  )
}
