"use client"

import { useAuth } from "../contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react" // Added import for React

export function withPermission(WrappedComponent: React.ComponentType, requiredPermission: string) {
  return function ProtectedRoute(props: any) {
    const { user, hasPermission } = useAuth()
    const router = useRouter()

    useEffect(() => {
      if (!user) {
        router.push("/login")
      } else if (!hasPermission(requiredPermission)) {
        router.push("/unauthorized")
      }
    }, [user, hasPermission, requiredPermission, router])

    if (!user) {
      return null // Or return a loading indicator
    }

    if (!hasPermission(requiredPermission)) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

