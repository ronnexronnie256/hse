"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Role = "admin" | "safety_officer" | "employee"

interface User {
  id: string
  name: string
  email: string
  role: Role
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
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
    setUser(null)
    localStorage.removeItem("user")
  }

  const hasPermission = (permission: string) => {
    if (!user) return false

    const permissions = {
      admin: ["manage_users", "view_reports", "edit_incidents", "approve_actions"],
      safety_officer: ["view_reports", "edit_incidents", "approve_actions"],
      employee: ["view_reports", "report_incidents"],
    }

    return permissions[user.role].includes(permission)
  }

  return <AuthContext.Provider value={{ user, login, logout, hasPermission }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

