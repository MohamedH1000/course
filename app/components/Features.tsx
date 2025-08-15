'use client'
import { useLanguage } from '@/components/language-provider'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Clock, Users } from 'lucide-react'
import React from 'react'

const Features = () => {
    const { t, isRTL } = useLanguage()
  return (
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
  )
}

export default Features