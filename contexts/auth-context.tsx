"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

interface User {
  id: string
  email: string
  name: string
  role: string
  avatar?: string
}

interface RegisterCredentials {
  name: string
  email: string
  password: string
  role?: "student" | "instructor"
}

interface LoginCredentials {
  email: string
  password: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  loginWithGoogle: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  const user = session?.user ? {
    id: session.user.id as string,
    email: session.user.email!,
    name: session.user.name!,
    role: (session.user as any).role || 'student',
    avatar: session.user.image || undefined
  } : null

  const loading = status === "loading"

  const login = async (credentials: LoginCredentials) => {
    const result = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false
    })

    if (result?.error) {
      throw new Error(result.error)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Registration failed")
    }

    // After successful registration, sign in the user
    await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false
    })
  }

  const logout = async () => {
    await signOut({ redirect: false })
  }

  const loginWithGoogle = async () => {
    const result = await signIn("google", { redirect: false })
    if (result?.error) {
      throw new Error(result.error)
    }
    return true
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
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
