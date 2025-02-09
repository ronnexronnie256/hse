import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
            <AvatarFallback>MR</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">Mandy Ronald</h2>
            <p className="text-muted-foreground">mandyronald@example.com</p>
          </div>
        </div>
        <Button variant="outline">Change Avatar</Button>
      </div>
      <Form>{/* Form content here */}</Form>
    </div>
  )
}

