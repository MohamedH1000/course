"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { 
  BookOpen, 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Users, 
  Star,
  Grid3X3,
  List
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function CoursesPage() {
  const { t, isRTL } = useLanguage()
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid')

  // Mock courses data
  const courses = [
    {
      id: 1,
      title: "Complete React Development Course",
      description: "Master React from basics to advanced concepts with hands-on projects",
      instructor: "John Doe",
      duration: "12 hours",
      lessons: 24,
      students: 1234,
      rating: 4.8,
      progress: 75,
      level: "Intermediate",
      category: "Programming",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "UI/UX Design Fundamentals",
      description: "Learn the principles of user interface and user experience design",
      instructor: "Jane Smith",
      duration: "8 hours",
      lessons: 16,
      students: 856,
      rating: 4.9,
      progress: 45,
      level: "Beginner",
      category: "Design",
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Digital Marketing Strategy",
      description: "Comprehensive guide to digital marketing and growth strategies",
      instructor: "Mike Johnson",
      duration: "6 hours",
      lessons: 12,
      students: 567,
      rating: 4.7,
      progress: 90,
      level: "Advanced",
      category: "Marketing",
      thumbnail: "/api/placeholder/300/200"
    }
  ]

  const CourseCard = ({ course }: { course: typeof courses[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300" dir={isRTL ? "rtl" : "ltr"}>
      <div className="relative overflow-hidden rounded-t-lg">
        <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" className="bg-white/90 text-black hover:bg-white" asChild>
            <Link href={`/learn/${course.id}`} className={cn(
              "flex items-center gap-2",
              isRTL ? "flex-row-reverse" : ""
            )}>
              <Play className="h-4 w-4" />
              {t("course.continue")}
            </Link>
          </Button>
        </div>
        <Badge 
          className="absolute top-2 left-2" 
          variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}
        >
          {course.level}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <div className={cn(
          "flex items-center justify-between mb-2",
          isRTL ? "flex-row-reverse" : ""
        )}>
          <Badge variant="outline">{course.category}</Badge>
          <div className={cn(
            "flex items-center gap-1",
            isRTL ? "flex-row-reverse" : ""
          )}>
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">{course.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={cn(
          "flex items-center justify-between text-sm text-muted-foreground",
          isRTL ? "flex-row-reverse" : ""
        )}>
          <div className={cn(
            "flex items-center gap-1",
            isRTL ? "flex-row-reverse" : ""
          )}>
            <Clock className="h-3 w-3" />
            <span>{course.duration}</span>
          </div>
          <div className={cn(
            "flex items-center gap-1",
            isRTL ? "flex-row-reverse" : ""
          )}>
            <BookOpen className="h-3 w-3" />
            <span>{course.lessons} {t("course.lessons")}</span>
          </div>
          <div className={cn(
            "flex items-center gap-1",
            isRTL ? "flex-row-reverse" : ""
          )}>
            <Users className="h-3 w-3" />
            <span>{course.students}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className={cn(
            "flex justify-between text-sm",
            isRTL ? "flex-row-reverse" : ""
          )}>
            <span>{t("course.progress")}</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2"    />
        </div>

        <div className={cn(
          "flex items-center justify-between",
          isRTL ? "flex-row-reverse" : ""
        )}>
          <span className="text-sm text-muted-foreground">{course.instructor}</span>
          <Button size="sm" variant="outline">
            {course.progress === 100 ? t("course.completed") : t("course.continue")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const CourseListItem = ({ course }: { course: typeof courses[0] }) => (
    <Card className="hover:shadow-md transition-all duration-300" dir={isRTL ? "rtl" : "ltr"}>
      <CardContent className="p-6">
        <div className={cn(
          "flex gap-6",
          isRTL ? "flex-row" : " flex-row-reverse"
        )}>
          <div className="w-32 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div className={cn(
              "flex items-start justify-between",
              isRTL ? "flex-row" : "flex-row-reverse"
            )}>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
              </div>
              <div className={cn(
                "flex items-center gap-2 flex-shrink-0",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <Badge variant="outline">{course.category}</Badge>
                <Badge variant={course.level === 'Beginner' ? 'secondary' : course.level === 'Intermediate' ? 'default' : 'destructive'}>
                  {course.level}
                </Badge>
              </div>
            </div>

            <div className={cn(
              "flex items-center gap-6 text-sm text-muted-foreground",
              isRTL ? "flex-row" : "flex-row-reverse"
            )}>
              <div className={cn(
                "flex items-center gap-1",
                isRTL ? "flex-row-reverse" : ""
              )}>
                <Clock className="h-3 w-3" />
                <span>{course.duration}</span>
              </div>
              <div className={cn(
                "flex items-center gap-1",
                isRTL ? "flex-row" : "flex-row-reverse"
              )}>
                <BookOpen className="h-3 w-3" />
                <span>{course.lessons} {t("course.lessons")}</span>
              </div>
              <div className={cn(
                "flex items-center gap-1",
                isRTL ? "flex-row" : "flex-row-reverse"
              )}>
                <Users className="h-3 w-3" />
                <span>{course.students} {t("course.students")}</span>
              </div>
              <div className={cn(
                "flex items-center gap-1",
                isRTL ? "flex-row" : "flex-row-reverse"
              )}>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{course.rating}</span>
              </div>
            </div>

            <div className={cn(
              "flex items-center justify-between",
              isRTL ? "flex-row" : "flex-row-reverse"
            )}>
              <div className="flex-1 max-w-xs space-y-1">
                <div className={cn(
                  "flex justify-between text-sm",
                  isRTL ? "flex-row" : "flex-row-reverse"
                )}>
                  <span>{t("course.progress")}</span>
                  <span>{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <Button asChild>
                <Link href={`/learn/${course.id}`}>
                  {course.progress === 100 ? t("course.completed") : t("course.continue")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className={cn("space-y-6", isRTL ? "rtl" : "ltr")}>
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{t("dashboard.my_courses")}</h1>
        <p className="text-muted-foreground">
          Manage and continue your learning journey
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className={cn(
            "flex flex-col md:flex-row gap-4 items-center justify-between",
            isRTL ? "md:flex-row-reverse" : ""
          )}>
            <div className={cn(
              "flex flex-1 gap-4 w-full md:w-auto",
              isRTL ? "flex-row-reverse" : ""
            )}>
              <div className="relative flex-1 max-w-md">
                <Search className={cn(
                  "absolute top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground",
                  isRTL ? "right-3" : "left-3"
                )} />
                <Input
                  placeholder={t("dashboard.search_placeholder")}
                  className={cn(isRTL ? "pr-10" : "pl-10")}
                />
              </div>
              
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("dashboard.filter")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder={t("dashboard.sort")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Accessed</SelectItem>
                  <SelectItem value="progress">Progress</SelectItem>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="date">Enrollment Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className={cn(
              "flex items-center gap-2",
              isRTL ? "flex-row-reverse" : ""
            )}>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid/List */}
      <div className={viewMode === 'grid' 
        ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {courses.map((course) => (
          viewMode === 'grid' 
            ? <CourseCard key={course.id} course={course} />
            : <CourseListItem key={course.id} course={course} />
        ))}
      </div>

      {/* Empty State */}
      {courses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{t("dashboard.no_courses")}</h3>
            <p className="text-muted-foreground mb-4">{t("dashboard.start_learning")}</p>
            <Button asChild>
              <Link href="/courses">{t("dashboard.browse_courses")}</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}