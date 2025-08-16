"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { OverlayLoading } from "@/components/ui/loading"

interface LoadingContextType {
  isLoading: boolean
  loadingText: string
  showLoading: (text?: string) => void
  hideLoading: () => void
  withLoading: <T>(promise: Promise<T>, text?: string) => Promise<T>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState("Loading...")

  const showLoading = useCallback((text = "Loading...") => {
    setLoadingText(text)
    setIsLoading(true)
  }, [])

  const hideLoading = useCallback(() => {
    setIsLoading(false)
  }, [])

  const withLoading = useCallback(async <T,>(
    promise: Promise<T>, 
    text = "Loading..."
  ): Promise<T> => {
    showLoading(text)
    try {
      const result = await promise
      return result
    } finally {
      hideLoading()
    }
  }, [showLoading, hideLoading])

  const value = {
    isLoading,
    loadingText,
    showLoading,
    hideLoading,
    withLoading
  }

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {isLoading && <OverlayLoading text={loadingText} />}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}