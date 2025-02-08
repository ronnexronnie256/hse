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

export default function Training() {
  const [trainingType, setTrainingType] = useState("")
  const { toast } = useToast()

  const [trainings, setTrainings] = useState([
    { id: 1, name: "Fire Safety", employee: "John Doe", date: "2023-06-15", status: "Scheduled" },
    { id: 2, name: "First Aid", employee: "Jane Smith", date: "2023-06-20", status: "Completed" },
    { id: 3, name: "Hazardous Materials", employee: "Bob Johnson", date: "2023-06-25", status: "Scheduled" },
  ])

  const chartData = [
    { name: "Fire Safety", completed: 45, scheduled: 15 },
    { name: "First Aid", completed: 35, scheduled: 20 },
    { name: "Hazardous Materials", completed: 30, scheduled: 25 },
    { name: "Ergonomics", completed: 40, scheduled: 10 },
  ]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    toast({
      title: "Training Scheduled",
      description: "The training session has been successfully scheduled.",
    })
  }

  return (
    <PageLayout title="Safety Training">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="training-type">Training Type</Label>
            <Select value={trainingType} onValueChange={setTrainingType}>
              <SelectTrigger id="training-type">
                <SelectValue placeholder="Select training type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fire-safety">Fire Safety</SelectItem>
                <SelectItem value="first-aid">First Aid</SelectItem>
                <SelectItem value="hazardous-materials">Hazardous Materials</SelectItem>
                <SelectItem value="ergonomics">Ergonomics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="employee">Employee</Label>
            <Input id="employee" required />
          </div>

          <div>
            <Label htmlFor="date">Training Date</Label>
            <Input id="date" type="date" required />
          </div>

          <Button type="submit">Schedule Training</Button>
        </form>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Upcoming Trainings</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Training Name</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell>{training.name}</TableCell>
                  <TableCell>{training.employee}</TableCell>
                  <TableCell>{training.date}</TableCell>
                  <TableCell>{training.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Training Completion Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#8884d8" />
              <Bar dataKey="scheduled" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  )
}

