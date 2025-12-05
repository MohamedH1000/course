"use client"

import Header from "./components/Header"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Features from "./components/Features"
import Stats from "./components/Stats"
import BookingForm from "../components/BookingForm"
import { useLanguage } from "../components/language-provider"

export default function HomePage() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* Booking Form Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              {t("booking.section.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("booking.section.subtitle")}
            </p>
          </div>

          <BookingForm />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}