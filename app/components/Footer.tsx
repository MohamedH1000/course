import { BookOpen } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-card border-t py-12 px-4">
    <div className="container mx-auto text-center">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-serif font-bold text-foreground">EduPlatform</span>
      </div>
      <p className="text-muted-foreground">© 2024 EduPlatform. All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer