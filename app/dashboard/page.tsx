'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRole } from '@/hooks/useRole'
import { Users, UserCheck } from 'lucide-react'
import { rotate, containerVariants, itemVariants } from '@/lib/animations'

export default function DashboardPage() {
  const router = useRouter()
  const { role, isLoading } = useRole()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    if (!isLoading && !role) {
      router.push('/select-role')
    }
  }, [isLoading, role, router])

  if (!isHydrated || isLoading || !role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div variants={rotate} animate="animate">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          style={{ top: "10%", left: "10%" }}
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          style={{ bottom: "10%", right: "10%" }}
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center max-w-5xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-foreground mb-6 text-balance"
          variants={itemVariants}
        >
          Welcome to Your Dashboard
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-16 text-balance"
          variants={itemVariants}
        >
          Select your dashboard to begin your mentoring journey
        </motion.p>

        {/* Dashboard Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {/* Mentor Dashboard */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/dashboard/mentor')}
            className="group cursor-pointer"
          >
            <div className="relative h-full p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  className="inline-flex p-4 rounded-xl bg-primary/10 mb-6 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-16 h-16 text-primary" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Mentor Dashboard
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Manage your mentees, view requests, and share your expertise
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-auto px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Open Dashboard
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Mentee Dashboard */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/dashboard/mentee')}
            className="group cursor-pointer"
          >
            <div className="relative h-full p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  className="inline-flex p-4 rounded-xl bg-accent/10 mb-6 transition-transform duration-300"
                  whileHover={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <UserCheck className="w-16 h-16 text-accent" />
                </motion.div>
                
                <h3 className="text-2xl font-bold mb-3 text-foreground">
                  Mentee Dashboard
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Connect with mentors, explore matches, and grow your career
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="mt-auto px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Open Dashboard
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground mt-8"
          variants={itemVariants}
        >
          You can switch between dashboards anytime
        </motion.p>
      </motion.div>
    </div>
  )
}
