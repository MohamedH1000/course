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
