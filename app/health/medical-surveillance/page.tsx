"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"

export default function MedicalSurveillance() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", department: "Engineering", lastExam: "2023-01-15", nextExam: "2024-01-15" },
    { id: 2, name: "Jane Smith", department: "HR", lastExam: "2023-03-20", nextExam: "2024-03-20" },
    { id: 3, name: "Bob Johnson", department: "Operations", lastExam: "2022-11-10", nextExam: "2023-11-10" },
  ])
  const { toast } = useToast()

  const scheduleExam = (employeeId: number) => {
    // This function would typically make an API call to schedule an exam
    toast({
      title: "Exam Scheduled",
      description: `Medical exam scheduled for employee ID: ${employeeId}`,
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Medical Surveillance</h1>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Schedule New Exam</h2>
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="employee">Employee</Label>
            <Input id="employee" placeholder="Select employee" />
          </div>
          <div className="flex-1">
            <Label htmlFor="exam-date">Exam Date</Label>
            <Input id="exam-date" type="date" />
          </div>
          <Button className="mt-auto">Schedule Exam</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Upcoming Exams</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Exam</TableHead>
              <TableHead>Next Exam</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.lastExam}</TableCell>
                <TableCell>{employee.nextExam}</TableCell>
                <TableCell>
                  <Button onClick={() => scheduleExam(employee.id)}>Schedule</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

