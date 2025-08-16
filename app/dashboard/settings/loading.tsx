import { ProfileLoading } from "@/components/loading/course-loading"

export default function Loading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2 animate-pulse">
        <div className="h-8 bg-muted rounded w-32" />
        <div className="h-4 bg-muted rounded w-64" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-card border rounded-lg animate-pulse">
            <div className="p-6">
              <div className="h-5 bg-muted rounded w-20 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg">
                    <div className="w-4 h-4 bg-muted rounded" />
                    <div className="h-4 bg-muted rounded flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2">
          <ProfileLoading />
        </div>
      </div>
    </div>
  )
}