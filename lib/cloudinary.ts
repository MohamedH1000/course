// Cloudinary configuration and utilities
export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your-cloud-name",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "course-videos",
}

export interface CloudinaryVideo {
  public_id: string
  secure_url: string
  duration: number
  format: string
  resource_type: string
  bytes: number
  created_at: string
  width: number
  height: number
  playback_url?: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export class CloudinaryUploader {
  private cloudName: string
  private uploadPreset: string

  constructor() {
    this.cloudName = CLOUDINARY_CONFIG.cloudName
    this.uploadPreset = CLOUDINARY_CONFIG.uploadPreset
  }

  async uploadVideo(file: File, onProgress?: (progress: UploadProgress) => void): Promise<CloudinaryVideo> {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", this.uploadPreset)
      formData.append("resource_type", "video")
      formData.append("folder", "course-videos")

      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable && onProgress) {
          const progress: UploadProgress = {
            loaded: event.loaded,
            total: event.total,
            percentage: Math.round((event.loaded / event.total) * 100),
          }
          onProgress(progress)
        }
      })

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText)
          resolve(response)
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`))
        }
      })

      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed"))
      })

      xhr.open("POST", `https://api.cloudinary.com/v1_1/${this.cloudName}/video/upload`)
      xhr.send(formData)
    })
  }

  getOptimizedVideoUrl(
    publicId: string,
    options: {
      quality?: "auto" | "auto:low" | "auto:good" | "auto:best"
      format?: "auto" | "mp4" | "webm"
      width?: number
      height?: number
    } = {},
  ): string {
    const { quality = "auto", format = "auto", width, height } = options

    let transformation = `q_${quality},f_${format}`

    if (width && height) {
      transformation += `,w_${width},h_${height},c_fill`
    } else if (width) {
      transformation += `,w_${width},c_scale`
    }

    return `https://res.cloudinary.com/${this.cloudName}/video/upload/${transformation}/${publicId}`
  }

  getThumbnailUrl(
    publicId: string,
    options: {
      width?: number
      height?: number
      time?: number
    } = {},
  ): string {
    const { width = 640, height = 360, time = 0 } = options

    return `https://res.cloudinary.com/${this.cloudName}/video/upload/so_${time},w_${width},h_${height},c_fill,f_jpg/${publicId}.jpg`
  }
}

export const cloudinaryUploader = new CloudinaryUploader()
