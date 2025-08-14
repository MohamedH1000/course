export interface User {
  id: string
  email: string
  name: string
  role: "student" | "instructor" | "admin"
  avatar?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  password: string
  role?: "student" | "instructor"
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@eduplatform.com",
    name: "Admin User",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "instructor@eduplatform.com",
    name: "John Instructor",
    role: "instructor",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "student@eduplatform.com",
    name: "Jane Student",
    role: "student",
    createdAt: new Date().toISOString(),
  },
]

// Mock authentication functions
export const authAPI = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = mockUsers.find((u) => u.email === credentials.email)

    if (!user || credentials.password !== "password123") {
      throw new Error("Invalid email or password")
    }

    const token = `mock-jwt-token-${user.id}-${Date.now()}`

    return { user, token }
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const existingUser = mockUsers.find((u) => u.email === credentials.email)
    if (existingUser) {
      throw new Error("User with this email already exists")
    }

    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      email: credentials.email,
      name: credentials.name,
      role: credentials.role || "student",
      createdAt: new Date().toISOString(),
    }

    mockUsers.push(newUser)
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

    return { user: newUser, token }
  },

  async getCurrentUser(token: string): Promise<User | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Extract user ID from mock token
    const tokenParts = token.split("-")
    const userId = tokenParts[3]

    const user = mockUsers.find((u) => u.id === userId)
    return user || null
  },

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    // In a real app, this would invalidate the token on the server
  },
}
