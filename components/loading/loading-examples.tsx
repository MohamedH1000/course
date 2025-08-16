"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Loading, 
  PageLoading, 
  OverlayLoading, 
  MinimalLoading, 
  DotsLoading, 
  PulseLoading,
  SkeletonLine,
  SkeletonCard,
  SkeletonAvatar
} from "@/components/ui/loading"
import { 
  CourseCardLoading, 
  CourseGridLoading, 
  CourseListLoading,
  DashboardStatsLoading,
  LessonLoading,
  ProfileLoading
} from "@/components/loading/course-loading"
import { useLoading } from "@/contexts/loading-context"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

export function LoadingExamples() {
  const { showLoading, hideLoading, withLoading } = useLoading()
  const { isRTL } = useLanguage()
  const [showOverlay, setShowOverlay] = useState(false)
  const [showPageLoading, setShowPageLoading] = useState(false)

  const simulateAsyncOperation = async (duration = 2000) => {
    return new Promise(resolve => setTimeout(resolve, duration))
  }

  const handleWithLoading = async () => {
    await withLoading(
      simulateAsyncOperation(3000),
      "Processing your request..."
    )
    alert("Operation completed!")
  }

  const handleManualLoading = async () => {
    showLoading("Custom loading message...")
    await simulateAsyncOperation(2000)
    hideLoading()
    alert("Manual loading completed!")
  }

  if (showPageLoading) {
    return <PageLoading text="Loading amazing content..." />
  }

  return (
    <div className={cn("space-y-8 p-6", isRTL ? "rtl" : "ltr")}>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Loading Components Showcase</h1>
        <p className="text-muted-foreground">
          Beautiful loading states for your course platform
        </p>
      </div>

      {/* Basic Loading Variants */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Loading Variants</CardTitle>
          <CardDescription>Different styles of loading indicators</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Default Spinner</h4>
              <Loading variant="default" text="Loading..." />
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Minimal Spinner</h4>
              <MinimalLoading size="lg" />
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Dots Animation</h4>
              <DotsLoading size="md" text="Please wait..." />
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Pulse Animation</h4>
              <PulseLoading size="md" text="Loading content..." />
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Different Sizes</h4>
              <div className="flex items-center gap-4">
                <MinimalLoading size="sm" />
                <MinimalLoading size="md" />
                <MinimalLoading size="lg" />
                <MinimalLoading size="xl" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Loading Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Loading Examples</CardTitle>
          <CardDescription>Test different loading scenarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => setShowPageLoading(true)}>
              Show Page Loading
            </Button>
            
            <Button onClick={() => setShowOverlay(true)}>
              Show Overlay Loading
            </Button>
            
            <Button onClick={handleWithLoading}>
              With Loading Hook
            </Button>
            
            <Button onClick={handleManualLoading}>
              Manual Loading Control
            </Button>
          </div>
          
          {showPageLoading && (
            <Button 
              variant="outline" 
              onClick={() => setShowPageLoading(false)}
            >
              Hide Page Loading
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Skeleton Loading Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Loading States</CardTitle>
          <CardDescription>Placeholder content while loading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Basic Skeletons</h4>
              <div className="space-y-2">
                <SkeletonLine className="h-4" />
                <SkeletonLine className="h-4 w-3/4" />
                <SkeletonLine className="h-4 w-1/2" />
              </div>
              <div className="flex items-center gap-3">
                <SkeletonAvatar size="md" />
                <div className="space-y-1 flex-1">
                  <SkeletonLine className="h-3 w-24" />
                  <SkeletonLine className="h-3 w-32" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Card Skeleton</h4>
              <SkeletonCard />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course-Specific Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Course-Specific Loading States</CardTitle>
          <CardDescription>Loading states designed for course content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h4 className="font-medium">Dashboard Stats Loading</h4>
            <DashboardStatsLoading />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Course Card Loading</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CourseCardLoading />
              <CourseCardLoading />
              <CourseCardLoading />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Course List Loading</h4>
            <CourseListLoading count={2} />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Lesson Loading</h4>
            <LessonLoading />
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium">Profile Loading</h4>
            <ProfileLoading />
          </div>
        </CardContent>
      </Card>

      {/* Overlay Loading */}
      {showOverlay && (
        <OverlayLoading text="Processing your request..." />
      )}
      
      {showOverlay && (
        <div className="fixed bottom-4 right-4 z-[60]">
          <Button onClick={() => setShowOverlay(false)}>
            Hide Overlay
          </Button>
        </div>
      )}
    </div>
  )
}