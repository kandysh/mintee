'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, Award, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressBar } from '@/components/profile-wizard/ProgressBar'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function RoleSelectionPage() {
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
    }
  }

  const roles = [
    {
      id: 'mentor',
      title: 'Mentor',
      description: 'Guide and inspire the next generation of professionals',
      icon: <Award className="w-6 h-6 text-primary" />,
    },
    {
      id: 'mentee',
      title: 'Mentee',
      description: 'Learn and grow from experienced industry leaders',
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
    },
  ]

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-20 px-4">
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
            <Link href="/onboarding">
                <Button variant="outline">
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back
                </Button>
            </Link>
            {selectedRole && (
              <Link href="/onboarding/profile" onClick={handleContinue}>
                <Button>
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
        </motion.div>
      </motion.div>
    </div>
  )
}
