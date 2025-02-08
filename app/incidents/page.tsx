import { Navigation } from "../components/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const incidents = [
  { id: 1, title: "Slip and Fall", type: "Minor Injury", date: "2023-06-01", status: "Open" },
  { id: 2, title: "Chemical Spill", type: "Environmental", date: "2023-05-28", status: "Closed" },
  { id: 3, title: "Equipment Malfunction", type: "Near Miss", date: "2023-05-25", status: "Under Investigation" },
]

export default function IncidentList() {
  return (
    <div className="flex h-screen">
      <Navigation />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Incident List</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.id}</TableCell>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{incident.type}</TableCell>
                <TableCell>{incident.date}</TableCell>
                <TableCell>{incident.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    </div>
  )
}

