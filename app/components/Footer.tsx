'use client'
import { useLanguage } from '@/components/language-provider'
import { BookOpen } from 'lucide-react'
import React from 'react'

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-card border-t py-12 px-4">
    <div className="container mx-auto text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        {/* <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-primary-foreground" />
        </div> */}
        <img src={'/assets/Logo.jpg'} alt='logo' className='h-[50px]' />
        <span className="text-xl font-serif font-bold text-foreground">{t("name")}</span>
      </div>
      <p className="text-muted-foreground">{t("copyright")}</p>
    </div>
  </footer>
  )
}

export default Footer