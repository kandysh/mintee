"use client"

import { motion } from "framer-motion"
import { itemVariants } from "@/lib/animations"

interface ProgressBarProps {
  step: number
  totalSteps: number
}

export function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-muted-foreground">
          Step {step} of {totalSteps}
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              className={`h-1 w-8 rounded-full ${
                s <= step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
