"use client"

import { motion, AnimatePresence } from "framer-motion"
import { containerVariants, itemVariants } from "@/lib/animations"
import { Step1 } from "./Step1"
import { Step2 } from "./Step2"
import { Step3 } from "./Step3"
import { Step4 } from "./Step4"

interface StepContentProps {
  step: number
  renderMultiSelect: (field: string, options: any) => React.ReactNode
  multiSelectOptions: any
  role: string
  formData: any
  handleInputChange: (field: string, value: string) => void
}

export function StepContent({
  step,
  renderMultiSelect,
  multiSelectOptions,
  role,
  formData,
  handleInputChange,
}: StepContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-serif font-bold">
            {step === 1 && "Where are you located?"}
            {step === 2 && "Tell us about your expertise"}
            {step === 3 && "What are your strengths?"}
            {step === 4 && "Review your profile"}
          </h1>
        </motion.div>

        {step === 1 && (
          <Step1
            renderMultiSelect={renderMultiSelect}
            multiSelectOptions={multiSelectOptions}
          />
        )}
        {step === 2 && (
          <Step2
            renderMultiSelect={renderMultiSelect}
            multiSelectOptions={multiSelectOptions}
          />
        )}
        {step === 3 && (
          <Step3
            renderMultiSelect={renderMultiSelect}
            multiSelectOptions={multiSelectOptions}
            role={role}
            formData={formData}
            handleInputChange={handleInputChange}
          />
        )}
        {step === 4 && (
          <Step4 formData={formData} handleInputChange={handleInputChange} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
