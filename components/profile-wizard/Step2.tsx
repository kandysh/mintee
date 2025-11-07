"use client"

import { motion } from "framer-motion"
import { containerVariants } from "@/lib/animations"

interface Step2Props {
    renderMultiSelect: (field: string, options: any) => React.ReactNode
    multiSelectOptions: any
}

export function Step2({ renderMultiSelect, multiSelectOptions }: Step2Props) {
  return (
    <motion.div variants={containerVariants}>
      {renderMultiSelect("functions", multiSelectOptions.functions)}
    </motion.div>
  )
}
