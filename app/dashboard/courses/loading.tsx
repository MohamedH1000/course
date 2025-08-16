import { CourseGridLoading } from "@/components/loading/course-loading"

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 animate-pulse">
        <div className="h-8 bg-muted rounded w-48" />
        <div className="h-4 bg-muted rounded w-80" />
      </div>

      {/* Filters */}
      <div className="bg-card border rounded-lg p-6 animate-pulse">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-1 gap-4 w-full md:w-auto">
            <div className="h-10 bg-muted rounded flex-1 max-w-md" />
            <div className="h-10 bg-muted rounded w-40" />
            <div className="h-10 bg-muted rounded w-40" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-muted rounded" />
            <div className="h-10 w-10 bg-muted rounded" />
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <CourseGridLoading count={6} />
    </div>
  )
}