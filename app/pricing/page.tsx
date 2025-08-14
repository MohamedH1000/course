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
  const { t } = useLanguage()
  const router = useRouter()

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
              Choose Your Learning Plan
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Unlock your potential with our flexible pricing options designed for every learner
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch checked={isYearly} onCheckedChange={setIsYearly} />
              <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge
                  variant="secondary"
                  className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                >
                  Save 40%
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
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">Most Popular</Badge>
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
                    {plan.interval !== "lifetime" && <span className="text-muted-foreground">/{plan.interval}</span>}
                  </div>
                  {plan.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground line-through">${plan.originalPrice}</span>
                      <Badge variant="destructive" className="text-xs">
                        {Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100)}% OFF
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
                      Processing...
                    </div>
                  ) : plan.id === "free" ? (
                    "Get Started Free"
                  ) : (
                    `Choose ${plan.name}`
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center text-foreground mb-12">
            Frequently Asked Questions
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I change my plan anytime?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                  billing cycle.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Is there a free trial?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, our Free plan gives you access to select courses. You can upgrade anytime to unlock all features.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Do you offer refunds?</h3>
                <p className="text-sm text-muted-foreground">
                  We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Can I cancel my subscription?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Do you offer student discounts?</h3>
                <p className="text-sm text-muted-foreground">
                  Yes, we offer special pricing for students and educational institutions. Contact us for more details.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Section */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">Need something more?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Looking for enterprise solutions, custom integrations, or bulk pricing? We'd love to work with you to
                create a plan that fits your organization's needs.
              </p>
              <Button size="lg" variant="outline" className="bg-transparent">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
