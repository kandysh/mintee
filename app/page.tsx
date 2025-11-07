"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp, containerVariants } from "../lib/animations"
import { Button } from "@/components/ui/button"

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
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-foreground mb-6 text-balance"
          variants={fadeInUp}
        >
          Welcome to MentorHub
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-16 text-balance"
          variants={fadeInUp}
        >
          Connect with mentors and mentees, grow together, and achieve your goals
        </motion.p>

        {/* Arrow button to role selection */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          variants={fadeInUp}
        >
          <Link href="/onboarding">
            <Button size="lg" className="group">
              Get Started
              <ChevronDown className="w-5 h-5 ml-2 text-primary-foreground group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground mt-8"
          variants={fadeInUp}
        >
          Click to get started
        </motion.p>
      </motion.div>
    </div>
  )
}
