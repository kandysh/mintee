"use client"

import { motion } from "framer-motion"
import { FormInput } from "./form-input"
import { FormMultiSelect } from "./form-multi-select"
import { useState, useEffect } from "react"

interface PreferenceFormProps {
  role: "mentor" | "mentee"
  onSave?: (data: any) => void
}

const multiSelectOptions = {
  regions: [
    { value: "north-america", label: "North America" },
    { value: "europe", label: "Europe" },
    { value: "asia-pacific", label: "Asia Pacific" },
    { value: "emea", label: "EMEA" },
  ],
  languages: [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "mandarin", label: "Mandarin" },
    { value: "german", label: "German" },
  ],
  expertise: [
    { value: "technology", label: "Technology" },
    { value: "finance", label: "Finance" },
    { value: "operations", label: "Operations" },
    { value: "hr", label: "HR" },
    { value: "marketing", label: "Marketing" },
  ],
  strengths: [
    { value: "leadership", label: "Leadership" },
    { value: "communication", label: "Communication" },
    { value: "problem-solving", label: "Problem Solving" },
    { value: "strategic-thinking", label: "Strategic Thinking" },
    { value: "mentoring", label: "Mentoring" },
  ],
  availability: [
    { value: "weekdays", label: "Weekdays" },
    { value: "weekends", label: "Weekends" },
    { value: "evenings", label: "Evenings" },
    { value: "flexible", label: "Flexible" },
  ],
  learningGoals: [
    { value: "career-growth", label: "Career Growth" },
    { value: "leadership-dev", label: "Leadership Development" },
    { value: "technical-skills", label: "Technical Skills" },
    { value: "work-life-balance", label: "Work-Life Balance" },
  ],
}

export function PreferenceForm({ role, onSave }: PreferenceFormProps) {
  const [formData, setFormData] = useState({
    regions: [] as string[],
    languages: [] as string[],
    expertise: [] as string[],
    strengths: [] as string[],
    availability: [] as string[],
    learningGoals: [] as string[],
    maxMentees: "5",
    bio: "",
  })

  useEffect(() => {
    const savedPreferences = localStorage.getItem(`${role}Preferences`)
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences)
        setFormData(parsed)
      } catch (e) {
        console.error("Error parsing saved preferences:", e)
      }
    }
  }, [role])

  const handleSave = () => {
    localStorage.setItem(`${role}Preferences`, JSON.stringify(formData))
    onSave?.(formData)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 bg-card p-6 rounded-xl border border-border"
    >
      <FormMultiSelect
        label="Regions / Locations"
        options={multiSelectOptions.regions}
        selected={formData.regions}
        onChange={(regions) => setFormData({ ...formData, regions })}
      />

      <FormMultiSelect
        label="Languages"
        options={multiSelectOptions.languages}
        selected={formData.languages}
        onChange={(languages) => setFormData({ ...formData, languages })}
      />

      {role === "mentor" ? (
        <>
          <FormMultiSelect
            label="Expertise Areas"
            options={multiSelectOptions.expertise}
            selected={formData.expertise}
            onChange={(expertise) => setFormData({ ...formData, expertise })}
          />

          <FormMultiSelect
            label="Strengths"
            options={multiSelectOptions.strengths}
            selected={formData.strengths}
            onChange={(strengths) => setFormData({ ...formData, strengths })}
          />

          <FormInput
            label="Max Mentees"
            type="number"
            value={formData.maxMentees}
            onChange={(value) => setFormData({ ...formData, maxMentees: value })}
            min={1}
            max={10}
          />
        </>
      ) : (
        <>
          <FormMultiSelect
            label="Learning Goals"
            options={multiSelectOptions.learningGoals}
            selected={formData.learningGoals}
            onChange={(learningGoals) => setFormData({ ...formData, learningGoals })}
          />

          <FormMultiSelect
            label="Expertise You Want to Learn"
            options={multiSelectOptions.expertise}
            selected={formData.expertise}
            onChange={(expertise) => setFormData({ ...formData, expertise })}
          />
        </>
      )}

      <FormMultiSelect
        label="Availability"
        options={multiSelectOptions.availability}
        selected={formData.availability}
        onChange={(availability) => setFormData({ ...formData, availability })}
      />

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3 text-foreground">Bio</label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          placeholder="Tell us about yourself..."
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          rows={4}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSave}
        className="w-full px-4 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
      >
        Save Preferences
      </motion.button>
    </motion.div>
  )
}
