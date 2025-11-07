"use client"

import { motion } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"

interface Step4Props {
  formData: any
  handleInputChange: (field: string, value: string) => void
}

export function Step4({ formData, handleInputChange }: Step4Props) {
  return (
    <motion.div variants={containerVariants} className="space-y-4">
      <motion.div
        variants={itemVariants}
        className="p-4 rounded-lg bg-card border border-border"
      >
        <h3 className="font-semibold mb-3 text-foreground">Selected Information</h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Regions: {formData.regions.join(", ") || "None"}</p>
          <p>Languages: {formData.languages.join(", ") || "None"}</p>
          <p>Functions: {formData.functions.join(", ") || "None"}</p>
          <p>Strengths: {formData.strengths.join(", ") || "None"}</p>
        </div>
      </motion.div>
      <motion.div variants={itemVariants}>
        <label className="block text-sm font-semibold mb-2 text-foreground">
          Additional Information
        </label>
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
          placeholder="Tell us more about yourself..."
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          rows={4}
        />
      </motion.div>
    </motion.div>
  )
}
