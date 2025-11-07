"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ top: "10%", left: "10%" }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ bottom: "10%", right: "10%" }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-6 text-balance">Welcome to MentorHub</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-16 text-balance">
          Connect with mentors and mentees, grow together, and achieve your goals
        </p>

        {/* Arrow button to role selection */}
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <Link href="/onboarding">
            <button className="group relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110">
              <ChevronDown className="w-8 h-8 text-primary-foreground group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </Link>
        </motion.div>

        <p className="text-sm text-muted-foreground mt-8">Click to get started</p>
      </motion.div>
    </div>
  )
}
