"use client"

import { motion } from "framer-motion"
import { Settings } from "lucide-react"

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
  onEditPreferences: () => void;
}

export function DashboardHeader({ title, subtitle, onEditPreferences }: DashboardHeaderProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <motion.div variants={itemVariants} className="mb-12 flex items-start justify-between">
      <div>
        <h1 className="text-5xl font-serif font-bold mb-2">{title}</h1>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </div>
      <motion.button
        onClick={onEditPreferences}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        className="p-2 rounded-lg hover:bg-muted transition-colors"
        title="Edit Preferences"
      >
        <Settings className="w-5 h-5" />
      </motion.button>
    </motion.div>
  )
}