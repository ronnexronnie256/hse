import { PageLayout } from "@/app/components/page-layout"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Unauthorized() {
  return (
    <PageLayout title="Unauthorized Access">
      <div className="flex flex-col items-center justify-center space-y-4">
        <p className="text-lg text-gray-600">You do not have permission to access this page.</p>
        <Link href="/">
          <Button className="bg-royal text-royal-foreground hover:bg-royal/90">Return to Dashboard</Button>
        </Link>
      </div>
    </PageLayout>
  )
}

