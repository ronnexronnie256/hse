"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function RiskAssessment() {
  const [assessmentType, setAssessmentType] = useState("")
  const { toast } = useToast()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // This function would typically make an API call to submit the risk assessment
    toast({
      title: "Risk Assessment Submitted",
      description: "Your risk assessment has been successfully submitted.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Risk Assessment</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="assessment-type">Assessment Type</Label>
          <Select value={assessmentType} onValueChange={setAssessmentType}>
            <SelectTrigger id="assessment-type">
              <SelectValue placeholder="Select assessment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="workplace">Workplace Assessment</SelectItem>
              <SelectItem value="task">Task-based Assessment</SelectItem>
              <SelectItem value="equipment">Equipment Assessment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="location">Location/Task/Equipment</Label>
          <Input id="location" required />
        </div>

        <div>
          <Label htmlFor="hazards">Identified Hazards</Label>
          <Textarea id="hazards" required />
        </div>

        <div>
          <Label htmlFor="current-controls">Current Control Measures</Label>
          <Textarea id="current-controls" required />
        </div>

        <div>
          <Label htmlFor="risk-level">Risk Level</Label>
          <Select>
            <SelectTrigger id="risk-level">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="additional-controls">Additional Control Measures</Label>
          <Textarea id="additional-controls" required />
        </div>

        <Button type="submit">Submit Risk Assessment</Button>
      </form>
    </div>
  )
}

