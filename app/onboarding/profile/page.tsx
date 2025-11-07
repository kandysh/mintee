'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { containerVariants } from '@/lib/animations'
import { ProgressBar } from '@/components/profile-wizard/ProgressBar'
import { StepContent } from '@/components/profile-wizard/StepContent'
import { WizardNavigation } from '@/components/profile-wizard/WizardNavigation'

export default function ProfileWizardPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<string>('')
  const [isHydrated, setIsHydrated] = useState(false)
  const [formData, setFormData] = useState({
    regions: [] as string[],
    languages: [] as string[],
    functions: [] as string[],
    strengths: [] as string[],
    maxMentees: '3',
    additionalInfo: '',
  })

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem('selectedRole')
    if (stored) setRole(stored)
  }, [])

  const handleMultiSelectChange = (field: string, values: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: values }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFinish = () => {
    localStorage.setItem('profileData', JSON.stringify(formData))
  }

  if (!isHydrated) return null

  const multiSelectOptions = {
    regions: [
      { value: 'north-america', label: 'North America' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia-pacific', label: 'Asia Pacific' },
      { value: 'emea', label: 'EMEA' },
    ],
    languages: [
      { value: 'english', label: 'English' },
      { value: 'spanish', label: 'Spanish' },
      { value: 'french', label: 'French' },
      { value: 'mandarin', label: 'Mandarin' },
      { value: 'german', label: 'German' },
    ],
    functions: [
      { value: 'technology', label: 'Technology' },
      { value: 'finance', label: 'Finance' },
      { value: 'operations', label: 'Operations' },
      { value: 'hr', label: 'HR' },
      { value: 'marketing', label: 'Marketing' },
    ],
    strengths: [
      { value: 'leadership', label: 'Leadership' },
      { value: 'communication', label: 'Communication' },
      { value: 'problem-solving', label: 'Problem Solving' },
      { value: 'strategic-thinking', label: 'Strategic Thinking' },
      { value: 'mentoring', label: 'Mentoring' },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-20 px-4">
      <motion.div
        className="max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ProgressBar step={step} totalSteps={4} />
        <StepContent
          step={step}
          multiSelectOptions={multiSelectOptions}
          role={role}
          formData={formData}
          handleInputChange={handleInputChange}
          handleMultiSelectChange={handleMultiSelectChange}
        />
        <WizardNavigation
          step={step}
          totalSteps={4}
          role={role}
          setStep={setStep}
          handleFinish={handleFinish}
        />
      </motion.div>
    </div>
  )
}
