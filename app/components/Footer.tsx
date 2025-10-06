'use client'
import { useLanguage } from '@/components/language-provider'
import React from 'react'

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-card/80 backdrop-blur-sm border-t border-border/50 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
    <div className="container mx-auto text-center">
      <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
        <img src={'/assets/Logo.jpg'} alt='logo' className='h-12 md:h-[60px] mb-4' />
        <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-2">{t("ejc.title")}</h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-2xl">
          {t("ejc.founding")}
        </p>
      </div>
      <div className="border-t border-border/30 pt-6 mt-6">
        <p className="text-sm md:text-base text-muted-foreground">{t("copyright")}</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer