"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { BookOpen, Users, Clock, Star } from "lucide-react"
import { SkeletonCard, SkeletonLine } from "@/components/ui/loading"

// Course Card Loading Skeleton
export function CourseCardLoading({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse", className)}>
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {/* Image placeholder */}
        <div className="h-48 bg-muted relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-muted-foreground/50 animate-pulse" />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted rounded w-16" />
            <div className="h-4 bg-muted rounded w-12" />
          </div>
          
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="h-3 bg-muted rounded w-12" />
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-14" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-8" />
            </div>
            <div className="h-2 bg-muted rounded w-full" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="h-3 bg-muted rounded w-20" />
            <div className="h-8 bg-muted rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Course Grid Loading
export function CourseGridLoading({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CourseCardLoading key={i} />
      ))}
    </div>
  )
}

// Course List Loading
export function CourseListLoading({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex gap-6">
              <div className="w-32 h-24 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-muted-foreground/50" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                  <div className="flex gap-2 ml-4">
                    <div className="h-6 bg-muted rounded w-16" />
                    <div className="h-6 bg-muted rounded w-20" />
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="h-3 bg-muted rounded w-12" />
                  <div className="h-3 bg-muted rounded w-16" />
                  <div className="h-3 bg-muted rounded w-14" />
                  <div className="h-3 bg-muted rounded w-12" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1 max-w-xs space-y-1">
                    <div className="flex justify-between">
                      <div className="h-3 bg-muted rounded w-16" />
                      <div className="h-3 bg-muted rounded w-8" />
                    </div>
                    <div className="h-2 bg-muted rounded w-full" />
                  </div>
                  <div className="h-9 bg-muted rounded w-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Dashboard Stats Loading
export function DashboardStatsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-20" />
              <div className="w-4 h-4 bg-muted rounded" />
            </div>
            <div className="h-8 bg-muted rounded w-16 mb-1" />
            <div className="h-3 bg-muted rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Lesson Loading
export function LessonLoading() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Video Player */}
      <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
        <div className="w-16 h-16 bg-muted-foreground/20 rounded-full flex items-center justify-center">
          <div className="w-0 h-0 border-l-[8px] border-l-muted-foreground/40 border-y-[6px] border-y-transparent ml-1" />
        </div>
      </div>
      
      {/* Lesson Info */}
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-4/5" />
        </div>
      </div>
      
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-4 bg-muted rounded w-16" />
          <div className="h-4 bg-muted rounded w-12" />
        </div>
        <div className="h-2 bg-muted rounded w-full" />
      </div>
    </div>
  )
}

// Profile Loading
export function ProfileLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 bg-muted rounded-full" />
        <div className="space-y-2">
          <div className="h-6 bg-muted rounded w-32" />
          <div className="h-4 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="h-5 bg-muted rounded w-32" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-5/6" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-5 bg-muted rounded w-28" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}