"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { BookOpen, Users, Award, Clock, Play, ArrowRight } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function HomePage() {
  const { t, isRTL } = useLanguage()
  const { user, logout } = useAuth()

  const handleAuthAction = () => {
    if (user) {
      logout()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-serif font-bold text-foreground">EduPlatform</span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                {t("nav.home")}
              </a>
              <Link href="/courses" className="text-foreground hover:text-primary transition-colors">
                {t("nav.courses")}
              </Link>
              <Link href="/pricing" className="text-foreground hover:text-primary transition-colors">
                {t("nav.pricing")}
              </Link>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                {t("nav.about")}
              </a>
            </nav>

            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <LanguageToggle />
              {user ? (
                <>
                  <Button variant="ghost" className="hidden md:inline-flex" asChild>
                    <Link href="/dashboard">{t("nav.dashboard")}</Link>
                  </Button>
                  <Button variant="outline" onClick={handleAuthAction}>
                    {t("nav.logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="hidden md:inline-flex" asChild>
                    <Link href="/auth/signin">{t("nav.signin")}</Link>
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" asChild>
                    <Link href="/auth/signup">{t("nav.signup")}</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">{t("hero.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3" asChild>
                <Link href="/pricing">
                  {t("hero.cta")}
                  <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? "rtl:rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                {t("hero.watch")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">{t("features.title")}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{t("features.expert")}</h3>
                <p className="text-muted-foreground">{t("features.expert.desc")}</p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{t("features.flexible")}</h3>
                <p className="text-muted-foreground">{t("features.flexible.desc")}</p>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{t("features.certificate")}</h3>
                <p className="text-muted-foreground">{t("features.certificate.desc")}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Students</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Courses</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Instructors</div>
            </div>
            <div className="animate-fade-in">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-serif font-bold text-foreground">EduPlatform</span>
          </div>
          <p className="text-muted-foreground">© 2024 EduPlatform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
