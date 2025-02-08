"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function WasteManagement() {
  const [wasteType, setWasteType] = useState("")
  const { toast } = useToast()

  const [wasteData, setWasteData] = useState([
    { id: 1, type: "Paper", amount: 500, unit: "kg", date: "2023-06-01" },
    { id: 2, type: "Plastic", amount: 300, unit: "kg", date: "2023-06-01" },
    { id: 3, type: "Electronic", amount: 50, unit: "kg", date: "2023-06-01" },
  ])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // This function would typically make an API call to submit the waste data
    toast({
      title: "Waste Data Submitted",
      description: "Your waste data has been successfully recorded.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Waste Management</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="waste-type">Waste Type</Label>
          <Select value={wasteType} onValueChange={setWasteType}>
            <SelectTrigger id="waste-type">
              <SelectValue placeholder="Select waste type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="paper">Paper</SelectItem>
              <SelectItem value="plastic">Plastic</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="organic">Organic</SelectItem>
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
              <SelectItem value="kg">Kilograms (kg)</SelectItem>
              <SelectItem value="tons">Tons</SelectItem>
              <SelectItem value="liters">Liters</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" required />
        </div>

        <Button type="submit">Record Waste Data</Button>
      </form>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Recent Waste Data</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Waste Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wasteData.map((waste) => (
              <TableRow key={waste.id}>
                <TableCell>{waste.type}</TableCell>
                <TableCell>{waste.amount}</TableCell>
                <TableCell>{waste.unit}</TableCell>
                <TableCell>{waste.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

