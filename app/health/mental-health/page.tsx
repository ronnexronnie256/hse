"use client"

import { useState } from "react"
import { PageLayout } from "@/app/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function MentalHealth() {
  const [consultationType, setConsultationType] = useState("")
  const { toast } = useToast()

  const [consultations, setConsultations] = useState([
    { id: 1, employee: "John Doe", type: "Stress Management", date: "2023-06-05", status: "Scheduled" },
    { id: 2, employee: "Jane Smith", type: "Anxiety Support", date: "2023-06-07", status: "Completed" },
    { id: 3, employee: "Bob Johnson", type: "Work-Life Balance", date: "2023-06-10", status: "Scheduled" },
  ])

  const chartData = [
    { name: "Stress Management", value: 45 },
    { name: "Anxiety Support", value: 30 },
    { name: "Work-Life Balance", value: 25 },
  ]

  const COLORS = ["#4169E1", "#FFD700", "#20B2AA"] // Royal Blue, Gold, Light Sea Green

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    toast({
      title: "Consultation Scheduled",
      description: "Your mental health consultation has been scheduled successfully.",
    })
  }

  return (
    <PageLayout title="Mental Health Support">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="consultation-type">Consultation Type</Label>
            <Select value={consultationType} onValueChange={setConsultationType}>
              <SelectTrigger id="consultation-type">
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stress">Stress Management</SelectItem>
                <SelectItem value="anxiety">Anxiety Support</SelectItem>
                <SelectItem value="work-life">Work-Life Balance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="employee">Employee</Label>
            <Input id="employee" required />
          </div>

          <div>
            <Label htmlFor="date">Preferred Date</Label>
            <Input id="date" type="date" required />
          </div>

          <Button type="submit" className="bg-royal text-royal-foreground hover:bg-royal/90">
            Schedule Consultation
          </Button>
        </form>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-royal">Upcoming Consultations</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {consultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell>{consultation.employee}</TableCell>
                  <TableCell>{consultation.type}</TableCell>
                  <TableCell>{consultation.date}</TableCell>
                  <TableCell>{consultation.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-royal">Consultation Types Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  )
}

