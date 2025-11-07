"use client"

import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

interface Step3Props {
    renderMultiSelect: (field: string, options: any) => React.ReactNode
    multiSelectOptions: any
    role: string
    formData: any
    handleInputChange: (field: string, value: string) => void
}

export function Step3({
  renderMultiSelect,
  multiSelectOptions,
  role,
  formData,
  handleInputChange,
}: Step3Props) {
  return (
    <motion.div variants={containerVariants}>
      {renderMultiSelect("strengths", multiSelectOptions.strengths)}
      {role === "mentor" && (
        <motion.div variants={itemVariants} className="mb-6">
          <label className="block text-sm font-semibold mb-3">Max Mentees</label>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.maxMentees}
            onChange={(e) => handleInputChange("maxMentees", e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </motion.div>
      )}
    </motion.div>
  )
}
