'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, Award, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressBar } from '@/components/profile-wizard/ProgressBar'
import { containerVariants, itemVariants } from '@/lib/animations'

function OnboardingIntroduction({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="max-w-3xl mx-auto">
      <ProgressBar step={1} totalSteps={3} />

      <motion.div variants={itemVariants} className="text-center mb-12">
        <h1 className="text-5xl font-serif font-bold mb-4">Let's Get Started</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock your potential through meaningful mentoring relationships
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-3xl font-serif">Onboarding Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: 1, title: 'Choose Your Role', desc: 'Select mentor, mentee, or both' },
                { num: 2, title: 'Build Your Profile', desc: 'Share your expertise and goals' },
                { num: 3, title: 'Find Your Match', desc: 'Connect with the right people' },
              ].map((step) => (
                <Card key={step.num} className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                      <span className="font-serif font-bold text-primary text-lg">{step.num}</span>
                    </div>
                    <CardTitle>{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-end mt-12">
        <Button onClick={onContinue}>
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </motion.div>
    </div>
  )
}

function RoleSelection({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  const [selectedRole, setSelectedRole] = useState<string>('')
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem('selectedRole')
    if (stored) setSelectedRole(stored)
  }, [])

  const handleContinue = () => {
    if (selectedRole) {
      localStorage.setItem('selectedRole', selectedRole)
      onContinue()
    }
  }

  const roles = [
    { id: 'mentor', title: 'Mentor', description: 'Guide and inspire others', icon: <Award className="w-6 h-6 text-primary" /> },
    { id: 'mentee', title: 'Mentee', description: 'Learn and grow with a mentor', icon: <GraduationCap className="w-6 h-6 text-primary" /> },
  ]

  if (!isHydrated) return null

  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar step={2} totalSteps={3} />

      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-serif">What Best Describes You?</CardTitle>
            <p className="text-muted-foreground pt-2">Choose one role to get started.</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`cursor-pointer transition-all h-full text-center p-6 flex flex-col items-center justify-center ${selectedRole === role.id ? 'border-primary ring-2 ring-primary' : 'hover:border-primary/50'}`}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    {role.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{role.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">{role.description}</p>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-between mt-12 gap-4">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </Button>
        {selectedRole && (
          <Link href="/onboarding/profile" onClick={handleContinue}>
            <Button>
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        )}
      </motion.div>
    </div>
  )
}

export default function OnboardingWizard() {
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const handleNext = () => {
    setDirection(1)
    setStep(step + 1)
  }
  const handlePrev = () => {
    setDirection(-1)
    setStep(step - 1)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-20 px-4 relative overflow-x-hidden">
      <AnimatePresence initial={false} custom={direction}>
        {step === 1 && (
          <motion.div
            key={1}
            className="absolute w-full px-4"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}>
            <OnboardingIntroduction onContinue={handleNext} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key={2}
            className="absolute w-full px-4"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}>
            <RoleSelection onContinue={handleNext} onBack={handlePrev} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
