"use client"

import { Navigation } from "../components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import type React from "react" // Added import for React

export default function ReportIncident() {
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Here you would typically send the form data to your backend
    toast({
      title: "Incident Reported",
      description: "Your incident has been successfully reported.",
    })
  }

  return (
    <div className="flex h-screen">
      <Navigation />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Report an Incident</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Incident Title
            </label>
            <Input type="text" id="title" name="title" required />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Incident Type
            </label>
            <Select name="type">
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="near-miss">Near Miss</SelectItem>
                <SelectItem value="minor-injury">Minor Injury</SelectItem>
                <SelectItem value="major-injury">Major Injury</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea id="description" name="description" required />
          </div>
          <Button type="submit">Submit Report</Button>
        </form>
      </main>
    </div>
  )
}

