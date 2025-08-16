import { LessonLoading } from "@/components/loading/course-loading"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <LessonLoading />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 animate-pulse">
              {/* Course Info */}
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <div className="h-6 bg-muted rounded w-3/4" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-2/3" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-3 bg-muted rounded w-16" />
                    <div className="h-3 bg-muted rounded w-8" />
                  </div>
                  <div className="h-2 bg-muted rounded w-full" />
                </div>
              </div>
              
              {/* Lesson List */}
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <div className="h-5 bg-muted rounded w-24" />
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded">
                      <div className="w-4 h-4 bg-muted rounded" />
                      <div className="flex-1">
                        <div className="h-3 bg-muted rounded w-full mb-1" />
                        <div className="h-2 bg-muted rounded w-12" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}