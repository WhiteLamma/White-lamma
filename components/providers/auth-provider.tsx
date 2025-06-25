"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: "user" | "business" | "admin"
  isElite?: boolean
  businessId?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: "user" | "business" | "admin") => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Enhanced mock users for demo
const mockUsers = {
  // Regular Users
  "user@help.com": {
    id: "user_1",
    name: "Rahul Sharma",
    email: "user@help.com",
    avatar: "/placeholder.svg",
    role: "user" as const,
    isElite: true,
  },
  "priya@help.com": {
    id: "user_2",
    name: "Priya Singh",
    email: "priya@help.com",
    avatar: "/placeholder.svg",
    role: "user" as const,
    isElite: false,
  },
  "amit@help.com": {
    id: "user_3",
    name: "Amit Kumar",
    email: "amit@help.com",
    avatar: "/placeholder.svg",
    role: "user" as const,
    isElite: true,
  },

  // Business Owners
  "business@help.com": {
    id: "business_1",
    name: "Sharma Ji",
    email: "business@help.com",
    avatar: "/placeholder.svg",
    role: "business" as const,
    businessId: "dhaba_1",
  },
  "cafe@help.com": {
    id: "business_2",
    name: "Ravi Patel",
    email: "cafe@help.com",
    avatar: "/placeholder.svg",
    role: "business" as const,
    businessId: "cafe_1",
  },
  "gym@help.com": {
    id: "business_3",
    name: "Fitness Corp",
    email: "gym@help.com",
    avatar: "/placeholder.svg",
    role: "business" as const,
    businessId: "gym_1",
  },

  // Admins
  "admin@help.com": {
    id: "admin_1",
    name: "Admin User",
    email: "admin@help.com",
    avatar: "/placeholder.svg",
    role: "admin" as const,
  },
  "superadmin@help.com": {
    id: "admin_2",
    name: "Super Admin",
    email: "superadmin@help.com",
    avatar: "/placeholder.svg",
    role: "admin" as const,
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("help-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role?: "user" | "business" | "admin"): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers[email as keyof typeof mockUsers]

    if (mockUser && password === "password123") {
      if (role && mockUser.role !== role) {
        setIsLoading(false)
        return false
      }

      setUser(mockUser)
      localStorage.setItem("help-user", JSON.stringify(mockUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("help-user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export { AuthContext }
