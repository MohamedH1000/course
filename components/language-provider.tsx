"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.pricing": "Pricing",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.signin": "Sign In",
    "nav.signup": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.profile": "Profile",
    "nav.logout": "Logout",

    // Hero Section
    "hero.title": "Master New Skills with Expert-Led Courses",
    "hero.subtitle": "Join thousands of learners advancing their careers with our premium online courses",
    "hero.cta": "Start Learning Today",
    "hero.watch": "Watch Demo",

    // Features
    "features.title": "Why Choose Our Platform",
    "features.expert": "Expert Instructors",
    "features.expert.desc": "Learn from industry professionals with years of experience",
    "features.flexible": "Flexible Learning",
    "features.flexible.desc": "Study at your own pace, anytime, anywhere",
    "features.certificate": "Certificates",
    "features.certificate.desc": "Earn recognized certificates upon course completion",

    // Auth
    "auth.signin.title": "Sign in to your account",
    "auth.signin.subtitle": "Enter your email and password to access your courses",
    "auth.signin.welcome": "Welcome back! Please sign in to your account.",
    "auth.signin.email": "Email",
    "auth.signin.email.placeholder": "Enter your email",
    "auth.signin.password": "Password",
    "auth.signin.password.placeholder": "Enter your password",
    "auth.signin.forgot": "Forgot password?",
    "auth.signin.button": "Sign In",
    "auth.signin.signing": "Signing in...",
    "auth.signin.no_account": "Don't have an account?",
    "auth.signin.signup_link": "Sign up",
    "auth.signin.demo": "Demo Credentials:",
    "auth.signin.admin": "Admin: admin@eduplatform.com",
    "auth.signin.instructor": "Instructor: instructor@eduplatform.com",
    "auth.signin.student": "Student: student@eduplatform.com",
    "auth.signin.demo_password": "Password: password123",
    "auth.signin.brand": "EduPlatform",

    // Auth - Signup
    "auth.signup.title": "Create your account",
    "auth.signup.subtitle": "Join thousands of learners on our platform",
    "auth.signup.welcome": "Create your account to start learning",
    "auth.signup.name": "Full Name",
    "auth.signup.name.placeholder": "Enter your full name",
    "auth.signup.email": "Email",
    "auth.signup.email.placeholder": "Enter your email",
    "auth.signup.role": "Account Type",
    "auth.signup.role.placeholder": "Select your role",
    "auth.signup.role.student": "Student - Learn from courses",
    "auth.signup.role.instructor": "Instructor - Create and teach courses",
    "auth.signup.password": "Password",
    "auth.signup.password.placeholder": "Create a password",
    "auth.signup.confirm_password": "Confirm Password",
    "auth.signup.confirm_password.placeholder": "Confirm your password",
    "auth.signup.button": "Create Account",
    "auth.signup.creating": "Creating account...",
    "auth.signup.have_account": "Already have an account?",
    "auth.signup.signin_link": "Sign in",
    "auth.signup.error.password_mismatch": "Passwords do not match",
    "auth.signup.error.password_length": "Password must be at least 6 characters long",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome back",
    "dashboard.good_morning": "Good morning",
    "dashboard.good_afternoon": "Good afternoon", 
    "dashboard.good_evening": "Good evening",
    "dashboard.ready_to_continue": "Ready to continue your learning journey?",
    "dashboard.manage_videos": "Manage Videos",
    "dashboard.enrolled": "Enrolled",
    "dashboard.completed": "Completed",
    "dashboard.learning": "Learning",
    "dashboard.day_streak": "Day Streak",
    "dashboard.my_courses": "My Courses",
    "dashboard.continue_learning": "Continue Learning",
    "dashboard.browse_more_courses": "Browse More Courses",
    "dashboard.learning_progress": "Learning Progress",
    "dashboard.weekly_activity": "Weekly Activity",
    "dashboard.weekly_activity_desc": "Your learning activity this week",
    "dashboard.course_progress": "Course Progress",
    "dashboard.course_progress_desc": "Progress across all enrolled courses",
    "dashboard.recent_activity": "Recent Activity",
    "dashboard.recent_activity_desc": "Your latest learning activities",
    "dashboard.certificates_achievements": "Certificates & Achievements",
    "dashboard.course_completion": "Course Completion",
    "dashboard.issued_on": "Issued on",
    "dashboard.certificate_id": "Certificate ID",
    "dashboard.download": "Download",
    "dashboard.no_certificates": "No certificates yet",
    "dashboard.complete_courses_earn": "Complete courses to earn certificates",
    "dashboard.profile_settings": "Profile Settings",
    "dashboard.personal_information": "Personal Information",
    "dashboard.personal_info_desc": "Update your personal details",
    "dashboard.change_photo": "Change Photo",
    "dashboard.full_name": "Full Name",
    "dashboard.email": "Email",
    "dashboard.role": "Role",
    "dashboard.update_profile": "Update Profile",
    "dashboard.learning_preferences": "Learning Preferences",
    "dashboard.learning_preferences_desc": "Customize your learning experience",
    "dashboard.preferred_language": "Preferred Language",
    "dashboard.email_notifications": "Email Notifications",
    "dashboard.course_updates": "Course updates",
    "dashboard.course_recommendations": "New course recommendations",
    "dashboard.marketing_emails": "Marketing emails",
    "dashboard.save_preferences": "Save Preferences",
    "dashboard.completed_lesson": "Completed lesson",
    "dashboard.started_course": "Started course",
    "dashboard.earned_certificate": "Earned certificate",
    "dashboard.hours_ago": "hours ago",
    "dashboard.day_ago": "day ago",
    "dashboard.days_ago": "days ago",
    "dashboard.overview": "Overview",
    "dashboard.my_courses": "My Courses",
    "dashboard.progress": "Progress",
    "dashboard.achievements": "Achievements",
    "dashboard.settings": "Settings",
    "dashboard.profile": "Profile",
    "dashboard.notifications": "Notifications",
    "dashboard.help": "Help & Support",
    "dashboard.logout": "Logout",
    "dashboard.home": "Home",
    "dashboard.courses": "Courses",
    "dashboard.students": "Students",
    "dashboard.analytics": "Analytics",
    "dashboard.create_course": "Create Course",
    "dashboard.course_management": "Course Management",
    "dashboard.student_progress": "Student Progress",
    "dashboard.earnings": "Earnings",
    "dashboard.reviews": "Reviews",
    "dashboard.messages": "Messages",
    "dashboard.calendar": "Calendar",
    "dashboard.library": "Library",
    "dashboard.favorites": "Favorites",
    "dashboard.recent": "Recent",
    "dashboard.continue_learning": "Continue Learning",
    "dashboard.enrolled_courses": "Enrolled Courses",
    "dashboard.completed_courses": "Completed Courses",
    "dashboard.certificates": "Certificates",
    "dashboard.search_placeholder": "Search courses, instructors...",
    "dashboard.filter": "Filter",
    "dashboard.sort": "Sort",
    "dashboard.view_all": "View All",
    "dashboard.no_courses": "No courses found",
    "dashboard.start_learning": "Start Learning",
    "dashboard.browse_courses": "Browse Courses",

    // Navigation Menu
    "nav.menu": "Menu",
    "nav.close": "Close",
    "nav.toggle_theme": "Toggle theme",
    "nav.toggle_language": "Toggle language",

    // Course Cards
    "course.duration": "Duration",
    "course.lessons": "Lessons",
    "course.students": "Students",
    "course.rating": "Rating",
    "course.level": "Level",
    "course.category": "Category",
    "course.instructor": "Instructor",
    "course.price": "Price",
    "course.free": "Free",
    "course.enroll": "Enroll Now",
    "course.continue": "Continue",
    "course.completed": "Completed",
    "course.progress": "Progress",
    "course.certificate": "Get Certificate",

    // Common
    "common.loading": "Loading...",
    "common.error": "Something went wrong",
    "common.success": "Success!",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
  },
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.courses": "الدورات",
    "nav.pricing": "الأسعار",
    "nav.about": "حولنا",
    "nav.contact": "اتصل بنا",
    "nav.signin": "تسجيل الدخول",
    "nav.signup": "إنشاء حساب",
    "nav.dashboard": "لوحة التحكم",
    "nav.profile": "الملف الشخصي",
    "nav.logout": "تسجيل الخروج",

    // Hero Section
    "hero.title": "اتقن مهارات جديدة مع دورات يقودها خبراء",
    "hero.subtitle": "انضم إلى آلاف المتعلمين الذين يطورون مسيرتهم المهنية مع دوراتنا المتميزة عبر الإنترنت",
    "hero.cta": "ابدأ التعلم اليوم",
    "hero.watch": "مشاهدة العرض التوضيحي",

    // Features
    "features.title": "لماذا تختار منصتنا",
    "features.expert": "مدربون خبراء",
    "features.expert.desc": "تعلم من محترفين في الصناعة بسنوات من الخبرة",
    "features.flexible": "تعلم مرن",
    "features.flexible.desc": "ادرس بوتيرتك الخاصة، في أي وقت، في أي مكان",
    "features.certificate": "شهادات",
    "features.certificate.desc": "احصل على شهادات معترف بها عند إكمال الدورة",

    // Auth
    "auth.signin.title": "تسجيل الدخول إلى حسابك",
    "auth.signin.subtitle": "أدخل بريدك الإلكتروني وكلمة المرور للوصول إلى دوراتك",
    "auth.signin.welcome": "مرحباً بعودتك! يرجى تسجيل الدخول إلى حسابك.",
    "auth.signin.email": "البريد الإلكتروني",
    "auth.signin.email.placeholder": "أدخل بريدك الإلكتروني",
    "auth.signin.password": "كلمة المرور",
    "auth.signin.password.placeholder": "أدخل كلمة المرور",
    "auth.signin.forgot": "نسيت كلمة المرور؟",
    "auth.signin.button": "تسجيل الدخول",
    "auth.signin.signing": "جاري تسجيل الدخول...",
    "auth.signin.no_account": "ليس لديك حساب؟",
    "auth.signin.signup_link": "إنشاء حساب",
    "auth.signin.demo": "بيانات تجريبية:",
    "auth.signin.admin": "مدير: admin@eduplatform.com",
    "auth.signin.instructor": "مدرب: instructor@eduplatform.com",
    "auth.signin.student": "طالب: student@eduplatform.com",
    "auth.signin.demo_password": "كلمة المرور: password123",
    "auth.signin.brand": "منصة التعليم",

    // Auth - Signup
    "auth.signup.title": "إنشاء حسابك",
    "auth.signup.subtitle": "انضم إلى آلاف المتعلمين على منصتنا",
    "auth.signup.welcome": "أنشئ حسابك لبدء التعلم",
    "auth.signup.name": "الاسم الكامل",
    "auth.signup.name.placeholder": "أدخل اسمك الكامل",
    "auth.signup.email": "البريد الإلكتروني",
    "auth.signup.email.placeholder": "أدخل بريدك الإلكتروني",
    "auth.signup.role": "نوع الحساب",
    "auth.signup.role.placeholder": "اختر دورك",
    "auth.signup.role.student": "طالب - تعلم من الدورات",
    "auth.signup.role.instructor": "مدرب - أنشئ ودرّس الدورات",
    "auth.signup.password": "كلمة المرور",
    "auth.signup.password.placeholder": "أنشئ كلمة مرور",
    "auth.signup.confirm_password": "تأكيد كلمة المرور",
    "auth.signup.confirm_password.placeholder": "أكد كلمة المرور",
    "auth.signup.button": "إنشاء حساب",
    "auth.signup.creating": "جاري إنشاء الحساب...",
    "auth.signup.have_account": "لديك حساب بالفعل؟",
    "auth.signup.signin_link": "تسجيل الدخول",
    "auth.signup.error.password_mismatch": "كلمات المرور غير متطابقة",
    "auth.signup.error.password_length": "يجب أن تكون كلمة المرور 6 أحرف على الأقل",

    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.welcome": "مرحباً بعودتك",
    "dashboard.overview": "نظرة عامة",
    "dashboard.my_courses": "دوراتي",
    "dashboard.progress": "التقدم",
    "dashboard.achievements": "الإنجازات",
    "dashboard.settings": "الإعدادات",
    "dashboard.profile": "الملف الشخصي",
    "dashboard.notifications": "الإشعارات",
    "dashboard.help": "المساعدة والدعم",
    "dashboard.logout": "تسجيل الخروج",
    "dashboard.home": "الرئيسية",
    "dashboard.courses": "الدورات",
    "dashboard.students": "الطلاب",
    "dashboard.analytics": "التحليلات",
    "dashboard.create_course": "إنشاء دورة",
    "dashboard.course_management": "إدارة الدورات",
    "dashboard.student_progress": "تقدم الطلاب",
    "dashboard.earnings": "الأرباح",
    "dashboard.reviews": "التقييمات",
    "dashboard.messages": "الرسائل",
    "dashboard.calendar": "التقويم",
    "dashboard.library": "المكتبة",
    "dashboard.favorites": "المفضلة",
    "dashboard.recent": "الأحدث",
    "dashboard.continue_learning": "متابعة التعلم",
    "dashboard.enrolled_courses": "الدورات المسجلة",
    "dashboard.completed_courses": "الدورات المكتملة",
    "dashboard.certificates": "الشهادات",
    "dashboard.good_morning": "صباح الخير",
    "dashboard.good_afternoon": "مساء الخير", 
    "dashboard.good_evening": "مساء الخير",
    "dashboard.ready_to_continue": "هل أنت مستعد لمتابعة رحلة التعلم؟",
    "dashboard.manage_videos": "إدارة الفيديوهات",
    "dashboard.enrolled": "مسجل",
    "dashboard.completed": "مكتمل",
    "dashboard.learning": "التعلم",
    "dashboard.day_streak": "سلسلة الأيام",
    "dashboard.browse_more_courses": "تصفح المزيد من الدورات",
    "dashboard.learning_progress": "تقدم التعلم",
    "dashboard.weekly_activity": "النشاط الأسبوعي",
    "dashboard.weekly_activity_desc": "نشاط التعلم هذا الأسبوع",
    "dashboard.course_progress": "تقدم الدورة",
    "dashboard.course_progress_desc": "التقدم عبر جميع الدورات المسجلة",
    "dashboard.recent_activity": "النشاط الأخير",
    "dashboard.recent_activity_desc": "أنشطة التعلم الأخيرة",
    "dashboard.certificates_achievements": "الشهادات والإنجازات",
    "dashboard.course_completion": "إكمال الدورة",
    "dashboard.issued_on": "صدر في",
    "dashboard.certificate_id": "رقم الشهادة",
    "dashboard.download": "تحميل",
    "dashboard.no_certificates": "لا توجد شهادات بعد",
    "dashboard.complete_courses_earn": "أكمل الدورات لكسب الشهادات",
    "dashboard.profile_settings": "إعدادات الملف الشخصي",
    "dashboard.personal_information": "المعلومات الشخصية",
    "dashboard.personal_info_desc": "تحديث تفاصيلك الشخصية",
    "dashboard.change_photo": "تغيير الصورة",
    "dashboard.full_name": "الاسم الكامل",
    "dashboard.email": "البريد الإلكتروني",
    "dashboard.role": "الدور",
    "dashboard.update_profile": "تحديث الملف الشخصي",
    "dashboard.learning_preferences": "تفضيلات التعلم",
    "dashboard.learning_preferences_desc": "تخصيص تجربة التعلم الخاصة بك",
    "dashboard.preferred_language": "اللغة المفضلة",
    "dashboard.email_notifications": "إشعارات البريد الإلكتروني",
    "dashboard.course_updates": "تحديثات الدورة",
    "dashboard.course_recommendations": "توصيات الدورات الجديدة",
    "dashboard.marketing_emails": "رسائل التسويق الإلكترونية",
    "dashboard.save_preferences": "حفظ التفضيلات",
    "dashboard.completed_lesson": "درس مكتمل",
    "dashboard.started_course": "دورة بدأت",
    "dashboard.earned_certificate": "شهادة مكتسبة",
    "dashboard.hours_ago": "منذ ساعات",
    "dashboard.day_ago": "منذ يوم",
    "dashboard.days_ago": "منذ أيام",
    "dashboard.search_placeholder": "البحث عن دورات، مدربين...",
    "dashboard.filter": "تصفية",
    "dashboard.sort": "ترتيب",
    "dashboard.view_all": "عرض الكل",
    "dashboard.no_courses": "لم يتم العثور على دورات",
    "dashboard.start_learning": "ابدأ التعلم",
    "dashboard.browse_courses": "تصفح الدورات",

    // Navigation Menu
    "nav.menu": "القائمة",
    "nav.close": "إغلاق",
    "nav.toggle_theme": "تبديل المظهر",
    "nav.toggle_language": "تبديل اللغة",

    // Course Cards
    "course.duration": "المدة",
    "course.lessons": "الدروس",
    "course.students": "الطلاب",
    "course.rating": "التقييم",
    "course.level": "المستوى",
    "course.category": "الفئة",
    "course.instructor": "المدرب",
    "course.price": "السعر",
    "course.free": "مجاني",
    "course.enroll": "سجل الآن",
    "course.continue": "متابعة",
    "course.completed": "مكتمل",
    "course.progress": "التقدم",
    "course.certificate": "احصل على الشهادة",

    // Common
    "common.loading": "جاري التحميل...",
    "common.error": "حدث خطأ ما",
    "common.success": "نجح!",
    "common.cancel": "إلغاء",
    "common.save": "حفظ",
    "common.edit": "تعديل",
    "common.delete": "حذف",
    "common.view": "عرض",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && (savedLang === "en" || savedLang === "ar")) {
      setLanguage(savedLang)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  const value = {
    language,
    setLanguage,
    t,
    isRTL: language === "ar",
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
