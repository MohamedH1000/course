'use client'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    const { t, isRTL } = useLanguage()
  return (
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
  )
}

export default Hero