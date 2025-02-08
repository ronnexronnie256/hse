"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./contexts/auth-context"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ShieldCheck, Leaf } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">HSE Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Health"
          icon={<Heart className="h-6 w-6 text-gold" />}
          stats={[
            { label: "Medical Exams Due", value: 15, link: "/health/medical-surveillance" },
            { label: "Ergonomic Assessments", value: 8, link: "/health/ergonomics" },
            { label: "Mental Health Consultations", value: 3, link: "/health/mental-health" },
          ]}
        />
        <DashboardCard
          title="Safety"
          icon={<ShieldCheck className="h-6 w-6 text-gold" />}
          stats={[
            { label: "Open Incidents", value: 2, link: "/safety/incident-management" },
            { label: "Pending Risk Assessments", value: 5, link: "/safety/risk-assessment" },
            { label: "Overdue Trainings", value: 10, link: "/safety/training" },
          ]}
        />
        <DashboardCard
          title="Environment"
          icon={<Leaf className="h-6 w-6 text-gold" />}
          stats={[
            { label: "Waste Reduction (kg)", value: 500, link: "/environment/waste-management" },
            { label: "CO2 Emissions (tons)", value: 25, link: "/environment/emissions-control" },
            { label: "Sustainability Score", value: "85%", link: "/environment/sustainability" },
          ]}
        />
      </div>
    </div>
  )
}

function DashboardCard({ title, icon, stats }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-royal text-royal-foreground">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="pt-4">
        <dl className="space-y-2">
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between">
              <dt className="text-sm font-medium text-muted-foreground">
                <Link href={stat.link} className="hover:text-royal">
                  {stat.label}
                </Link>
              </dt>
              <dd className="text-sm font-semibold text-royal">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}

