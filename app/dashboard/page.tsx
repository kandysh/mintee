'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRole } from '@/hooks/useRole'
import { Users, UserCheck, Sparkles } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto py-20 px-4 flex flex-col items-center justify-center min-h-screen"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with icon */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-2xl blur-xl opacity-50" />
              <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-2xl">
                <Sparkles className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>
          </motion.div>
          
          <h1 className="text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Choose Your Path
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your dashboard to begin your mentoring journey
          </p>
        </motion.div>

        {/* Dashboard Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 w-full max-w-4xl"
          variants={containerVariants}
        >
          {/* Mentor Dashboard */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -12, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/dashboard/mentor')}
            className="group cursor-pointer"
          >
            <div className="relative h-full p-10 rounded-3xl bg-card/80 backdrop-blur-sm border-2 border-border hover:border-primary transition-all overflow-hidden shadow-xl hover:shadow-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  className="inline-flex p-5 rounded-3xl bg-gradient-to-br from-primary to-accent mb-8 shadow-lg"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Users className="w-20 h-20 text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">
                  Mentor Dashboard
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  Guide and inspire the next generation of leaders
                </p>

                <motion.div 
                  className="mt-auto flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-lg group-hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Enter</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Mentee Dashboard */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -12, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/dashboard/mentee')}
            className="group cursor-pointer"
          >
            <div className="relative h-full p-10 rounded-3xl bg-card/80 backdrop-blur-sm border-2 border-border hover:border-accent transition-all overflow-hidden shadow-xl hover:shadow-2xl">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.8 }}
              />
              
              <div className="relative flex flex-col items-center text-center">
                <motion.div 
                  className="inline-flex p-5 rounded-3xl bg-gradient-to-br from-accent to-primary mb-8 shadow-lg"
                  whileHover={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <UserCheck className="w-20 h-20 text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-3xl font-serif font-bold mb-4 text-foreground">
                  Mentee Dashboard
                </h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                  Connect with mentors and accelerate your growth
                </p>

                <motion.div 
                  className="mt-auto flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent to-primary text-primary-foreground font-semibold shadow-lg group-hover:shadow-xl transition-shadow"
                  whileHover={{ scale: 1.05 }}
                >
                  <span>Enter</span>
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer hint */}
        <motion.p
          variants={itemVariants}
          className="mt-12 text-sm text-muted-foreground/60"
        >
          You can switch between dashboards anytime
        </motion.p>
      </motion.div>
    </div>
  )
}
