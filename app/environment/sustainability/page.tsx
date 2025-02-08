"use client"

import { useState } from "react"
import { PageLayout } from "@/app/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

export default function Sustainability() {
  const [initiativeType, setInitiativeType] = useState("")
  const { toast } = useToast()

  const [initiatives, setInitiatives] = useState([
    { id: 1, name: "Solar Panel Installation", status: "In Progress", completionDate: "2023-12-31" },
    { id: 2, name: "Water Conservation Program", status: "Completed", completionDate: "2023-05-15" },
    { id: 3, name: "Waste Reduction Campaign", status: "Planned", completionDate: "2024-03-01" },
  ])

  const chartData = [
    { subject: "Energy Efficiency", A: 120, B: 110, fullMark: 150 },
    { subject: "Water Conservation", A: 98, B: 130, fullMark: 150 },
    { subject: "Waste Reduction", A: 86, B: 130, fullMark: 150 },
    { subject: "Carbon Footprint", A: 99, B: 100, fullMark: 150 },
    { subject: "Sustainable Sourcing", A: 85, B: 90, fullMark: 150 },
    { subject: "Employee Engagement", A: 65, B: 85, fullMark: 150 },
  ]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    toast({
      title: "Sustainability Initiative Added",
      description: "The new sustainability initiative has been successfully added.",
    })
  }

  return (
    <PageLayout title="Sustainability">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="initiative-type">Initiative Type</Label>
            <Select value={initiativeType} onValueChange={setInitiativeType}>
              <SelectTrigger id="initiative-type">
                <SelectValue placeholder="Select initiative type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="energy">Energy Efficiency</SelectItem>
                <SelectItem value="water">Water Conservation</SelectItem>
                <SelectItem value="waste">Waste Reduction</SelectItem>
                <SelectItem value="carbon">Carbon Footprint Reduction</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="initiative-name">Initiative Name</Label>
            <Input id="initiative-name" required />
          </div>

          <div>
            <Label htmlFor="completion-date">Expected Completion Date</Label>
            <Input id="completion-date" type="date" required />
          </div>

          <Button type="submit">Add Initiative</Button>
        </form>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Current Initiatives</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Initiative Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Completion Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initiatives.map((initiative) => (
                <TableRow key={initiative.id}>
                  <TableCell>{initiative.name}</TableCell>
                  <TableCell>{initiative.status}</TableCell>
                  <TableCell>{initiative.completionDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Sustainability Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 150]} />
              <Radar name="This Year" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Radar name="Last Year" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  )
}

