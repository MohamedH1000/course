"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import { type Course, courseAPI } from "@/lib/courses"
import { Search, Star, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedLevel, setSelectedLevel] = useState<string>("all")
  const { t, language } = useLanguage()
  const isArabic = language === "ar";

  useEffect(() => {
    loadCourses()
  }, [searchTerm, selectedCategory, selectedLevel, language])

  const loadCourses = async () => {
    setLoading(true)
    try {
      const filters = {
        search: searchTerm,
        category: selectedCategory,
        level: selectedLevel,
        language: language,
      }
      const data = await courseAPI.getAllCourses(filters)
      setCourses(data)
    } catch (error) {
      console.error("Failed to load courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = ["web_development", "frontend_development", "web_development_ar"]
  const levels = ["beginner", "intermediate", "advanced"]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{t("nav.courses")}</h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("courses.discover")}
            </p>

            {/* Search and Filters */}
            <div className="bg-card/80 backdrop-blur-sm rounded-lg p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("courses.search_placeholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory} dir={isArabic ? "rtl" : "ltr"}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t("courses.category")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("courses.all_categories")}</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {t(`category.${category.toLowerCase().replace(/ /g, '_')}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedLevel} onValueChange={setSelectedLevel} dir={isArabic ? "rtl" : "ltr"}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder={t("courses.level")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("courses.all_levels")}</SelectItem>
                    {levels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {t(`level.${level}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-foreground">
                {t("courses.found", { count: courses.length })}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                >
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-background/90 text-foreground">
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </Badge>
                    </div>
                    {course.originalPrice && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-destructive text-destructive-foreground">
                          {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{course.category}</span>
                    </div>
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{course.shortDescription}</p>
                  </CardHeader>

                  <CardContent className="pb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                        <span>({course.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{course.enrollmentCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={course.instructor.avatar || "/placeholder.svg"}
                        alt={course.instructor.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {course.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${course.originalPrice}</span>
                        )}
                      </div>
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href={`/courses/${course.id}`}>{t("courses.view_course")}</Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {courses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{t("courses.empty.title")}</h3>
                <p className="text-muted-foreground">{t("courses.empty.subtitle")}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
