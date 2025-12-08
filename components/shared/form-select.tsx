"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  label: string
  placeholder?: string
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export function FormSelect({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
}: FormSelectProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-3 text-foreground">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
