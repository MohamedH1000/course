"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/components/language-provider"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, loginWithGoogle } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await login({ email, password })
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-accent/5 p-4">
      <div className="w-full max-w-md">
     

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">{t("auth.signin.title")}</CardTitle>
            <CardDescription className="text-center">
              {t("auth.signin.subtitle")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.signin.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.signin.email.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.signin.password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.signin.password.placeholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {t("auth.signin.forgot")}
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 transition-all duration-200"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("auth.signin.signing")}
                  </>
                ) : (
                  t("auth.signin.button")
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full mt-4"
                onClick={async () => {
                  try {
                    setLoading(true)
                    await loginWithGoogle()
                    router.push("/dashboard")
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "Google sign-in failed")
                  } finally {
                    setLoading(false)
                  }
                }}
                disabled={loading}
              >
                <FcGoogle className="mr-2 h-4 w-4" />
                Sign in with Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("auth.signin.no_account")}{" "}
                <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
                  {t("auth.signin.signup_link")}
                </Link>
              </p>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2">{t("auth.signin.demo")}</p>
              <div className="text-xs space-y-1">
                <div>{t("auth.signin.admin")}</div>
                <div>{t("auth.signin.instructor")}</div>
                <div>{t("auth.signin.student")}</div>
                <div className="font-medium">{t("auth.signin.demo_password")}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
