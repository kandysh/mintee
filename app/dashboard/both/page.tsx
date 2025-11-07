"use client"

import { motion } from "framer-motion"
import { BookOpen, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function DashboardBothPage() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  if (!isHydrated) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center px-4">
      <motion.div className="max-w-3xl w-full" variants={containerVariants} initial="hidden" animate="visible">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-3">Welcome to Your Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            You have both mentor and mentee roles. Select which dashboard you'd like to view.
          </p>
        </motion.div>

        {/* Dashboard Selection Cards */}
        <motion.div className="grid md:grid-cols-2 gap-8" variants={containerVariants}>
          {/* Mentor Dashboard Card */}
          <Link href="/dashboard/mentor">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer h-full group"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 p-4 rounded-xl bg-primary/10 w-fit">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-3 text-foreground">Mentor Dashboard</h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Manage your mentees, track requests, and guide the next generation of professionals.
                </p>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  View Dashboard
                  <span className="text-lg">→</span>
                </motion.div>
              </div>
            </motion.div>
          </Link>

          {/* Mentee Dashboard Card */}
          <Link href="/dashboard/mentee">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all cursor-pointer h-full group"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 p-4 rounded-xl bg-accent/10 w-fit">
                  <BookOpen className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-3 text-foreground">Mentee Dashboard</h2>
                <p className="text-muted-foreground mb-6 flex-grow">
                  Connect with mentors, explore new learning opportunities, and accelerate your growth.
                </p>
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  View Dashboard
                  <span className="text-lg">→</span>
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
