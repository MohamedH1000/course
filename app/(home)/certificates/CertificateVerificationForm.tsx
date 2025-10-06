'use client'

import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

interface CertificateData {
  id: string
  studentName: string
  courseName: string
  issueDate: string
  certificateCode: string
}

const CertificateVerificationForm = () => {
  const { t, isRTL } = useLanguage()
  const [certificateCode, setCertificateCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [certificateData, setCertificateData] = useState<CertificateData | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setCertificateData(null)
    
    // Simulate API call to verify certificate
    setTimeout(() => {
      // Mock verification logic
      if (certificateCode.trim() === 'EJC-2025-001') {
        setCertificateData({
          id: '1',
          studentName: 'Ahmed Mohamed',
          courseName: 'Advanced Web Development',
          issueDate: '2025-05-15',
          certificateCode: certificateCode.trim()
        })
      } else if (certificateCode.trim() === 'EJC-2025-002') {
        setCertificateData({
          id: '2',
          studentName: 'Fatima Ali',
          courseName: 'Digital Marketing Mastery',
          issueDate: '2025-06-20',
          certificateCode: certificateCode.trim()
        })
      } else {
        setError(t("certificates.not.found"))
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("certificates.title")}</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {t("certificates.description")}
        </p>
      </div>

      {!certificateData ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="certificateCode" className="text-lg font-medium text-foreground">
                  {t("certificates.input.placeholder")}
                </label>
                <input
                  id="certificateCode"
                  type="text"
                  value={certificateCode}
                  onChange={(e) => setCertificateCode(e.target.value)}
                  placeholder={t("certificates.input.placeholder")}
                  className="w-full px-6 py-4 text-lg bg-background/80 border-2 border-border/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all duration-300"
                  dir={isRTL ? "rtl" : "ltr"}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2"></span>
                    {t("common.loading")}
                  </span>
                ) : (
                  t("certificates.submit.button")
                )}
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 text-destructive text-center animate-fade-in">
              {error}
            </div>
          )}
        </form>
      ) : (
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-lg animate-fade-in">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("certificates.verification.success")}</h2>
            <p className="text-muted-foreground">{t("certificates.details.title")}</p>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-background/30 rounded-xl p-6 border border-border/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("certificates.details.name")}</h3>
                <p className="text-lg font-semibold text-foreground">{certificateData.studentName}</p>
              </div>
              
              <div className="bg-background/30 rounded-xl p-6 border border-border/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("certificates.details.course")}</h3>
                <p className="text-lg font-semibold text-foreground">{certificateData.courseName}</p>
              </div>
              
              <div className="bg-background/30 rounded-xl p-6 border border-border/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("certificates.details.date")}</h3>
                <p className="text-lg font-semibold text-foreground">{certificateData.issueDate}</p>
              </div>
              
              <div className="bg-background/30 rounded-xl p-6 border border-border/30">
                <h3 className="text-sm font-medium text-muted-foreground mb-1">{t("certificates.details.code")}</h3>
                <p className="text-lg font-semibold text-foreground font-mono">{certificateData.certificateCode}</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="flex-1 py-6 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  // Simulate download
                  alert(t("certificates.download") + " - " + certificateData.certificateCode)
                }}
              >
                {t("certificates.download")}
              </Button>
              
              <Button 
                variant="outline"
                className="flex-1 py-6 text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
                onClick={() => {
                  setCertificateData(null)
                  setCertificateCode('')
                }}
              >
                {t("nav.certificates")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CertificateVerificationForm