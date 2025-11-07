'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

interface PreferenceFormProps {
  role: 'mentor' | 'mentee'
  onSave: () => void
}

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

export function PreferenceForm({ role, onSave }: PreferenceFormProps) {
  const [formData, setFormData] = useState({
    regions: [] as string[],
    languages: [] as string[],
    functions: [] as string[],
    strengths: [] as string[],
  })
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem('profileData')
    if (stored) {
      const storedData = JSON.parse(stored)
      setFormData({
        regions: storedData.regions || [],
        languages: storedData.languages || [],
        functions: storedData.functions || [],
        strengths: storedData.strengths || [],
      })
    }
  }, [])

  const handleMultiSelectChange = (field: string, values: string[]) => {
    setFormData((prev) => ({ ...prev, [field]: values }))
  }

  const handleSave = () => {
    localStorage.setItem('profileData', JSON.stringify(formData))
    onSave()
  }

  const renderMultiSelect = (field: string, label: string, options: any) => (
    <div className="mb-4">
      <Label className="text-base font-semibold">{label}</Label>
      <MultiSelect
        options={options}
        selected={formData[field as keyof typeof formData] as string[]}
        onChange={(values) => handleMultiSelectChange(field, values)}
        placeholder={`Select ${label}...`}
        className="mt-2"
      />
    </div>
  )

  if (!isHydrated) {
    return null
  }

  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">
          {role === 'mentor' ? 'Mentee Preferences' : 'Mentor Preferences'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {renderMultiSelect('regions', 'Regions', multiSelectOptions.regions)}
          {renderMultiSelect('languages', 'Languages', multiSelectOptions.languages)}
          {renderMultiSelect('functions', 'Business Functions', multiSelectOptions.functions)}
          {role === 'mentee' &&
            renderMultiSelect('strengths', 'Strengths to Develop', multiSelectOptions.strengths)}
          {role === 'mentor' &&
            renderMultiSelect('strengths', 'Strengths to Offer', multiSelectOptions.strengths)}
        </div>
        <Button onClick={handleSave} className="w-full mt-8">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  )
}
