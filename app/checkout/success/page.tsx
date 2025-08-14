"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Download, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)

  useEffect(() => {
    const subId = searchParams.get("subscription")
    setSubscriptionId(subId)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <Card className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl text-green-800 dark:text-green-200">Payment Successful!</CardTitle>
            <CardDescription className="text-green-600 dark:text-green-400">
              Welcome to EduPlatform! Your subscription is now active.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-background rounded-lg p-4 border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Subscription Details</h3>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Active</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subscription ID:</span>
                  <span className="font-mono">{subscriptionId || "sub_xxxxxxxxxx"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plan:</span>
                  <span>Basic Plan</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Billing:</span>
                  <span>Monthly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next billing date:</span>
                  <span>{new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold">What's next?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Access all courses</p>
                    <p className="text-sm text-muted-foreground">Browse and enroll in any course on our platform</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Track your progress</p>
                    <p className="text-sm text-muted-foreground">Monitor your learning journey in your dashboard</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Earn certificates</p>
                    <p className="text-sm text-muted-foreground">Get recognized for completing courses</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                <Link href="/dashboard">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1 bg-transparent">
                <Link href="/courses">Browse Courses</Link>
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>Need help? Contact our support team at support@eduplatform.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
