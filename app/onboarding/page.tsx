"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function OnboardingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center px-4 py-20">
      <motion.div className="max-w-3xl w-full" variants={containerVariants} initial="hidden" animate="visible">
        {/* Progress indicator */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-8 h-1 bg-primary rounded-full" />
            <span>Step 1 of 3</span>
          </div>
        </motion.div>

        {/* Welcome banner */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">Let's Get Started</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock your potential through meaningful mentoring relationships
          </p>
        </motion.div>

        {/* Step overview cards */}
        <motion.div className="grid md:grid-cols-3 gap-6 mb-12" variants={containerVariants}>
          {[
            { num: 1, title: "Choose Your Role", desc: "Select mentor, mentee, or both" },
            { num: 2, title: "Build Your Profile", desc: "Share your expertise and goals" },
            { num: 3, title: "Find Your Match", desc: "Connect with the right people" },
          ].map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={itemVariants}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="font-serif font-bold text-primary text-lg">{step.num}</span>
              </div>
              <h3 className="font-serif font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue button */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <Link href="/onboarding/role">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              Continue
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
