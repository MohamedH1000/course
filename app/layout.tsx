import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Providers } from "@/components/providers"
import "./globals.css"
import Header from "./components/Header"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "EduPlatform - Online Learning Excellence",
  description: "Premium online course platform with multilingual support",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
