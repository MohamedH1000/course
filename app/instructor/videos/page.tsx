"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { VideoUpload } from "@/components/video-upload"
import type { CloudinaryVideo } from "@/lib/cloudinary"
import { cloudinaryUploader } from "@/lib/cloudinary"
import { Search, Play, Trash2, Edit, Eye } from "lucide-react"

interface VideoWithMetadata extends CloudinaryVideo {
  title: string
  description: string
  uploadedAt: string
  status: "processing" | "ready" | "error"
}

export default function InstructorVideosPage() {
  const [videos, setVideos] = useState<VideoWithMetadata[]>([
    {
      public_id: "sample-video-1",
      secure_url: "https://res.cloudinary.com/demo/video/upload/sample.mp4",
      duration: 180,
      format: "mp4",
      resource_type: "video",
      bytes: 15728640,
      created_at: "2024-01-15T10:30:00Z",
      width: 1920,
      height: 1080,
      title: "Introduction to React Hooks",
      description: "Learn the basics of React Hooks including useState and useEffect",
      uploadedAt: "2024-01-15T10:30:00Z",
      status: "ready",
    },
    {
      public_id: "sample-video-2",
      secure_url: "https://res.cloudinary.com/demo/video/upload/sample2.mp4",
      duration: 240,
      format: "mp4",
      resource_type: "video",
      bytes: 20971520,
      created_at: "2024-01-14T15:45:00Z",
      width: 1920,
      height: 1080,
      title: "Advanced State Management",
      description: "Deep dive into Redux and Context API for state management",
      uploadedAt: "2024-01-14T15:45:00Z",
      status: "ready",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [showUpload, setShowUpload] = useState(false)

  const handleUploadComplete = (uploadedVideo: CloudinaryVideo & { title: string; description: string }) => {
    const newVideo: VideoWithMetadata = {
      ...uploadedVideo,
      uploadedAt: new Date().toISOString(),
      status: "ready",
    }
    setVideos((prev) => [newVideo, ...prev])
    setShowUpload(false)
  }

  const handleDeleteVideo = (publicId: string) => {
    setVideos((prev) => prev.filter((video) => video.public_id !== publicId))
  }

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (showUpload) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Upload New Video</h1>
            <Button variant="outline" onClick={() => setShowUpload(false)}>
              Back to Videos
            </Button>
          </div>

          <VideoUpload
            onUploadComplete={handleUploadComplete}
            onUploadError={(error) => console.error("Upload error:", error)}
            maxSizeGB={5}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Videos</h1>
          <p className="text-muted-foreground">Manage your course videos and upload new content</p>
        </div>
        <Button onClick={() => setShowUpload(true)}>Upload Video</Button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredVideos.map((video) => (
          <Card key={video.public_id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <div className="relative w-48 h-28 bg-black rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={cloudinaryUploader.getThumbnailUrl(video.public_id) || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold truncate">{video.title}</h3>
                    <Badge variant={video.status === "ready" ? "default" : "secondary"}>{video.status}</Badge>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{video.description}</p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>
                      {video.width} × {video.height}
                    </span>
                    <span>{formatFileSize(video.bytes)}</span>
                    <span>Uploaded {formatDate(video.uploadedAt)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteVideo(video.public_id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredVideos.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No videos found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Try adjusting your search terms" : "Upload your first video to get started"}
              </p>
              {!searchTerm && <Button onClick={() => setShowUpload(true)}>Upload Video</Button>}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
