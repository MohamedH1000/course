"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/components/language-provider"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface AdminStats {
  totalUsers: number
  totalCourses: number
  totalRevenue: number
  monthlyGrowth: number
  activeUsers: number
  pendingCourses: number
  supportTickets: number
}

interface User {
  id: string
  name: string
  email: string
  role: "student" | "instructor" | "admin"
  status: "active" | "inactive" | "suspended"
  joinDate: string
  lastActive: string
  coursesEnrolled?: number
  coursesCreated?: number
}

interface CourseManagement {
  id: string
  title: string
  instructor: string
  status: "published" | "draft" | "pending" | "rejected"
  enrollments: number
  revenue: number
  createdAt: string
  lastUpdated: string
}

function AdminDashboardPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeUsers: 0,
    pendingCourses: 0,
    supportTickets: 0,
  })
  const [users, setUsers] = useState<User[]>([])
  const [courses, setCourses] = useState<CourseManagement[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAdminData()
  }, [])

  const loadAdminData = async () => {
    setLoading(true)
    try {
      // Mock admin data
      const mockStats: AdminStats = {
        totalUsers: 12450,
        totalCourses: 89,
        totalRevenue: 245680,
        monthlyGrowth: 12.5,
        activeUsers: 8920,
        pendingCourses: 5,
        supportTickets: 23,
      }

      const mockUsers: User[] = [
        {
          id: "1",
          name: "John Student",
          email: "john@example.com",
          role: "student",
          status: "active",
          joinDate: "2024-01-15",
          lastActive: "2024-02-10",
          coursesEnrolled: 3,
        },
        {
          id: "2",
          name: "Jane Instructor",
          email: "jane@example.com",
          role: "instructor",
          status: "active",
          joinDate: "2023-12-01",
          lastActive: "2024-02-09",
          coursesCreated: 5,
        },
        {
          id: "3",
          name: "Bob Admin",
          email: "bob@example.com",
          role: "admin",
          status: "active",
          joinDate: "2023-10-01",
          lastActive: "2024-02-10",
        },
        {
          id: "4",
          name: "Alice Student",
          email: "alice@example.com",
          role: "student",
          status: "inactive",
          joinDate: "2024-01-20",
          lastActive: "2024-01-25",
          coursesEnrolled: 1,
        },
      ]

      const mockCourses: CourseManagement[] = [
        {
          id: "1",
          title: "Complete Web Development Bootcamp",
          instructor: "John Instructor",
          status: "published",
          enrollments: 1250,
          revenue: 124750,
          createdAt: "2024-01-15",
          lastUpdated: "2024-02-01",
        },
        {
          id: "2",
          title: "Advanced React Development",
          instructor: "Jane Expert",
          status: "published",
          enrollments: 890,
          revenue: 133510,
          createdAt: "2024-02-01",
          lastUpdated: "2024-02-05",
        },
        {
          id: "3",
          title: "Python for Beginners",
          instructor: "Mike Teacher",
          status: "pending",
          enrollments: 0,
          revenue: 0,
          createdAt: "2024-02-08",
          lastUpdated: "2024-02-08",
        },
        {
          id: "4",
          title: "Data Science Fundamentals",
          instructor: "Sarah Analyst",
          status: "draft",
          enrollments: 0,
          revenue: 0,
          createdAt: "2024-02-05",
          lastUpdated: "2024-02-09",
        },
      ]

      setStats(mockStats)
      setUsers(mockUsers)
      setCourses(mockCourses)
    } catch (error) {
      console.error("Failed to load admin data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "published":
        return "bg-green-500"
      case "inactive":
      case "draft":
        return "bg-yellow-500"
      case "suspended":
      case "rejected":
        return "bg-red-500"
      case "pending":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "active":
      case "published":
        return "default"
      case "pending":
        return "secondary"
      case "inactive":
      case "draft":
        return "outline"
      case "suspended":
      case "rejected":
        return "destructive"
      default:
        return "outline"
    }
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
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your platform and monitor performance</p>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.totalCourses}</p>
                  <p className="text-xs text-muted-foreground">Total Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">+{stats.monthlyGrowth}%</p>
                  <p className="text-xs text-muted-foreground">Growth</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.pendingCourses}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.supportTickets}</p>
                  <p className="text-xs text-muted-foreground">Support</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        action: "New user registered",
                        user: "Alice Johnson",
                        time: "5 minutes ago",
                        type: "user",
                      },
                      {
                        action: "Course published",
                        user: "Python for Beginners",
                        time: "1 hour ago",
                        type: "course",
                      },
                      {
                        action: "Support ticket created",
                        user: "Payment Issue #1234",
                        time: "2 hours ago",
                        type: "support",
                      },
                      {
                        action: "Course enrollment",
                        user: "React Development Course",
                        time: "3 hours ago",
                        type: "enrollment",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(activity.type)}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "January", revenue: 45680, growth: 12 },
                      { month: "February", revenue: 52340, growth: 15 },
                      { month: "March", revenue: 48920, growth: -7 },
                      { month: "April", revenue: 61250, growth: 25 },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{data.month}</p>
                          <p className="text-sm text-muted-foreground">${data.revenue.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${data.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                            {data.growth > 0 ? "+" : ""}
                            {data.growth}%
                          </span>
                          <div className="w-20">
                            <Progress value={Math.abs(data.growth) * 2} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Users className="h-6 w-6" />
                    <span>Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <BookOpen className="h-6 w-6" />
                    <span>Review Courses</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <AlertCircle className="h-6 w-6" />
                    <span>Support Tickets</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Download className="h-6 w-6" />
                    <span>Generate Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">User Management</h2>
              <Button>Add New User</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>Manage platform users and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Courses</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(user.status)} className="capitalize">
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                        <TableCell>{user.coursesEnrolled || user.coursesCreated || 0}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-foreground">Course Management</h2>
              <Button>Create Course</Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>Manage courses and their publication status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Instructor</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Enrollments</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <p className="text-sm text-muted-foreground">ID: {course.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(course.status)} className="capitalize">
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{course.enrollments.toLocaleString()}</TableCell>
                        <TableCell>${course.revenue.toLocaleString()}</TableCell>
                        <TableCell>{new Date(course.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Course
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Course
                              </DropdownMenuItem>
                              {course.status === "pending" && (
                                <>
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Reject
                                  </DropdownMenuItem>
                                </>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Course
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Analytics & Reports</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user registration trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Jan", users: 1200, growth: 15 },
                      { month: "Feb", users: 1450, growth: 21 },
                      { month: "Mar", users: 1380, growth: -5 },
                      { month: "Apr", users: 1620, growth: 17 },
                      { month: "May", users: 1890, growth: 17 },
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{data.month}</p>
                          <p className="text-sm text-muted-foreground">{data.users} users</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${data.growth > 0 ? "text-green-500" : "text-red-500"}`}>
                            {data.growth > 0 ? "+" : ""}
                            {data.growth}%
                          </span>
                          <div className="w-20">
                            <Progress value={Math.abs(data.growth) * 3} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Top performing courses by enrollment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses
                      .filter((c) => c.status === "published")
                      .sort((a, b) => b.enrollments - a.enrollments)
                      .map((course, index) => (
                        <div key={course.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <p className="text-sm text-muted-foreground">{course.instructor}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{course.enrollments.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">enrollments</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">Platform Settings</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure platform-wide settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Platform Name</label>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-sm">EduPlatform</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Default Language</label>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-sm">English</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course Approval</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Require admin approval for new courses
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Auto-publish instructor courses
                      </label>
                    </div>
                  </div>

                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Email Settings</CardTitle>
                  <CardDescription>Configure email notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SMTP Server</label>
                    <div className="p-3 bg-muted rounded-lg">
                      <span className="text-sm">smtp.eduplatform.com</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Notifications</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        New user registrations
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="rounded" />
                        Course submissions
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Daily reports
                      </label>
                    </div>
                  </div>

                  <Button className="w-full">Update Email Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function ProtectedAdminDashboardPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminDashboardPage />
    </ProtectedRoute>
  )
}
