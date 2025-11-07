"use client"

import * as React from "react"
import { X, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface MultiSelectProps {
  options: Array<{ value: string; label: string }>
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  className?: string
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  ({ options, selected, onChange, placeholder = "Select items...", className = "" }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleToggle = (value: string) => {
      if (selected.includes(value)) {
        onChange(selected.filter((item) => item !== value))
      } else {
        onChange([...selected, value])
      }
    }

    const handleRemove = (value: string, e: React.MouseEvent) => {
      e.stopPropagation()
      onChange(selected.filter((item) => item !== value))
    }

    const selectedLabels = selected.map((val) => options.find((opt) => opt.value === val)?.label).filter(Boolean)

    return (
      <div ref={containerRef} className={`relative w-full ${className}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground text-left flex items-center justify-between hover:border-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0"
        >
          <div className="flex flex-wrap gap-2 flex-1">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label, idx) => (
                <motion.span
                  key={idx}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent rounded-md text-sm"
                >
                  {label}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      const value = options.find((opt) => opt.label === label)?.value
                      if (value) handleRemove(value, e as any)
                    }}
                    className="hover:bg-accent/30 rounded p-0.5 transition-colors cursor-pointer"
                    role="button"
                    tabIndex={0}
                  >
                    <X className="w-3 h-3" />
                  </div>
                </motion.span>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleToggle(option.value)}
                  className={`w-full px-4 py-2 text-left hover:bg-accent/10 transition-colors duration-150 flex items-center gap-2 ${
                    selected.includes(option.value) ? "bg-accent/20" : ""
                  }`}
                  whileHover={{ paddingLeft: "1.25rem" }}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      selected.includes(option.value) ? "bg-accent border-accent" : "border-border"
                    }`}
                  >
                    {selected.includes(option.value) && (
                      <motion.svg
                        className="w-3 h-3 text-accent-foreground"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </motion.svg>
                    )}
                  </div>
                  <span>{option.label}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

MultiSelect.displayName = "MultiSelect"
