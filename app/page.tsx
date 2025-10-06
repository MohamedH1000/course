import Header from "./components/Header"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Features from "./components/Features"
import Stats from "./components/Stats"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  )
}