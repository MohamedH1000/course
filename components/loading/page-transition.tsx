"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { GraduationCap } from "lucide-react"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  useEffect(() => {
    if (pathname !== prevPathname) {
      setIsLoading(true)
      setPrevPathname(pathname)
      
      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [pathname, prevPathname])

  if (isLoading) {
    return <PageTransitionLoading />
  }

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  )
}

function PageTransitionLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full animate-float [animation-delay:0s]" />
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-accent/20 rounded-full animate-float [animation-delay:1s]" />
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-primary/10 rounded-full animate-float [animation-delay:2s]" />
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative flex flex-col items-center space-y-8">
        {/* Logo with Glow Effect */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <div className="w-20 h-20 bg-primary/30 rounded-full" />
          </div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-full flex items-center justify-center animate-glow">
            <GraduationCap className="w-10 h-10 text-primary-foreground animate-pulse" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl font-bold text-foreground animate-fade-in">
            Loading
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-loading-bar" />
        </div>

        {/* Loading Steps */}
        <div className="text-center space-y-2 opacity-70">
          <div className="text-sm text-muted-foreground animate-pulse">
            Preparing your learning experience...
          </div>
        </div>
      </div>
    </div>
  )
}

// Route Loading Component
export function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-accent/50 rounded-full animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">Loading Page</h3>
          <p className="text-sm text-muted-foreground">Please wait while we prepare your content</p>
        </div>
      </div>
    </div>
  )
}

// Suspense Fallback
export function SuspenseFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 bg-primary/20 rounded-full animate-ping" />
          <div className="absolute inset-0 w-12 h-12 bg-primary rounded-full animate-pulse flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Loading content...</p>
      </div>
    </div>
  )
}