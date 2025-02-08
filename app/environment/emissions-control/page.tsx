"use client"

import { useState } from "react"
import { PageLayout } from "@/app/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function EmissionsControl() {
  const [emissionType, setEmissionType] = useState("")
  const { toast } = useToast()

  const [emissions, setEmissions] = useState([
    { id: 1, type: "CO2", amount: 1000, unit: "tons", date: "2023-06-01" },
    { id: 2, type: "Methane", amount: 50, unit: "tons", date: "2023-05-28" },
    { id: 3, type: "Nitrous Oxide", amount: 25, unit: "tons", date: "2023-05-25" },
  ])

  const chartData = [
    { name: "Jan", CO2: 900, Methane: 45, NitrousOxide: 20 },
    { name: "Feb", CO2: 950, Methane: 48, NitrousOxide: 22 },
    { name: "Mar", CO2: 1000, Methane: 50, NitrousOxide: 25 },
    { name: "Apr", CO2: 980, Methane: 47, NitrousOxide: 23 },
    { name: "May", CO2: 1020, Methane: 52, NitrousOxide: 26 },
    { name: "Jun", CO2: 1000, Methane: 50, NitrousOxide: 25 },
  ]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    toast({
      title: "Emission Data Recorded",
      description: "The emission data has been successfully recorded.",
    })
  }

  return (
    <PageLayout title="Emissions Control">
      <div className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="emission-type">Emission Type</Label>
            <Select value={emissionType} onValueChange={setEmissionType}>
              <SelectTrigger id="emission-type">
                <SelectValue placeholder="Select emission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="co2">Carbon Dioxide (CO2)</SelectItem>
                <SelectItem value="methane">Methane</SelectItem>
                <SelectItem value="nitrous-oxide">Nitrous Oxide</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" required />
          </div>

          <div>
            <Label htmlFor="unit">Unit</Label>
            <Select>
              <SelectTrigger id="unit">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tons">Tons</SelectItem>
                <SelectItem value="kg">Kilograms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" required />
          </div>

          <Button type="submit">Record Emission</Button>
        </form>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Recent Emissions</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Emission Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emissions.map((emission) => (
                <TableRow key={emission.id}>
                  <TableCell>{emission.type}</TableCell>
                  <TableCell>{emission.amount}</TableCell>
                  <TableCell>{emission.unit}</TableCell>
                  <TableCell>{emission.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Emission Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="CO2" stroke="#8884d8" />
              <Line type="monotone" dataKey="Methane" stroke="#82ca9d" />
              <Line type="monotone" dataKey="NitrousOxide" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PageLayout>
  )
}

