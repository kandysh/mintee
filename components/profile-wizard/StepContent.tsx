'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { containerVariants, itemVariants } from '@/lib/animations'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MultiSelect } from '@/components/ui/multi-select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface StepContentProps {
  step: number
  multiSelectOptions: any
  role: string
  formData: any
  handleInputChange: (field: string, value: string) => void
  handleMultiSelectChange: (field: string, values: string[]) => void;
}

export function StepContent({
  step,
  multiSelectOptions,
  role,
  formData,
  handleInputChange,
  handleMultiSelectChange,
}: StepContentProps) {
  const renderMultiSelect = (field: string, label:string, options: any) => (
    <div className="mb-6">
      <Label className="text-base">{label}</Label>
      <MultiSelect
        options={options}
        selected={formData[field as keyof typeof formData] as string[]}
        onChange={(values) => handleMultiSelectChange(field, values)}
        placeholder={`Select ${label}...`}
      />
    </div>
  )

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-serif">
              {step === 1 && "Where are you located?"}
              {step === 2 && "Tell us about your expertise"}
              {step === 3 && "What are your strengths?"}
              {step === 4 && "Review your profile"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <motion.div variants={itemVariants}>
                {renderMultiSelect("regions", "Regions", multiSelectOptions.regions)}
                {renderMultiSelect("languages", "Languages", multiSelectOptions.languages)}
              </motion.div>
            )}
            {step === 2 && (
                <motion.div variants={itemVariants}>
                    {renderMultiSelect("functions", "Functions / Expertise", multiSelectOptions.functions)}
                </motion.div>
            )}
            {step === 3 && (
              <motion.div variants={itemVariants}>
                {renderMultiSelect("strengths", "Strengths", multiSelectOptions.strengths)}
                {role === 'mentor' && (
                  <div className="mb-6">
                    <Label htmlFor="maxMentees" className="text-base">How many mentees can you take on?</Label>
                    <Select
                        value={formData.maxMentees}
                        onValueChange={(value) => handleInputChange("maxMentees", value)}
                    >
                        <SelectTrigger id="maxMentees" className="w-[180px]">
                            <SelectValue placeholder="Select a number" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(5)].map((_, i) => (
                                <SelectItem key={i+1} value={String(i + 1)}>{i+1}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                  </div>
                )}
              </motion.div>
            )}
            {step === 4 && (
              <motion.div variants={itemVariants}>
                <div className="space-y-4">
                    <div>
                        <Label>Regions</Label>
                        <p className="text-muted-foreground">{formData.regions.join(', ')}</p>
                    </div>
                    <div>
                        <Label>Languages</Label>
                        <p className="text-muted-foreground">{formData.languages.join(', ')}</p>
                    </div>
                    <div>
                        <Label>Functions / Expertise</Label>
                        <p className="text-muted-foreground">{formData.functions.join(', ')}</p>
                    </div>
                    <div>
                        <Label>Strengths</Label>
                        <p className="text-muted-foreground">{formData.strengths.join(', ')}</p>
                    </div>
                    {role === 'mentor' && (
                        <div>
                            <Label>Max Mentees</Label>
                            <p className="text-muted-foreground">{formData.maxMentees}</p>
                        </div>
                    )}
                    <div>
                        <Label htmlFor="additionalInfo">Additional Information</Label>
                        <Textarea
                            id="additionalInfo"
                            value={formData.additionalInfo}
                            onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                            placeholder="Is there anything else you would like to share?"
                        />
                    </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
