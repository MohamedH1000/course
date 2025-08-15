import React from 'react'

const Stats = () => {
  return (
    <section className="py-16 px-4 bg-card/30">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div className="animate-fade-in">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
          <div className="text-muted-foreground">Students</div>
        </div>
        <div className="animate-fade-in">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
          <div className="text-muted-foreground">Courses</div>
        </div>
        <div className="animate-fade-in">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
          <div className="text-muted-foreground">Instructors</div>
        </div>
        <div className="animate-fade-in">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">95%</div>
          <div className="text-muted-foreground">Success Rate</div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Stats