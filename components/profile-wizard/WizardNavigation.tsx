"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { itemVariants, scale } from "@/lib/animations"

interface WizardNavigationProps {
  step: number
  totalSteps: number
  role: string
  setStep: (step: number) => void
  handleFinish: () => void
}

export function WizardNavigation({
  step,
  totalSteps,
  role,
  setStep,
  handleFinish,
}: WizardNavigationProps) {
  return (
    <motion.div variants={itemVariants} className="flex justify-between mt-12 gap-4">
      <motion.button
        variants={scale}
        whileHover="hover"
        whileTap="tap"
        onClick={() => setStep(Math.max(1, step - 1))}
        disabled={step === 1}
        className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </motion.button>

      {step < totalSteps ? (
        <motion.button
          variants={scale}
          whileHover="hover"
          whileTap="tap"
          onClick={() => setStep(step + 1)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all ml-auto"
        >
          Next
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      ) : (
        <Link href={`/dashboard/${role}`}>
          <motion.button
            variants={scale}
            whileHover="hover"
            whileTap="tap"
            onClick={handleFinish}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Finish Setup
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </Link>
      )}
    </motion.div>
  )
}
