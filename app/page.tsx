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

      {/* Features Section */}
      <Features />

      {/* Stats Section */}
      <Stats />

      {/* Footer */}
      <Footer />
    </div>
  )
}
