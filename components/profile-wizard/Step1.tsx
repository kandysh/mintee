"use client"

import { motion } from "framer-motion"
import { containerVariants } from "@/lib/animations"

interface Step1Props {
    renderMultiSelect: (field: string, options: any) => React.ReactNode
    multiSelectOptions: any
}

export function Step1({ renderMultiSelect, multiSelectOptions }: Step1Props) {
  return (
    <motion.div variants={containerVariants}>
        {renderMultiSelect("regions", multiSelectOptions.regions)}
        {renderMultiSelect("languages", multiSelectOptions.languages)}
    </motion.div>
  )
}
