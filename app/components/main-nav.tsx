"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart2, Heart, ShieldCheck, Leaf, Settings, LogOut } from "lucide-react"
import { useAuth } from "@/app/contexts/auth-context"

const modules = [
  {
    name: "Health",
    icon: Heart,
    subModules: ["Medical Surveillance", "Ergonomics", "Mental Health"],
  },
  {
    name: "Safety",
    icon: ShieldCheck,
    subModules: ["Incident Management", "Risk Assessment", "Training"],
  },
  {
    name: "Environment",
    icon: Leaf,
    subModules: ["Waste Management", "Emissions Control", "Sustainability"],
  },
]

export function MainNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  if (!user) {
    return null
  }

  return (
    <div className="flex h-full w-60 flex-col border-r bg-white shadow-lg">
      <div className="p-6 bg-royal">
        <h1 className="text-2xl font-bold text-royal-foreground">HSE Platform</h1>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          <Link href="/" passHref>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start text-royal hover:text-royal-foreground hover:bg-royal/90",
                pathname === "/" && "bg-royal text-royal-foreground",
              )}
            >
              <BarChart2 className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          {modules.map((module) => (
            <div key={module.name} className="space-y-1">
              <h2 className="px-2 text-lg font-semibold">{module.name}</h2>
              {module.subModules.map((subModule) => (
                <Link
                  key={subModule}
                  href={`/${module.name.toLowerCase()}/${subModule.toLowerCase().replace(" ", "-")}`}
                  passHref
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start pl-8 text-royal hover:text-royal-foreground hover:bg-royal/90",
                      pathname === `/${module.name.toLowerCase()}/${subModule.toLowerCase().replace(" ", "-")}` &&
                        "bg-royal text-royal-foreground",
                    )}
                  >
                    {subModule}
                  </Button>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t">
        <Link href="/settings" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start text-royal hover:text-royal-foreground hover:bg-royal/90"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:text-destructive-foreground hover:bg-destructive/90"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}

