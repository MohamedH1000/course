"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from "lucide-react"
import { cloudinaryUploader } from "@/lib/cloudinary"

interface VideoPlayerProps {
  src: string
  title: string
  publicId?: string // Added Cloudinary public_id for optimized playback
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export function VideoPlayer({ src, title, publicId, onProgress, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [quality, setQuality] = useState<"auto" | "auto:low" | "auto:good" | "auto:best">("auto") // Added quality control

  const getVideoUrl = () => {
    if (publicId) {
      return cloudinaryUploader.getOptimizedVideoUrl(publicId, { quality })
    }
    return src
  }

  const getThumbnailUrl = () => {
    if (publicId) {
      return cloudinaryUploader.getThumbnailUrl(publicId)
    }
    return "/video-thumbnail.png"
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime
      setCurrentTime(current)

      if (onProgress && duration > 0) {
        onProgress((current / duration) * 100)
      }

      // Check if video is completed (95% watched)
      if (onComplete && current / duration >= 0.95) {
        onComplete()
      }
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      const newTime = (value[0] / 100) * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      if (isMuted) {
        videoRef.current.volume = volume
        setIsMuted(false)
      } else {
        videoRef.current.volume = 0
        setIsMuted(true)
      }
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const handleQualityChange = (newQuality: typeof quality) => {
    if (videoRef.current && publicId) {
      const currentTime = videoRef.current.currentTime
      const wasPlaying = !videoRef.current.paused

      setQuality(newQuality)

      // Update video source and restore playback position
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = currentTime
          if (wasPlaying) {
            videoRef.current.play()
          }
        }
      }, 100)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div
      className="relative bg-black rounded-lg overflow-hidden group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        poster={getThumbnailUrl()}
        key={getVideoUrl()} // Force re-render when URL changes
      >
        <source src={getVideoUrl()} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Button size="lg" onClick={togglePlay} className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90">
            <Play className="h-8 w-8 ml-1" />
          </Button>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
      >
        {/* Progress bar */}
        <div className="mb-4">
          <Slider
            value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
            onValueChange={handleSeek}
            max={100}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button size="sm" variant="ghost" onClick={togglePlay} className="text-white hover:bg-white/20">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white hover:bg-white/20">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
              <div className="w-20">
                <Slider value={[isMuted ? 0 : volume * 100]} onValueChange={handleVolumeChange} max={100} step={1} />
              </div>
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {publicId && (
              <div className="relative group/quality">
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                  <Settings className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-2 opacity-0 group-hover/quality:opacity-100 transition-opacity">
                  <div className="text-white text-xs mb-2">Quality</div>
                  {(["auto", "auto:best", "auto:good", "auto:low"] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => handleQualityChange(q)}
                      className={`block w-full text-left px-2 py-1 text-xs rounded hover:bg-white/20 ${
                        quality === q ? "bg-white/20" : ""
                      }`}
                    >
                      {q === "auto" ? "Auto" : q.split(":")[1].charAt(0).toUpperCase() + q.split(":")[1].slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <Button size="sm" variant="ghost" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
