'use client'
import { useLanguage } from '@/components/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Clock, Users, Target, BookOpen, TrendingUp } from 'lucide-react'
import React from 'react'

const Features = () => {
    const { t, isRTL } = useLanguage()
  return (
    <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-card/30">
    <div className="container mx-auto">
      <div className="text-center mb-12 md:mb-16 animate-fade-in">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">{t("ejc.whyChoose")}</h2>
        <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto">
          {t("ejc.whyChoose.desc")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm group">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-primary/20 transition-all duration-300">
              <Users className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">{t("ejc.expertInstructors")}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("ejc.expertInstructors.desc")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm group">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-accent/20 transition-all duration-300">
              <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">{t("ejc.advancedCurriculum")}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("ejc.advancedCurriculum.desc")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm group">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-primary/20 transition-all duration-300">
              <TrendingUp className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">{t("ejc.skillDevelopment")}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("ejc.skillDevelopment.desc")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm group">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-accent/20 transition-all duration-300">
              <Target className="h-8 w-8 md:h-10 md:w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">{t("ejc.marketTargeting")}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("ejc.marketTargeting.desc")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm group">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-primary/20 transition-all duration-300">
              <Clock className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">{t("ejc.flexibleLearning")}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("ejc.flexibleLearning.desc")}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/50 backdrop-blur-sm group">
          <CardContent className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:bg-accent/20 transition-all duration-300">
              <Award className="h-8 w-8 md:h-10 md:w-10 text-accent group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3 md:mb-4">{t("ejc.certifiedCredentials")}</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              {t("ejc.certifiedCredentials.desc")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default Features