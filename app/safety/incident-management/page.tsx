"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { PageLayout } from "@/app/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { DataTable } from "@/app/components/data-table"
import { withPermission } from "@/app/components/with-permission"
import { useAuth } from "@/app/contexts/auth-context"
import { DatePicker } from "@/app/components/date-picker"

const formSchema = z.object({
  incidentType: z.string({
    required_error: "Please select an incident type.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

function IncidentManagement() {
  const { toast } = useToast()
  const { hasPermission } = useAuth()

  const [incidents, setIncidents] = useState([
    { id: 1, type: "Near Miss", location: "Warehouse", date: "2023-06-01", status: "Investigating" },
    { id: 2, type: "Minor Injury", location: "Office", date: "2023-05-28", status: "Resolved" },
    { id: 3, type: "Property Damage", location: "Parking Lot", date: "2023-05-25", status: "Pending Review" },
  ])

  const chartData = [
    { name: "Jan", nearMiss: 4, minorInjury: 2, majorInjury: 0 },
    { name: "Feb", nearMiss: 3, minorInjury: 1, majorInjury: 0 },
    { name: "Mar", nearMiss: 5, minorInjury: 3, majorInjury: 1 },
    { name: "Apr", nearMiss: 2, minorInjury: 2, majorInjury: 0 },
    { name: "May", nearMiss: 6, minorInjury: 1, majorInjury: 0 },
    { name: "Jun", nearMiss: 4, minorInjury: 2, majorInjury: 0 },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      incidentType: "",
      location: "",
      date: "",
      description: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Incident Reported",
      description: "The incident has been successfully reported and is under review.",
    })
    form.reset()
  }

  const columns = [
    { key: "type", label: "Type", sortable: true },
    { key: "location", label: "Location", sortable: true },
    { key: "date", label: "Date", sortable: true },
    { key: "status", label: "Status", sortable: true },
  ]

  return (
    <PageLayout title="Incident Management">
      <div className="space-y-6">
        {hasPermission("report_incidents") && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="incidentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incident Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select incident type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="near-miss">Near Miss</SelectItem>
                        <SelectItem value="minor-injury">Minor Injury</SelectItem>
                        <SelectItem value="major-injury">Major Injury</SelectItem>
                        <SelectItem value="property-damage">Property Damage</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter incident location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Incident</FormLabel>
                    <FormControl>
                      <DatePicker label="Date of Incident" value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the incident" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="bg-royal text-royal-foreground hover:bg-royal/90">
                Report Incident
              </Button>
            </form>
          </Form>
        )}

        {hasPermission("view_reports") && (
          <>
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-royal">Recent Incidents</h2>
              <DataTable data={incidents} columns={columns} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-royal">Incident Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="nearMiss" stroke="#4169E1" />
                  <Line type="monotone" dataKey="minorInjury" stroke="#FFD700" />
                  <Line type="monotone" dataKey="majorInjury" stroke="#DC3545" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  )
}

export default withPermission(IncidentManagement, "view_reports")

