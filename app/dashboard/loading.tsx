import { DashboardStatsLoading } from "@/components/loading/course-loading"

export default function Loading() {
  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <div className="h-8 bg-muted rounded w-64 animate-pulse" />
        <div className="h-4 bg-muted rounded w-96 animate-pulse" />
      </div>
      <DashboardStatsLoading />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-6 bg-muted rounded w-48 animate-pulse" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                  <div className="w-16 h-12 bg-muted rounded-md" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                  <div className="h-8 bg-muted rounded w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="animate-pulse">
            <div className="bg-card border rounded-lg p-6 space-y-4">
              <div className="h-5 bg-muted rounded w-32" />
              <div className="space-y-3">
                <div className="h-8 bg-muted rounded" />
                <div className="h-8 bg-muted rounded" />
                <div className="h-8 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}