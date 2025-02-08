"use client"

import Link from "next/link"
import { Home, AlertTriangle, FileText, BarChart2, LogOut } from "lucide-react"
import { useAuth } from "@/app/components/auth-provider"

export function Navigation() {
  const { user, logout } = useAuth()
  return (
    <nav className="flex flex-col space-y-2 p-4 bg-gray-100">
      <Link href="/" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
        <Home size={20} />
        <span>Dashboard</span>
      </Link>
      <Link href="/report" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
        <AlertTriangle size={20} />
        <span>Report Incident</span>
      </Link>
      <Link href="/incidents" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
        <FileText size={20} />
        <span>Incident List</span>
      </Link>
      <Link href="/analytics" className="flex items-center space-x-2 p-2 hover:bg-gray-200 rounded">
        <BarChart2 size={20} />
        <span>Analytics</span>
      </Link>
      <button onClick={logout} className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded mt-auto">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </nav>
  )
}

