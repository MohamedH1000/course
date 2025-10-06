'use client'
import { useLanguage } from '@/components/language-provider'
import React from 'react'

const Stats = () => {
  const { t } = useLanguage();
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
        <div className="animate-fade-in">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 md:mb-3 animate-glow">١٠٠٠٠+</div>
          <div className="text-base md:text-lg text-foreground/80">{t("ejc.stats.students")}</div>
        </div>
        <div className="animate-fade-in delay-150">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 md:mb-3 animate-glow">٥٠٠+</div>
          <div className="text-base md:text-lg text-foreground/80">{t("ejc.stats.courses")}</div>
        </div>
        <div className="animate-fade-in delay-300">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 md:mb-3 animate-glow">٥٠+</div>
          <div className="text-base md:text-lg text-foreground/80">{t("ejc.stats.instructors")}</div>
        </div>
        <div className="animate-fade-in delay-450">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2 md:mb-3 animate-glow">٩٥%</div>
          <div className="text-base md:text-lg text-foreground/80">{t("ejc.stats.successRate")}</div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Stats