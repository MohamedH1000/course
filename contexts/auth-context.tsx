"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { type User, type AuthResponse, type LoginCredentials, type RegisterCredentials, authAPI } from "@/lib/auth"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Check for existing session on mount
    const initializeAuth = async () => {
      try {
        setIsHydrated(true)
        const token = localStorage.getItem("auth-token")
        if (token) {
          const currentUser = await authAPI.getCurrentUser(token)
          if (currentUser) {
            setUser(currentUser)
          } else {
            localStorage.removeItem("auth-token")
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error)
        localStorage.removeItem("auth-token")
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: AuthResponse = await authAPI.login(credentials)
      setUser(response.user)
      localStorage.setItem("auth-token", response.token)
    } catch (error) {
      throw error
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response: AuthResponse = await authAPI.register(credentials)
      setUser(response.user)
      localStorage.setItem("auth-token", response.token)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await authAPI.logout()
      setUser(null)
      localStorage.removeItem("auth-token")
    } catch (error) {
      console.error("Logout error:", error)
      // Still clear local state even if API call fails
      setUser(null)
      localStorage.removeItem("auth-token")
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
