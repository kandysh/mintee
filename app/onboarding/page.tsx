'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressBar } from '@/components/profile-wizard/ProgressBar'
import { containerVariants, itemVariants } from '@/lib/animations'

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-20 px-4">
      <motion.div
        className="max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
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
          <Link href="/onboarding/role">
            <Button>
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
