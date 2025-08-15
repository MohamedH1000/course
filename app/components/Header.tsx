'use client'
import { useLanguage } from '@/components/language-provider'
import { LanguageToggle } from '@/components/language-toggle'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/auth-context'
import { BookOpen, Menu, X, Home, GraduationCap, CreditCard, Info, User, LogOut, LogIn, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const Header = () => {
    const { t } = useLanguage()
    const { user, logout } = useAuth()
    const pathname = usePathname()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleAuthAction = () => {
        if (user) {
            logout()
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <header className={`
                border-b backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 ease-in-out
                ${isScrolled
                    ? 'bg-background/98 shadow-xl border-border/60'
                    : 'bg-background/85 border-border/40'
                }
            `}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 sm:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary/90 to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                    <BookOpen className="h-5 w-5 text-primary-foreground transition-transform duration-300 group-hover:rotate-12" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <span className="text-xl sm:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                EduPlatform
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <Link href="/" className={`relative transition-all duration-300 group py-2 ${
                                pathname === '/' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                            }`}>
                                {t("nav.home")}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                                    pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </Link>
                            <Link href="/courses" className={`relative transition-all duration-300 group py-2 ${
                                pathname.startsWith('/courses') ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                            }`}>
                                {t("nav.courses")}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                                    pathname.startsWith('/courses') ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </Link>
                            <Link href="/pricing" className={`relative transition-all duration-300 group py-2 ${
                                pathname === '/pricing' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                            }`}>
                                {t("nav.pricing")}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                                    pathname === '/pricing' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </Link>
                            <Link href="/about" className={`relative transition-all duration-300 group py-2 ${
                                pathname === '/about' ? 'text-primary font-medium' : 'text-foreground hover:text-primary'
                            }`}>
                                {t("nav.about")}
                                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                                    pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'
                                }`} />
                            </Link>
                        </nav>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <div className="flex items-center space-x-2 mr-4">
                                <ThemeToggle />
                                <LanguageToggle />
                            </div>
                            {user ? (
                                <>
                                    <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300" asChild>
                                        <Link href="/dashboard">{t("nav.dashboard")}</Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleAuthAction}
                                        className="border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        {t("nav.logout")}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300" asChild>
                                        <Link href="/auth/signin">{t("nav.signin")}</Link>
                                    </Button>
                                    <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" asChild>
                                        <Link href="/auth/signup">{t("nav.signup")}</Link>
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex lg:hidden items-center space-x-2">
                            <div className="flex items-center space-x-1">
                                <ThemeToggle />
                                <LanguageToggle />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMobileMenu}
                                className="p-2 hover:bg-primary/10 transition-all duration-300"
                                aria-label="Toggle menu"
                            >
                                <div className="relative w-6 h-6">
                                    <Menu className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                                    <X className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
                                </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Sheet */}
            <div className={`
                lg:hidden fixed inset-0 z-40 transition-all duration-500 ease-out
                ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            `}>
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-black/60 backdrop-blur-md transition-all duration-500 ${
                        isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={closeMobileMenu}
                />
                
                {/* Sheet */}
                <div className={`
                    absolute bottom-0 left-0 right-0 bg-background/98 backdrop-blur-xl 
                    rounded-t-3xl border-t border-l border-r border-border/50 shadow-2xl
                    transform transition-all duration-500 ease-out
                    ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}
                `}>
                    {/* Sheet Handle */}
                    <div className="flex justify-center pt-4 pb-2">
                        <div className="w-12 h-1.5 bg-border/60 rounded-full" />
                    </div>

                    <div className="px-6 pb-8 pt-4">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-semibold text-foreground mb-2">Navigation</h3>
                            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                        </div>

                        {/* Navigation Grid */}
                        <nav className="grid grid-cols-2 gap-4 mb-8">
                            <Link
                                href="/"
                                onClick={closeMobileMenu}
                                className={`group flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                                    pathname === '/' 
                                        ? 'bg-primary/10 border-2 border-primary/20 shadow-lg' 
                                        : 'bg-card/50 border-2 border-transparent hover:border-primary/20 hover:bg-primary/5'
                                }`}
                            >
                                <div className={`p-3 rounded-xl mb-3 transition-all duration-300 ${
                                    pathname === '/' 
                                        ? 'bg-primary text-primary-foreground shadow-lg' 
                                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110'
                                }`}>
                                    <Home className="w-6 h-6" />
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${
                                    pathname === '/' ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                }`}>
                                    {t("nav.home")}
                                </span>
                            </Link>

                            <Link
                                href="/courses"
                                onClick={closeMobileMenu}
                                className={`group flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                                    pathname.startsWith('/courses') 
                                        ? 'bg-primary/10 border-2 border-primary/20 shadow-lg' 
                                        : 'bg-card/50 border-2 border-transparent hover:border-primary/20 hover:bg-primary/5'
                                }`}
                            >
                                <div className={`p-3 rounded-xl mb-3 transition-all duration-300 ${
                                    pathname.startsWith('/courses') 
                                        ? 'bg-primary text-primary-foreground shadow-lg' 
                                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110'
                                }`}>
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${
                                    pathname.startsWith('/courses') ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                }`}>
                                    {t("nav.courses")}
                                </span>
                            </Link>

                            <Link
                                href="/pricing"
                                onClick={closeMobileMenu}
                                className={`group flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                                    pathname === '/pricing' 
                                        ? 'bg-primary/10 border-2 border-primary/20 shadow-lg' 
                                        : 'bg-card/50 border-2 border-transparent hover:border-primary/20 hover:bg-primary/5'
                                }`}
                            >
                                <div className={`p-3 rounded-xl mb-3 transition-all duration-300 ${
                                    pathname === '/pricing' 
                                        ? 'bg-primary text-primary-foreground shadow-lg' 
                                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110'
                                }`}>
                                    <CreditCard className="w-6 h-6" />
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${
                                    pathname === '/pricing' ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                }`}>
                                    {t("nav.pricing")}
                                </span>
                            </Link>

                            <Link
                                href="/about"
                                onClick={closeMobileMenu}
                                className={`group flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                                    pathname === '/about' 
                                        ? 'bg-primary/10 border-2 border-primary/20 shadow-lg' 
                                        : 'bg-card/50 border-2 border-transparent hover:border-primary/20 hover:bg-primary/5'
                                }`}
                            >
                                <div className={`p-3 rounded-xl mb-3 transition-all duration-300 ${
                                    pathname === '/about' 
                                        ? 'bg-primary text-primary-foreground shadow-lg' 
                                        : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110'
                                }`}>
                                    <Info className="w-6 h-6" />
                                </div>
                                <span className={`text-sm font-medium transition-colors duration-300 ${
                                    pathname === '/about' ? 'text-primary' : 'text-foreground group-hover:text-primary'
                                }`}>
                                    {t("nav.about")}
                                </span>
                            </Link>
                        </nav>

                        {/* Auth Actions */}
                        <div className="space-y-3 pt-4 border-t border-border/30">
                            {user ? (
                                <>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start h-12 text-base hover:bg-primary/10 transition-all duration-300"
                                        asChild
                                    >
                                        <Link href="/dashboard" onClick={closeMobileMenu}>
                                            <User className="w-5 h-5 mr-3" />
                                            {t("nav.dashboard")}
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            handleAuthAction()
                                            closeMobileMenu()
                                        }}
                                        className="w-full justify-start h-12 text-base border-primary/20 hover:border-primary hover:bg-primary/5 transition-all duration-300"
                                    >
                                        <LogOut className="w-5 h-5 mr-3" />
                                        {t("nav.logout")}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start h-12 text-base hover:bg-primary/10 transition-all duration-300"
                                        asChild
                                    >
                                        <Link href="/auth/signin" onClick={closeMobileMenu}>
                                            <LogIn className="w-5 h-5 mr-3" />
                                            {t("nav.signin")}
                                        </Link>
                                    </Button>
                                    <Button
                                        className="w-full justify-start h-12 text-base bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300"
                                        asChild
                                    >
                                        <Link href="/auth/signup" onClick={closeMobileMenu}>
                                            <UserPlus className="w-5 h-5 mr-3" />
                                            {t("nav.signup")}
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header