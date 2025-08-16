"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/components/language-provider"
import {
  BookOpen,
  Home,
  User,
  LogOut,
  Menu,
  GraduationCap,
  BarChart3,
  Settings,
  Bell,
  MessageSquare,
  Calendar,
  Library,
  Heart,
  Award,
  Users,
  PlusCircle,
  Search
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()
  const { t, isRTL } = useLanguage()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isInstructor = user?.role === 'instructor'

  const navigationItems = [
    {
      title: t("dashboard.overview"),
      href: "/dashboard",
      icon: Home,
      exact: true
    },
    {
      title: t("dashboard.my_courses"),
      href: "/dashboard/courses",
      icon: BookOpen
    },
    ...(isInstructor ? [
      {
        title: t("dashboard.create_course"),
        href: "/dashboard/create-course",
        icon: PlusCircle
      },
      {
        title: t("dashboard.students"),
        href: "/dashboard/students",
        icon: Users
      },
      {
        title: t("dashboard.analytics"),
        href: "/dashboard/analytics",
        icon: BarChart3
      },
      {
        title: t("dashboard.earnings"),
        href: "/dashboard/earnings",
        icon: Award
      }
    ] : [
      {
        title: t("dashboard.progress"),
        href: "/dashboard/progress",
        icon: BarChart3
      },
      {
        title: t("dashboard.certificates"),
        href: "/dashboard/certificates",
        icon: Award
      },
      {
        title: t("dashboard.favorites"),
        href: "/dashboard/favorites",
        icon: Heart
      }
    ]),
    {
      title: t("dashboard.library"),
      href: "/dashboard/library",
      icon: Library
    },
    {
      title: t("dashboard.messages"),
      href: "/dashboard/messages",
      icon: MessageSquare
    },
    {
      title: t("dashboard.calendar"),
      href: "/dashboard/calendar",
      icon: Calendar
    }
  ]

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn(
      "flex flex-col h-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      mobile ? "border-0" : cn(
        "border-r border-border/40",
        isRTL ? "border-l border-r-0" : "border-r"
      )
    )}>
      {/* Logo */}
      <div className={cn(
        "flex items-center gap-3 px-6 py-4 border-b border-border/40",
        isRTL ? "flex-row-reverse" : ""
      )}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <GraduationCap className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">EduPlatform</span>
          <span className="text-xs text-muted-foreground">Learning Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href, item.exact)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setSidebarOpen(false)}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200",
                isRTL ? "flex-row-reverse" : "",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <Icon className={cn(
                "h-4 w-4 transition-colors",
                active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
              )} />
              <span className="truncate">{item.title}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="px-4 py-4 border-t border-border/40">
        <Link
          href="/dashboard/settings"
          onClick={() => mobile && setSidebarOpen(false)}
          className={cn(
            "group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent/50",
            isRTL ? "flex-row-reverse" : ""
          )}
        >
          <Settings className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="truncate">{t("dashboard.settings")}</span>
        </Link>
      </div>
    </div>
  )

  return (
    <div className={cn("min-h-screen bg-background", isRTL ? "rtl" : "ltr")}>
      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col",
        isRTL ? "lg:right-0" : "lg:left-0"
      )}>
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent
          side={isRTL ? "right" : "left"}
          className="p-0 w-72"
        >
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className={cn(
        isRTL ? "lg:pr-72" : "lg:pl-72"
      )}>
        {/* Top Navigation */}
        <header className={cn(
          "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8",
          isRTL ? "flex-row-reverse" : ""
        )}>
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">{t("nav.menu")}</span>
          </Button>

          {/* Search */}
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 max-w-md">
              <Search className={cn(
                "pointer-events-none absolute inset-y-0 h-full w-5 text-muted-foreground",
                isRTL ? "right-0 pr-3" : "left-0 pl-3"
              )} />
              <input
                className={cn(
                  "block h-full w-full border-0 bg-transparent py-0 text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm",
                  isRTL ? "pr-10 pl-0" : "pl-10 pr-0"
                )}
                placeholder={t("dashboard.search_placeholder")}
                type="search"
                name="search"
              />
            </div>
          </div>

          {/* Right side */}
          <div className={cn(
            "flex items-center gap-4",
            isRTL ? "flex-row-reverse" : ""
          )}>
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Language Toggle */}
            <LanguageToggle />

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                3
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align={isRTL ? "start" : "end"} forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile" className={cn(
                    "flex items-center gap-2",
                    isRTL ? "flex-row-reverse" : ""
                  )}>
                    <User className="h-4 w-4" />
                    {t("dashboard.profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className={cn(
                    "flex items-center gap-2",
                    isRTL ? "flex-row-reverse" : ""
                  )}>
                    <Settings className="h-4 w-4" />
                    {t("dashboard.settings")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className={cn(
                    "flex items-center gap-2 text-red-600 focus:text-red-600",
                    isRTL ? "flex-row-reverse" : ""
                  )}
                >
                  <LogOut className="h-4 w-4" />
                  {t("dashboard.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
