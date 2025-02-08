import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "./contexts/auth-context"
import { MainNav } from "./components/main-nav"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "HSE Management Platform",
  description: "World-class Health, Safety, and Environment Management System",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen">
            <MainNav />
            <div className="flex-1 overflow-auto">
              <main className="p-8">{children}</main>
            </div>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

