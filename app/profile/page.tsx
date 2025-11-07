'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PreferenceForm } from '@/components/shared/preference-form'
import { TopBar } from '@/components/top-bar'
import { useRole } from '@/hooks/useRole'
import { rotate, containerVariants, itemVariants } from '@/lib/animations'

export default function ProfilePage() {
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

  const profileData = {
    name: 'Alex Johnson',
    role: role === 'mentor' ? 'Senior VP Strategy' : 'Product Manager',
    bio: 'Passionate about mentoring and helping others grow in their careers.',
    regions: ['New York', 'Remote'],
    languages: ['English', 'Spanish'],
    expertise: role === 'mentor' ? ['Leadership', 'Strategy', 'Tech'] : ['Product', 'Strategy', 'Analytics'],
    availability: 'Weekends',
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentRole={role} />
      <main className="bg-gradient-to-br from-background to-primary/5">
        <motion.div
          className="max-w-6xl mx-auto py-12 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-5xl font-serif font-bold mb-2">{profileData.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">{profileData.role}</p>
            <p className="text-lg text-foreground max-w-2xl">{profileData.bio}</p>
          </motion.div>

          <motion.div className="grid lg:grid-cols-3 gap-8 mb-12" variants={containerVariants}>
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 rounded-xl bg-card border border-border p-8"
            >
              <h2 className="text-xl font-serif font-bold mb-6">Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Regions</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.regions.map((region) => (
                      <span
                        key={region}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                      >
                        {region}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((lang) => (
                      <span
                        key={lang}
                        className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    {role === 'mentor' ? 'Expertise' : 'Learning Focus'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.expertise.map((exp) => (
                      <span
                        key={exp}
                        className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Availability</h3>
                  <p className="text-muted-foreground">{profileData.availability}</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-serif font-bold">Edit Profile</h2>
                <p className="text-muted-foreground mt-1">Update your preferences and information</p>
              </div>
              <PreferenceForm role={role} />
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
