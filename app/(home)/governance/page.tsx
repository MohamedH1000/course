'use client'
import { useLanguage } from '@/components/language-provider'
import React from 'react'

const GovernancePage = () => {
  const { t } = useLanguage()
  
  const studentCommitments = [
    t("governance.studentCommitment.1"),
    t("governance.studentCommitment.2"),
    t("governance.studentCommitment.3"),
    t("governance.studentCommitment.4")
  ]
  
  const attendancePolicies = [
    t("governance.attendancePolicy.1"),
    t("governance.attendancePolicy.2"),
    t("governance.attendancePolicy.3")
  ]
  
  const instructorCommitments = [
    t("governance.instructorCommitment.1"),
    t("governance.instructorCommitment.2"),
    t("governance.instructorCommitment.3"),
    t("governance.instructorCommitment.4"),
    t("governance.instructorCommitment.5")
  ]

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t("governance.title")}</h1>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
          </div>

          {/* Student Commitment Section */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg mb-12 animate-scale-in">
            <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-border/30">
              {t("governance.studentCommitment")}
            </h2>
            <ul className="space-y-6">
              {studentCommitments.map((commitment, index) => (
                <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{commitment}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Attendance Policy Section */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg mb-12 animate-scale-in delay-150">
            <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-border/30">
              {t("governance.attendancePolicy")}
            </h2>
            <ul className="space-y-6">
              {attendancePolicies.map((policy, index) => (
                <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-accent font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{policy}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructor Commitment Section */}
          <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border/50 shadow-lg animate-scale-in delay-300">
            <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-border/30">
              {t("governance.instructorCommitment")}
            </h2>
            <ul className="space-y-6">
              {instructorCommitments.map((commitment, index) => (
                <li key={index} className="flex items-start animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-primary font-bold">{index + 1}</span>
                  </div>
                  <p className="text-foreground/90 leading-relaxed">{commitment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GovernancePage