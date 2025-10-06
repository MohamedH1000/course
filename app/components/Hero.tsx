'use client'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    const { t, isRTL } = useLanguage()
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main content */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-8 leading-tight">
              {t("ejc.title")}
            </h1>
            
            {/* About section */}
            <div className="bg-card/30 backdrop-blur-sm p-6 md:p-8 lg:p-12 rounded-3xl border border-border/30 shadow-xl mb-12 md:mb-16 animate-scale-in">
              <div className="max-w-4xl mx-auto">
                <p className="text-lg md:text-xl text-foreground/90 mb-4 md:mb-6 leading-relaxed">
                  {t("ejc.founding")}
                </p>
                <p className="text-lg md:text-xl text-foreground/90 mb-4 md:mb-6 leading-relaxed">
                  {t("ejc.description1")}
                </p>
                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                  {t("ejc.description2")}
                </p>
              </div>
            </div>
            
            {/* Vision and Mission section */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
              <div className="bg-card/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">{t("ejc.vision")}</h2>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                  {t("ejc.vision.text")}
                </p>
              </div>
              
              <div className="bg-card/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-float delay-300">
                <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">{t("ejc.mission")}</h2>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                  {t("ejc.mission.text")}
                </p>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-6 py-4 md:px-8 md:py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
                <Link href="/courses">
                  {t("ejc.discoverCourses")}
                  <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? "rtl:rotate-180" : ""}`} />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-6 py-4 md:px-8 md:py-6 text-base md:text-lg bg-transparent border-2 border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300">
                {t("ejc.contactUs")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero