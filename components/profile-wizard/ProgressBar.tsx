"use client"

import { motion } from "framer-motion"
import { itemVariants } from "@/lib/animations"
import { Progress } from "@/components/ui/progress"

interface ProgressBarProps {
  step: number
  totalSteps: number
}

export function ProgressBar({ step, totalSteps }: ProgressBarProps) {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">
          Step {step} of {totalSteps}
        </span>
      </div>
      <Progress value={progressPercentage} />
    </motion.div>
  )
}
