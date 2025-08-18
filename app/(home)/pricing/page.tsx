"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/components/language-provider"
import { pricingPlans, type PricingPlan } from "@/lib/pricing"
import { Check, Star, Zap, Shield, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [loading, setLoading] = useState<string | null>(null)
  const { user } = useAuth()
  const { t, language } = useLanguage()
  const router = useRouter()
  const isArabic = language === "ar" ? "rtl" : "ltr"
  const filteredPlans = pricingPlans.filter((plan) => {
    if (isYearly) {
      return plan.interval === "year" || plan.id === "free"
    }
    return plan.interval === "month"
  })

  const handleSelectPlan = async (plan: PricingPlan) => {
    if (!user) {
      router.push("/auth/signin")
      return
    }

    if (plan.id === "free") {
      // Handle free plan selection
      return
    }

    setLoading(plan.id)

    // Simulate payment processing
    setTimeout(() => {
      setLoading(null)
      router.push(`/checkout?plan=${plan.id}`)
    }, 1000)
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "free":
        return <Users className="h-6 w-6" />
      case "basic":
      case "yearly-basic":
        return <Star className="h-6 w-6" />
      case "premium":
      case "yearly-premium":
        return <Zap className="h-6 w-6" />
      default:
        return <Shield className="h-6 w-6" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              {t("pricing.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("pricing.subtitle")}
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {t("pricing.monthly")}
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} dir={isArabic}/>
              <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {t("pricing.yearly")}
              </span>
              {isYearly && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  {t("pricing.save")}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative border-border/50 hover:shadow-lg transition-all duration-300 ${
                plan.popular ? "border-primary/50 shadow-lg scale-105" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">{t("pricing.most_popular")}</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">{getPlanIcon(plan.id)}</div>
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Pricing */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                    {plan.interval !== "lifetime" && (
                      <span className="text-muted-foreground">
                        {plan.interval === "month" ? t("pricing.per_month") : t("pricing.per_year")}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground line-through">${plan.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">
                        {t("pricing.off", { percent: Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100) })}
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  }`}
                  onClick={() => handleSelectPlan(plan)}
                  disabled={loading === plan.id}
                >
                  {loading === plan.id ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                      {t("pricing.processing")}
                    </div>
                  ) : plan.id === "free" ? (
                    t("pricing.get_started_free")
                  ) : (
                    t("pricing.choose_plan", { planName: plan.name })
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            {t("pricing.faq.title")}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t("pricing.faq.change_plan.question")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.faq.change_plan.answer")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">{t("pricing.faq.payment_methods.question")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.faq.payment_methods.answer")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">{t("pricing.faq.free_trial.question")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.faq.free_trial.answer")}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">{t("pricing.faq.refunds.question")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.faq.refunds.answer")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">{t("pricing.faq.cancel.question")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.faq.cancel.answer")}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">{t("pricing.faq.student_discount.question")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("pricing.faq.student_discount.answer")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">{t("pricing.enterprise.title")}</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t("pricing.enterprise.description")}
              </p>
              <Button size="lg" variant="outline" className="bg-transparent">
                {t("pricing.enterprise.contact")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
