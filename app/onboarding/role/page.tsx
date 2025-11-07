'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem('selectedRole')
    if (stored) setSelectedRole(stored)
  }, [])

  const handleContinue = () => {
    localStorage.setItem('selectedRole', selectedRole)
  }

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

  const roles = [
    {
      id: 'mentor',
      title: 'Mentor',
      description: 'Guide and inspire the next generation of professionals',
      icon: '👨‍🏫',
    },
    {
      id: 'mentee',
      title: 'Mentee',
      description: 'Learn and grow from experienced industry leaders',
      icon: '🎓',
    },
  ]

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center px-4 py-20">
      <motion.div className="max-w-4xl w-full" variants={containerVariants} initial="hidden" animate="visible">
        {/* Progress indicator */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <div className="w-12 h-1 bg-primary rounded-full" />
            <div className="w-8 h-1 bg-border rounded-full" />
            <div className="w-8 h-1 bg-border rounded-full" />
            <span>Step 2 of 3</span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4">What Best Describes You?</h1>
          <p className="text-lg text-muted-foreground">Choose one role to get started</p>
        </motion.div>

        {/* Role cards - now single select */}
        <motion.div className="grid md:grid-cols-2 gap-6 mb-12" variants={containerVariants}>
          {roles.map((role, i) => (
            <motion.button
              key={role.id}
              custom={i}
              variants={itemVariants}
              whileHover="hover"
              onClick={() => setSelectedRole(role.id)}
              className={`p-8 rounded-xl border-2 transition-all text-left ${
                selectedRole === role.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-card hover:border-primary/30'
              }`}
            >
              <div className="text-4xl mb-4">{role.icon}</div>
              <h3 className="font-serif font-bold text-2xl mb-3">{role.title}</h3>
              <p className="text-muted-foreground">{role.description}</p>
              {selectedRole === role.id && (
                <motion.div
                  className="mt-4 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Continue button */}
        {selectedRole && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
            <Link href="/onboarding/profile">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinue}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
