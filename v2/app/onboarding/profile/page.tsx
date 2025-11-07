"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, ChevronLeft } from "lucide-react"
import { MultiSelect } from "@/components/ui/multi-select"

export default function ProfileWizardPage() {
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<string>("")
  const [isHydrated, setIsHydrated] = useState(false)
  const [formData, setFormData] = useState({
    regions: [] as string[],
    languages: [] as string[],
    functions: [] as string[],
    strengths: [] as string[],
    maxMentees: "3",
    additionalInfo: "",
  })

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem("selectedRole")
    if (stored) setRole(stored)
  }, [])

  const handleMultiSelectChange = (field: string, values: string[]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: values,
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFinish = () => {
    localStorage.setItem("profileData", JSON.stringify(formData))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (!isHydrated) return null

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
    functions: [
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
  }

  const renderMultiSelect = (field: string, options: typeof multiSelectOptions.regions) => (
    <motion.div variants={itemVariants} className="mb-6">
      <label className="block text-sm font-semibold mb-3 text-foreground capitalize">
        {field === "regions" && "Regions"}
        {field === "languages" && "Languages"}
        {field === "functions" && "Functions / Expertise"}
        {field === "strengths" && "Strengths"}
      </label>
      <MultiSelect
        options={options}
        selected={formData[field as keyof typeof formData] as string[]}
        onChange={(values) => handleMultiSelectChange(field, values)}
        placeholder={`Select ${field}...`}
      />
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-20 px-4">
      <motion.div className="max-w-2xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Progress */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`h-1 w-8 rounded-full ${s <= step ? "bg-primary" : "bg-border"}`} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Step content */}
        <motion.div variants={containerVariants}>
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="text-4xl font-serif font-bold">
              {step === 1 && "Where are you located?"}
              {step === 2 && "Tell us about your expertise"}
              {step === 3 && "What are your strengths?"}
              {step === 4 && "Review your profile"}
            </h1>
          </motion.div>

          {/* Step 1: Location & Languages */}
          {step === 1 && (
            <motion.div variants={containerVariants}>
              {renderMultiSelect("regions", multiSelectOptions.regions)}
              {renderMultiSelect("languages", multiSelectOptions.languages)}
            </motion.div>
          )}

          {/* Step 2: Professional Info */}
          {step === 2 && (
            <motion.div variants={containerVariants}>
              {renderMultiSelect("functions", multiSelectOptions.functions)}
            </motion.div>
          )}

          {/* Step 3: Strengths */}
          {step === 3 && (
            <motion.div variants={containerVariants}>
              {renderMultiSelect("strengths", multiSelectOptions.strengths)}
              {role === "mentor" && (
                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-sm font-semibold mb-3">Max Mentees</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.maxMentees}
                    onChange={(e) => handleInputChange("maxMentees", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <motion.div variants={containerVariants} className="space-y-4">
              <motion.div variants={itemVariants} className="p-4 rounded-lg bg-card border border-border">
                <h3 className="font-semibold mb-3 text-foreground">Selected Information</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Regions: {formData.regions.join(", ") || "None"}</p>
                  <p>Languages: {formData.languages.join(", ") || "None"}</p>
                  <p>Functions: {formData.functions.join(", ") || "None"}</p>
                  <p>Strengths: {formData.strengths.join(", ") || "None"}</p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold mb-2 text-foreground">Additional Information</label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                  placeholder="Tell us more about yourself..."
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation buttons */}
        <motion.div variants={itemVariants} className="flex justify-between mt-12 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground hover:bg-card disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </motion.button>

          {step < 4 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all ml-auto"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <Link href={`/dashboard/${role}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFinish}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Finish Setup
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
