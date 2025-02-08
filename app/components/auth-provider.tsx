"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type User = {
  id: string
  name: string
  email: string
  role: "admin" | "safety_officer" | "employee"
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  console.log("Rendering AuthProvider")
  console.log("Initial user state:", user)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    console.log("Login attempted with:", email)
    // This is a mock login. In a real app, you'd call your API here.
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email: email,
      role: "admin",
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    console.log("Logout attempted")
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

