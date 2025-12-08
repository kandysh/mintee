"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { itemVariants } from "@/lib/animations"
import { Button } from "@/components/ui/button"

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
      <Button
        variant="outline"
        onClick={() => setStep(Math.max(1, step - 1))}
        disabled={step === 1}
      >
        <ChevronLeft className="w-5 h-5 mr-2" />
        Back
      </Button>

      {step < totalSteps ? (
        <Button onClick={() => setStep(step + 1)}>
          Next
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      ) : (
        <Link href={`/dashboard/${role}`} onClick={handleFinish}>
          <Button>
            Finish Setup
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      )}
    </motion.div>
  )
}
