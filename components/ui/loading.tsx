"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { GraduationCap, BookOpen, Users, Award } from "lucide-react"

// Main Loading Component
interface LoadingProps {
  variant?: "default" | "page" | "overlay" | "minimal" | "dots" | "pulse"
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  className?: string
}

export function Loading({ 
  variant = "default", 
  size = "md", 
  text = "Loading...", 
  className 
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  }

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base", 
    xl: "text-lg"
  }

  switch (variant) {
    case "page":
      return <PageLoading text={text} />
    case "overlay":
      return <OverlayLoading text={text} />
    case "minimal":
      return <MinimalLoading size={size} className={className} />
    case "dots":
      return <DotsLoading size={size} text={text} className={className} />
    case "pulse":
      return <PulseLoading size={size} text={text} className={className} />
    default:
      return (
        <div className={cn("flex items-center gap-2", className)}>
          <div className={cn(
            "animate-spin rounded-full border-2 border-muted border-t-primary",
            sizeClasses[size]
          )} />
          {text && (
            <span className={cn("text-muted-foreground", textSizeClasses[size])}>
              {text}
            </span>
          )}
        </div>
      )
  }
}

// Full Page Loading Component
export function PageLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6 p-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <div className="w-16 h-16 bg-primary/20 rounded-full" />
          </div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center animate-pulse">
            <GraduationCap className="w-8 h-8 text-primary-foreground animate-bounce" />
          </div>
        </div>

        {/* Animated Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-foreground animate-fade-in">
            {text}
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full animate-loading-bar" />
        </div>

        {/* Feature Icons */}
        <div className="flex items-center space-x-6 opacity-60">
          <BookOpen className="w-5 h-5 text-muted-foreground animate-pulse [animation-delay:0.5s]" />
          <Users className="w-5 h-5 text-muted-foreground animate-pulse [animation-delay:1s]" />
          <Award className="w-5 h-5 text-muted-foreground animate-pulse [animation-delay:1.5s]" />
        </div>
      </div>
    </div>
  )
}

// Overlay Loading Component
export function OverlayLoading({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg p-8 shadow-lg animate-scale-in">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-muted border-t-primary rounded-full animate-spin" />
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-b-primary/30 rounded-full animate-spin [animation-direction:reverse] [animation-duration:1.5s]" />
          </div>
          <p className="text-sm text-muted-foreground font-medium">{text}</p>
        </div>
      </div>
    </div>
  )
}

// Minimal Loading Component
export function MinimalLoading({ 
  size = "md", 
  className 
}: { 
  size?: "sm" | "md" | "lg" | "xl"
  className?: string 
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2", 
    lg: "w-8 h-8 border-[3px]",
    xl: "w-12 h-12 border-4"
  }

  return (
    <div className={cn(
      "animate-spin rounded-full border-muted border-t-primary",
      sizeClasses[size],
      className
    )} />
  )
}

// Dots Loading Component
export function DotsLoading({ 
  size = "md", 
  text, 
  className 
}: { 
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  className?: string 
}) {
  const dotSizes = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3", 
    xl: "w-4 h-4"
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg"
  }

  return (
    <div className={cn("flex flex-col items-center space-y-3", className)}>
      <div className="flex items-center space-x-1">
        <div className={cn(
          "bg-primary rounded-full animate-bounce [animation-delay:-0.3s]",
          dotSizes[size]
        )} />
        <div className={cn(
          "bg-primary rounded-full animate-bounce [animation-delay:-0.15s]", 
          dotSizes[size]
        )} />
        <div className={cn(
          "bg-primary rounded-full animate-bounce",
          dotSizes[size]
        )} />
      </div>
      {text && (
        <p className={cn("text-muted-foreground font-medium", textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  )
}

// Pulse Loading Component
export function PulseLoading({ 
  size = "md", 
  text, 
  className 
}: { 
  size?: "sm" | "md" | "lg" | "xl"
  text?: string
  className?: string 
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16", 
    xl: "w-20 h-20"
  }

  const textSizes = {
    sm: "text-xs",
    md: "text-sm", 
    lg: "text-base",
    xl: "text-lg"
  }

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="relative flex items-center justify-center">
        <div className={cn(
          "absolute animate-ping bg-primary/20 rounded-full",
          sizeClasses[size]
        )} />
        <div className={cn(
          "relative bg-primary rounded-full animate-pulse",
          sizeClasses[size]
        )}>
          <GraduationCap className="absolute inset-0 m-auto w-1/2 h-1/2 text-primary-foreground" />
        </div>
      </div>
      {text && (
        <p className={cn("text-muted-foreground font-medium", textSizes[size])}>
          {text}
        </p>
      )}
    </div>
  )
}

// Skeleton Loading Components
export function SkeletonLine({ className }: { className?: string }) {
  return (
    <div className={cn(
      "animate-pulse bg-muted rounded h-4",
      className
    )} />
  )
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse space-y-3 p-4", className)}>
      <div className="bg-muted rounded h-32" />
      <div className="space-y-2">
        <div className="bg-muted rounded h-4" />
        <div className="bg-muted rounded h-4 w-3/4" />
      </div>
    </div>
  )
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  }

  return (
    <div className={cn(
      "animate-pulse bg-muted rounded-full",
      sizeClasses[size]
    )} />
  )
}