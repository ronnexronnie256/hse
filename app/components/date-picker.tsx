import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DatePickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="date">{label}</Label>
      <Input type="date" id="date" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}

