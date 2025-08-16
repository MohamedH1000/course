"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { LoadingProvider } from "@/contexts/loading-context"

interface ProvidersProps {
    children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange={false}
        >
            <LanguageProvider>
                <SessionProvider>
                    <AuthProvider>
                        <LoadingProvider>
                            {children}
                        </LoadingProvider>
                    </AuthProvider>
                </SessionProvider>
            </LanguageProvider>
        </ThemeProvider>
    )
}