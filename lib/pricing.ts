export interface PricingPlan {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  interval: "month" | "year" | "lifetime"
  features: string[]
  popular?: boolean
  maxCourses?: number
  maxStudents?: number
  support: "community" | "email" | "priority"
  analytics: boolean
  certificates: boolean
  downloadableContent: boolean
}

export interface PaymentMethod {
  id: string
  type: "card" | "paypal" | "bank"
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

export interface Invoice {
  id: string
  amount: number
  currency: string
  status: "paid" | "pending" | "failed"
  date: string
  description: string
  downloadUrl?: string
}

export interface Subscription {
  id: string
  planId: string
  status: "active" | "cancelled" | "expired" | "past_due"
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAtPeriodEnd: boolean
}

// Mock pricing plans
export const pricingPlans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for getting started",
    price: 0,
    interval: "month",
    features: ["Access to free courses", "Basic progress tracking", "Community support", "Standard video quality"],
    maxCourses: 3,
    support: "community",
    analytics: false,
    certificates: false,
    downloadableContent: false,
  },
  {
    id: "basic",
    name: "Basic",
    description: "Great for individual learners",
    price: 19.99,
    originalPrice: 29.99,
    interval: "month",
    features: [
      "Access to all courses",
      "Advanced progress tracking",
      "Email support",
      "HD video quality",
      "Mobile app access",
      "Basic certificates",
    ],
    maxCourses: 50,
    support: "email",
    analytics: true,
    certificates: true,
    downloadableContent: false,
    popular: true,
  },
  {
    id: "premium",
    name: "Premium",
    description: "Best for serious learners",
    price: 39.99,
    originalPrice: 59.99,
    interval: "month",
    features: [
      "Everything in Basic",
      "Priority support",
      "Downloadable content",
      "Advanced analytics",
      "1-on-1 mentoring sessions",
      "Premium certificates",
      "Early access to new courses",
    ],
    support: "priority",
    analytics: true,
    certificates: true,
    downloadableContent: true,
  },
  {
    id: "yearly-basic",
    name: "Basic Annual",
    description: "Save 40% with annual billing",
    price: 143.99,
    originalPrice: 239.88,
    interval: "year",
    features: ["Everything in Basic monthly", "2 months free", "Annual progress reports"],
    maxCourses: 50,
    support: "email",
    analytics: true,
    certificates: true,
    downloadableContent: false,
  },
  {
    id: "yearly-premium",
    name: "Premium Annual",
    description: "Maximum value for dedicated learners",
    price: 287.99,
    originalPrice: 479.88,
    interval: "year",
    features: ["Everything in Premium monthly", "2 months free", "Annual progress reports", "Exclusive annual events"],
    support: "priority",
    analytics: true,
    certificates: true,
    downloadableContent: true,
  },
]

// Mock payment API
export const paymentAPI = {
  async createPaymentIntent(amount: number, currency = "usd"): Promise<{ clientSecret: string }> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return {
      clientSecret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
    }
  },

  async processPayment(paymentMethodId: string, amount: number): Promise<{ success: boolean; transactionId?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock payment processing with 95% success rate
    const success = Math.random() > 0.05

    if (success) {
      return {
        success: true,
        transactionId: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      }
    } else {
      throw new Error("Payment failed. Please try again.")
    }
  },

  async subscribeToPlan(planId: string, paymentMethodId: string): Promise<Subscription> {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const now = new Date()
    const plan = pricingPlans.find((p) => p.id === planId)

    if (!plan) {
      throw new Error("Plan not found")
    }

    const endDate = new Date(now)
    if (plan.interval === "month") {
      endDate.setMonth(endDate.getMonth() + 1)
    } else if (plan.interval === "year") {
      endDate.setFullYear(endDate.getFullYear() + 1)
    }

    return {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      planId,
      status: "active",
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: endDate.toISOString(),
      cancelAtPeriodEnd: false,
    }
  },

  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "pm_1",
        type: "card",
        last4: "4242",
        brand: "visa",
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true,
      },
      {
        id: "pm_2",
        type: "card",
        last4: "0005",
        brand: "mastercard",
        expiryMonth: 8,
        expiryYear: 2026,
        isDefault: false,
      },
    ]
  },

  async getInvoices(userId: string): Promise<Invoice[]> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "inv_1",
        amount: 19.99,
        currency: "usd",
        status: "paid",
        date: "2024-02-01T00:00:00Z",
        description: "Basic Plan - February 2024",
        downloadUrl: "/invoices/inv_1.pdf",
      },
      {
        id: "inv_2",
        amount: 19.99,
        currency: "usd",
        status: "paid",
        date: "2024-01-01T00:00:00Z",
        description: "Basic Plan - January 2024",
        downloadUrl: "/invoices/inv_2.pdf",
      },
    ]
  },
}
