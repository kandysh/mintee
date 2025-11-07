"use client"

import { motion } from "framer-motion"

interface FormInputProps {
  label: string
  type?: string
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
  min?: number
  max?: number
}

export function FormInput({ label, type = "text", value, onChange, placeholder, min, max }: FormInputProps) {
  return (
    <motion.div className="mb-6">
      <label className="block text-sm font-semibold mb-3 text-foreground">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
      />
    </motion.div>
  )
}
