"use client"

import { useState } from "react"
import { PageLayout } from "@/app/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function Ergonomics() {
  const [assessmentType, setAssessmentType] = useState("")
  const { toast } = useToast()

  const [assessments, setAssessments] = useState([
    { id: 1, employee: "John Doe", department: "Engineering", date: "2023-06-01", risk: "Low" },
    { id: 2, employee: "Jane Smith", department: "HR", date: "2023-05-28", risk: "Medium" },
    { id: 3, employee: "Bob Johnson", department: "Operations", date: "2023-05-25", risk: "High" },
  ])

  const chartData = [
    { name: "Engineering", low: 5, medium: 3, high: 1 },
    { name: "HR", low: 3, medium: 2, high: 0 },
    { name: "Operations", low: 2, medium: 4, high: 2 },
  ]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    toast({
      title: "Ergonomic Assessment Submitted",
      description: "The ergonomic assessment has been recorded successfully.",
    })
  }

  return (
    <PageLayout title="Ergonomics">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="assessment-type">Assessment Type</Label>
            <Select value={assessmentType} onValueChange={setAssessmentType}>
              <SelectTrigger id="assessment-type">
                <SelectValue placeholder="Select assessment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workstation">Workstation Assessment</SelectItem>
                <SelectItem value="manual-handling">Manual Handling Assessment</SelectItem>
                <SelectItem value="computer-use">Computer Use Assessment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="employee">Employee</Label>
            <Input id="employee" required />
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Input id="department" required />
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
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="bg-royal text-royal-foreground hover:bg-royal/90">
            Submit Assessment
          </Button>
        </form>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-royal">Recent Assessments</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>{assessment.employee}</TableCell>
                  <TableCell>{assessment.department}</TableCell>
                  <TableCell>{assessment.date}</TableCell>
                  <TableCell>{assessment.risk}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-royal">Ergonomic Risk by Department</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="low" fill="#4169E1" /> {/* Royal Blue */}
              <Bar dataKey="medium" fill="#FFD700" /> {/* Gold */}
              <Bar dataKey="high" fill="#DC3545" /> {/* Red for high risk */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  )
}

