"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, X, Play, CheckCircle, AlertCircle } from "lucide-react"
import { cloudinaryUploader, type CloudinaryVideo, type UploadProgress } from "@/lib/cloudinary"

interface VideoUploadProps {
  onUploadComplete?: (video: CloudinaryVideo & { title: string; description: string }) => void
  onUploadError?: (error: string) => void
  maxSizeGB?: number
}

export function VideoUpload({ onUploadComplete, onUploadError, maxSizeGB = 2 }: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [videoTitle, setVideoTitle] = useState("")
  const [videoDescription, setVideoDescription] = useState("")
  const [uploadedVideo, setUploadedVideo] = useState<CloudinaryVideo | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("video/")) {
      setError("Please select a valid video file")
      return
    }

    // Validate file size
    const maxSizeBytes = maxSizeGB * 1024 * 1024 * 1024
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSizeGB}GB`)
      return
    }

    setSelectedFile(file)
    setError(null)
  }

  const handleUpload = async () => {
    if (!selectedFile || !videoTitle.trim()) {
      setError("Please select a file and enter a title")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const video = await cloudinaryUploader.uploadVideo(selectedFile, (progress) => {
        setUploadProgress(progress)
      })

      setUploadedVideo(video)

      if (onUploadComplete) {
        onUploadComplete({
          ...video,
          title: videoTitle,
          description: videoDescription,
        })
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed"
      setError(errorMessage)
      if (onUploadError) {
        onUploadError(errorMessage)
      }
    } finally {
      setIsUploading(false)
      setUploadProgress(null)
    }
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setVideoTitle("")
    setVideoDescription("")
    setUploadedVideo(null)
    setError(null)
    setUploadProgress(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

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

  if (uploadedVideo) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Upload Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={cloudinaryUploader.getOptimizedVideoUrl(uploadedVideo.public_id)}
              poster={cloudinaryUploader.getThumbnailUrl(uploadedVideo.public_id)}
              controls
              className="w-full h-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Duration</Label>
              <p>{formatDuration(uploadedVideo.duration)}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Size</Label>
              <p>{formatFileSize(uploadedVideo.bytes)}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Resolution</Label>
              <p>
                {uploadedVideo.width} × {uploadedVideo.height}
              </p>
            </div>
            <div>
              <Label className="text-muted-foreground">Format</Label>
              <p>{uploadedVideo.format.toUpperCase()}</p>
            </div>
          </div>

          <Button onClick={resetUpload} variant="outline" className="w-full bg-transparent">
            Upload Another Video
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Video</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedFile ? (
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium mb-2">Click to upload video</p>
            <p className="text-sm text-muted-foreground">Supports MP4, MOV, AVI up to {maxSizeGB}GB</p>
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <Play className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setSelectedFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="video-title">Video Title *</Label>
                <Input
                  id="video-title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  placeholder="Enter video title"
                />
              </div>

              <div>
                <Label htmlFor="video-description">Description</Label>
                <Textarea
                  id="video-description"
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  placeholder="Enter video description (optional)"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {isUploading && uploadProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading...</span>
              <span>{uploadProgress.percentage}%</span>
            </div>
            <Progress value={uploadProgress.percentage} />
          </div>
        )}

        {selectedFile && !isUploading && (
          <Button onClick={handleUpload} disabled={!videoTitle.trim()} className="w-full">
            Upload Video
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
