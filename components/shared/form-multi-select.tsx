"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useState, useRef, useEffect } from "react"

interface Option {
  value: string
  label: string
}

interface FormMultiSelectProps {
  label: string
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function FormMultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder = "Select options...",
}: FormMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  const removeOption = (value: string) => {
    onChange(selected.filter((v) => v !== value))
  }

  return (
    <motion.div className="mb-6">
      <label className="block text-sm font-semibold mb-3 text-foreground">{label}</label>
      <div ref={ref} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground text-left hover:border-primary/50 transition-all flex items-center justify-between"
        >
          <span className="text-muted-foreground">{placeholder}</span>
          <span className="text-muted-foreground">▼</span>
        </button>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50"
          >
            <div className="max-h-48 overflow-y-auto">
              {options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center px-4 py-2 hover:bg-accent/10 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option.value)}
                    onChange={() => toggleOption(option.value)}
                    className="w-4 h-4 rounded border-border cursor-pointer"
                  />
                  <span className="ml-3 text-foreground">{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Selected pills */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selected.map((value) => {
            const label = options.find((o) => o.value === value)?.label || value
            return (
              <motion.div
                key={value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center gap-2"
              >
                {label}
                <button onClick={() => removeOption(value)} className="hover:opacity-70 transition-opacity">
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
