"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, BookOpen, User, MapPin, Mail, Phone, MessageSquare, Loader2, Check, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

const bookingSchema = z.object({
  courseId: z.string().min(1, "Course selection is required"),
  firstName: z.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "First name can only contain letters and spaces")
    .refine((val) => val.trim().length >= 2, "First name cannot be just spaces"),
  lastName: z.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .regex(/^[a-zA-Z\s\u0600-\u06FF]+$/, "Last name can only contain letters and spaces")
    .refine((val) => val.trim().length >= 2, "Last name cannot be just spaces"),
  fullName: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email address is too long")
    .refine((email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }, "Please enter a valid email address"),
  phone: z.string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true
      // Allow international formats with +, spaces, dashes, parentheses
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$|^[\+]?[1-9][\d]{0,2}[\s\-\(\)]*[\d\s\-\(\)]{6,15}$/
      return phoneRegex.test(val.replace(/[\s\-\(\)]/g, ''))
    }, "Please enter a valid phone number")
    .refine((val) => {
      if (!val) return true
      return val.replace(/[\s\-\(\)]/g, '').length >= 7
    }, "Phone number must be at least 7 digits")
    .refine((val) => {
      if (!val) return true
      return val.replace(/[\s\-\(\)]/g, '').length <= 15
    }, "Phone number is too long"),
  location: z.string()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location must be less than 100 characters")
    .regex(/^[^<>]*$/, "Location contains invalid characters")
    .refine((val) => val.trim().length >= 2, "Location cannot be just spaces"),
  message: z.string()
    .max(1000, "Message must be less than 1000 characters")
    .optional()
    .refine((val) => {
      if (!val) return true
      return val.trim().length <= 1000
    }, "Message is too long")
})

type BookingFormData = z.infer<typeof bookingSchema>

interface Course {
  id: string
  title: string
  price: number | null
  currency: string
  level: string
  isFree: boolean
  category?: {
    name: string
  } | null
}

interface BookingFormProps {
  className?: string
}

export default function BookingForm({ className }: BookingFormProps) {
  const { t } = useLanguage()
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, dirtyFields },
    setValue,
    watch,
    reset,
    trigger
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      courseId: "",
      firstName: "",
      lastName: "",
      fullName: "",
      email: "",
      phone: "",
      location: "",
      message: ""
    }
  })

  const watchedFirstName = watch("firstName", "")
  const watchedLastName = watch("lastName", "")

  // Helper function to get validation state
  const getFieldState = (fieldName: keyof BookingFormData) => {
    const hasError = !!errors[fieldName]
    const isTouched = !!touchedFields[fieldName]
    const isDirty = !!dirtyFields[fieldName]
    const value = watch(fieldName)

    if (hasError && isTouched) return "error"
    if (!hasError && isDirty && value && value.toString().trim() !== "") return "success"
    if (isDirty && !hasError) return "neutral"
    return "default"
  }

  // Helper function to get field icon
  const getFieldIcon = (fieldName: keyof BookingFormData) => {
    const state = getFieldState(fieldName)
    if (state === "success") return <Check className="w-4 h-4 text-green-500" />
    if (state === "error") return <X className="w-4 h-4 text-red-500" />
    return null
  }

  // Auto-generate full name
  useEffect(() => {
    const fullName = `${watchedFirstName} ${watchedLastName}`.trim()
    if (fullName !== " ") {
      setValue("fullName", fullName)
    }
  }, [watchedFirstName, watchedLastName, setValue])

  // Fetch courses on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/courses?limit=50')
        if (response.ok) {
          const data = await response.json()
          setCourses(data.data || [])
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/guest-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset({
          courseId: "",
          firstName: "",
          lastName: "",
          fullName: "",
          email: "",
          phone: "",
          location: "",
          message: ""
        })
        setSelectedCourse(null)
        // Auto-hide success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Failed to submit booking')
      }
    } catch (error) {
      console.error('Booking submission error:', error)
      alert('Failed to submit booking. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCourseSelect = (courseId: string) => {
    setValue("courseId", courseId)
    const course = courses.find(c => c.id === courseId)
    setSelectedCourse(course || null)
  }

  if (isSuccess) {
    return (
      <Card className={cn("w-full max-w-2xl mx-auto animate-in fade-in-0 zoom-in-95", className)}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">{t("booking.success_title")}</h3>
              <p className="text-muted-foreground">
                {t("booking.success_message")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("w-full max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-700", className)}>
      <CardHeader className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <BookOpen className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {t("booking.title")}
        </CardTitle>
        <CardDescription className="text-base">
          {t("booking.subtitle")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Course Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {t("booking.select_course")}
            </Label>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">{t("booking.loading_courses")}</span>
              </div>
            ) : (
              <Select onValueChange={handleCourseSelect}>
                <SelectTrigger className="w-full h-12 text-left">
                  <SelectValue placeholder={t("booking.select_course_placeholder")} />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="font-medium">{course.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {course.level}
                            </Badge>
                            {course.category?.name && (
                              <span>{course.category.name}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          {course.isFree ? (
                            <Badge variant="outline" className="text-green-600 border-green-200">
                              {t("booking.free")}
                            </Badge>
                          ) : (
                            <span className="font-semibold text-primary">
                              {course.currency} {course.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            {errors.courseId && (
              <p className="text-sm text-destructive">{t("booking.validation.course_required")}</p>
            )}
          </div>

          {/* Selected Course Preview */}
          {selectedCourse && (
            <div className="bg-muted/50 rounded-lg p-4 animate-in slide-in-from-top-2 duration-300">
              <h4 className="font-semibold mb-2">{t("booking.selected_course")}</h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedCourse.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{selectedCourse.level}</Badge>
                    {selectedCourse.category?.name && (
                      <span className="text-sm text-muted-foreground">{selectedCourse.category.name}</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {selectedCourse.isFree ? (
                    <Badge variant="outline" className="text-green-600">{t("booking.free")}</Badge>
                  ) : (
                    <span className="font-bold text-lg text-primary">
                      {selectedCourse.currency} {selectedCourse.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t("booking.first_name")}
              </Label>
              <div className="relative">
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder={t("booking.first_name_placeholder")}
                  className={cn(
                    "h-11 pr-10",
                    getFieldState("firstName") === "error" && "border-red-500 focus-visible:ring-red-500",
                    getFieldState("firstName") === "success" && "border-green-500 focus-visible:ring-green-500"
                  )}
                  onBlur={() => trigger("firstName")}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon("firstName")}
                </div>
              </div>
              {errors.firstName && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName.message}
                </div>
              )}
              {getFieldState("firstName") === "success" && !errors.firstName && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  {t("booking.feedback.looks_good")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {t("booking.last_name")}
              </Label>
              <div className="relative">
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder={t("booking.last_name_placeholder")}
                  className={cn(
                    "h-11 pr-10",
                    getFieldState("lastName") === "error" && "border-red-500 focus-visible:ring-red-500",
                    getFieldState("lastName") === "success" && "border-green-500 focus-visible:ring-green-500"
                  )}
                  onBlur={() => trigger("lastName")}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon("lastName")}
                </div>
              </div>
              {errors.lastName && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName.message}
                </div>
              )}
              {getFieldState("lastName") === "success" && !errors.lastName && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  {t("booking.feedback.looks_good")}
                </div>
              )}
            </div>
          </div>

          {/* Full Name (Auto-generated) */}
          <div className="space-y-2">
            <Label htmlFor="fullName">{t("booking.full_name")}</Label>
            <Input
              id="fullName"
              {...register("fullName")}
              placeholder={t("booking.full_name_placeholder")}
              className="h-11 bg-muted/50"
              readOnly
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{t("booking.validation.full_name_min")}</p>
            )}
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {t("booking.email")}
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  placeholder={t("booking.email_placeholder")}
                  className={cn(
                    "h-11 pr-10",
                    getFieldState("email") === "error" && "border-red-500 focus-visible:ring-red-500",
                    getFieldState("email") === "success" && "border-green-500 focus-visible:ring-green-500"
                  )}
                  onBlur={() => trigger("email")}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon("email")}
                </div>
              </div>
              {errors.email && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email.message}
                </div>
              )}
              {getFieldState("email") === "success" && !errors.email && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  {t("booking.feedback.valid_email")}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {t("booking.phone")}
              </Label>
              <div className="relative">
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder={t("booking.phone_placeholder")}
                  className={cn(
                    "h-11 pr-10",
                    getFieldState("phone") === "error" && "border-red-500 focus-visible:ring-red-500",
                    getFieldState("phone") === "success" && "border-green-500 focus-visible:ring-green-500"
                  )}
                  onBlur={() => trigger("phone")}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {getFieldIcon("phone")}
                </div>
              </div>
              {errors.phone && (
                <div className="flex items-center gap-2 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone.message}
                </div>
              )}
              {getFieldState("phone") === "success" && !errors.phone && watch("phone") && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <Check className="w-4 h-4" />
                  {t("booking.feedback.valid_phone")}
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {t("booking.location")}
            </Label>
            <div className="relative">
              <Input
                id="location"
                {...register("location")}
                placeholder={t("booking.location_placeholder")}
                className={cn(
                  "h-11 pr-10",
                  getFieldState("location") === "error" && "border-red-500 focus-visible:ring-red-500",
                  getFieldState("location") === "success" && "border-green-500 focus-visible:ring-green-500"
                )}
                onBlur={() => trigger("location")}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getFieldIcon("location")}
              </div>
            </div>
            {errors.location && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.location.message}
              </div>
            )}
            {getFieldState("location") === "success" && !errors.location && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" />
                {t("booking.feedback.location_good")}
              </div>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {t("booking.message")}
            </Label>
            <div className="relative">
              <Textarea
                id="message"
                {...register("message")}
                placeholder={t("booking.message_placeholder")}
                className={cn(
                  "min-h-24 resize-none pr-16",
                  getFieldState("message") === "error" && "border-red-500 focus-visible:ring-red-500",
                  getFieldState("message") === "success" && "border-green-500 focus-visible:ring-green-500"
                )}
                onBlur={() => trigger("message")}
                maxLength={1000}
              />
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                {(watch("message") || "").length}/1000
              </div>
            </div>
            {errors.message && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="w-4 h-4" />
                {errors.message.message}
              </div>
            )}
            {getFieldState("message") === "success" && !errors.message && watch("message") && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Check className="w-4 h-4" />
                {t("booking.feedback.message_added")}
              </div>
            )}
          </div>

          {/* Form Validation Summary */}
          {!isValid && Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-in slide-in-from-top-2">
              <div className="flex items-center gap-2 text-red-800 font-medium mb-2">
                <AlertCircle className="w-5 h-5" />
                {t("booking.feedback.fix_errors")}
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, error]) => (
                  <li key={field} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-12 text-base font-semibold animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {t("booking.submitting")}
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5 mr-2" />
                {t("booking.submit")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}