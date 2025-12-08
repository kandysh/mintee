'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { TopBar } from '@/components/top-bar'
import { useRole } from '@/hooks/useRole'
import { rotate, containerVariants, itemVariants } from '@/lib/animations'
import { FormInput } from '@/components/shared/form-input'
import { FormMultiSelect } from '@/components/shared/form-multi-select'
import { FormSelect } from '@/components/shared/form-select'

const gcbLevels = [
  { value: 'gcb1', label: 'GCB 1' },
  { value: 'gcb2', label: 'GCB 2' },
  { value: 'gcb3', label: 'GCB 3' },
  { value: 'gcb4', label: 'GCB 4' },
  { value: 'gcb5', label: 'GCB 5' },
  { value: 'gcb6', label: 'GCB 6' },
]

const gcTenure = [
  { value: '0-2', label: '0-2 years' },
  { value: '3-5', label: '3-5 years' },
  { value: '6-10', label: '6-10 years' },
  { value: '11-15', label: '11-15 years' },
  { value: '16+', label: '16+ years' },
]

const locations = [
  { value: 'hong-kong', label: 'Hong Kong' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'london', label: 'London' },
  { value: 'new-york', label: 'New York' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'paris', label: 'Paris' },
  { value: 'other', label: 'Other' },
]

const languages = [
  { value: 'english', label: 'English' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'cantonese', label: 'Cantonese' },
  { value: 'french', label: 'French' },
  { value: 'spanish', label: 'Spanish' },
  { value: 'arabic', label: 'Arabic' },
  { value: 'other', label: 'Other' },
]

const leadershipExperiences = [
  { value: 'team-lead', label: 'Team Lead' },
  { value: 'manager', label: 'Manager' },
  { value: 'senior-manager', label: 'Senior Manager' },
  { value: 'director', label: 'Director' },
  { value: 'vp', label: 'Vice President' },
  { value: 'c-suite', label: 'C-Suite' },
  { value: 'none', label: 'None' },
]

const additionalExperiences = [
  { value: 'project-management', label: 'Project Management' },
  { value: 'change-management', label: 'Change Management' },
  { value: 'stakeholder-management', label: 'Stakeholder Management' },
  { value: 'mentoring', label: 'Mentoring' },
  { value: 'coaching', label: 'Coaching' },
  { value: 'public-speaking', label: 'Public Speaking' },
  { value: 'strategic-planning', label: 'Strategic Planning' },
]

const businessAreas = [
  { value: 'retail-banking', label: 'Retail Banking' },
  { value: 'commercial-banking', label: 'Commercial Banking' },
  { value: 'wealth-management', label: 'Wealth Management' },
  { value: 'global-markets', label: 'Global Markets' },
  { value: 'technology', label: 'Technology' },
  { value: 'operations', label: 'Operations' },
  { value: 'risk', label: 'Risk' },
  { value: 'compliance', label: 'Compliance' },
  { value: 'hr', label: 'Human Resources' },
  { value: 'finance', label: 'Finance' },
]

export default function ProfilePage() {
  const router = useRouter()
  const { role, isLoading } = useRole()
  const [isHydrated, setIsHydrated] = useState(false)
  const [showOtherLanguage, setShowOtherLanguage] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    gcbLevel: '',
    gcTenure: '',
    location: '',
    languages: [] as string[],
    otherLanguages: '',
    leadershipExperiences: [] as string[],
    additionalExperiences: [] as string[],
    businessArea: '',
  })

  useEffect(() => {
    setIsHydrated(true)
    if (!isLoading && !role) {
      router.push('/select-role')
    }
    
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile)
        setFormData(parsed)
        setShowOtherLanguage(parsed.languages?.includes('other') || false)
      } catch (e) {
        console.error('Error parsing saved profile:', e)
      }
    }
  }, [isLoading, role, router])

  useEffect(() => {
    setShowOtherLanguage(formData.languages.includes('other'))
  }, [formData.languages])

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(formData))
    alert('Profile saved successfully!')
  }

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
    <div className="min-h-screen bg-background">
      <TopBar currentRole={role} />
      <main className="bg-gradient-to-br from-background to-primary/5">
        <motion.div
          className="max-w-4xl mx-auto py-12 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl font-serif font-bold mb-2">Edit Profile</h1>
            <p className="text-muted-foreground">Update your professional information</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-card rounded-xl border border-border p-8 space-y-6"
          >
            <FormInput
              label="Title"
              type="text"
              value={formData.title}
              onChange={(value) => setFormData({ ...formData, title: value })}
              placeholder="e.g., Senior Vice President, Product Manager"
            />

            <FormSelect
              label="GCB Level"
              placeholder="Select GCB Level"
              options={gcbLevels}
              value={formData.gcbLevel}
              onChange={(value) => setFormData({ ...formData, gcbLevel: value })}
            />

            <FormSelect
              label="GC Tenure"
              placeholder="Select Tenure"
              options={gcTenure}
              value={formData.gcTenure}
              onChange={(value) => setFormData({ ...formData, gcTenure: value })}
            />

            <FormSelect
              label="Location"
              placeholder="Select Location"
              options={locations}
              value={formData.location}
              onChange={(value) => setFormData({ ...formData, location: value })}
            />

            <FormMultiSelect
              label="Languages"
              options={languages}
              selected={formData.languages}
              onChange={(selected) => setFormData({ ...formData, languages: selected })}
            />

            {showOtherLanguage && (
              <FormInput
                label="Other Languages"
                type="text"
                value={formData.otherLanguages}
                onChange={(value) => setFormData({ ...formData, otherLanguages: value })}
                placeholder="Enter additional languages (comma separated)"
              />
            )}

            <FormMultiSelect
              label="Leadership Experiences"
              options={leadershipExperiences}
              selected={formData.leadershipExperiences}
              onChange={(selected) => setFormData({ ...formData, leadershipExperiences: selected })}
            />

            <FormMultiSelect
              label="Additional Experiences"
              options={additionalExperiences}
              selected={formData.additionalExperiences}
              onChange={(selected) => setFormData({ ...formData, additionalExperiences: selected })}
            />

            <FormSelect
              label="Business Area"
              placeholder="Select Business Area"
              options={businessAreas}
              value={formData.businessArea}
              onChange={(value) => setFormData({ ...formData, businessArea: value })}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Save Profile
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
