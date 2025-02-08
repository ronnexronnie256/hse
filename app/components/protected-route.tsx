"use client"

import { useAuth } from "@/app/components/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return <>{children}</>
}

