"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { ChevronRight, Plus, X } from "lucide-react"

interface ProfileEditorProps {
  role: "mentor" | "mentee"
}

export default function ProfileEditor({ role }: ProfileEditorProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [skills, setSkills] = useState(
    role === "mentor"
      ? ["Product Strategy", "Data Analytics", "Team Leadership"]
      : ["UI Design", "Prototyping", "User Research"],
  )

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6 max-w-2xl">
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold text-foreground">Edit Profile</h1>
        <p className="text-muted-foreground mt-1">Update your profile information and preferences</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30 border border-border/50 rounded-lg p-1">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">{role === "mentor" ? "Expertise" : "Goals"}</TabsTrigger>
            <TabsTrigger value="location">Location & Links</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
                <CardHeader>
                  <CardTitle>About You</CardTitle>
                  <CardDescription>Tell us about yourself</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input
                      defaultValue={role === "mentor" ? "Sarah Johnson" : "Alex Chen"}
                      className="mt-2 bg-background border-border/50 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Title</label>
                    <Input
                      defaultValue={role === "mentor" ? "Senior Product Manager" : "Design Student"}
                      className="mt-2 bg-background border-border/50 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Bio</label>
                    <Textarea
                      defaultValue={
                        role === "mentor"
                          ? "Passionate about building products that matter. 8 years in product management across startups and scale-ups."
                          : "Aspiring product designer eager to learn and grow in the field."
                      }
                      className="mt-2 bg-background border-border/50 focus-visible:ring-primary/50 resize-none"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Skills/Goals Tab */}
          <TabsContent value="skills" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
                <CardHeader>
                  <CardTitle>{role === "mentor" ? "Expertise Areas" : "Learning Goals"}</CardTitle>
                  <CardDescription>
                    {role === "mentor" ? "What are you expert in?" : "What do you want to learn?"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder={role === "mentor" ? "Add expertise area..." : "Add learning goal..."}
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                      className="bg-background border-border/50 focus-visible:ring-primary/50"
                    />
                    <Button
                      onClick={handleAddSkill}
                      className="gap-2 whitespace-nowrap bg-transparent"
                      variant="outline"
                    >
                      <Plus className="w-4 h-4" />
                      Add
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium text-muted-foreground">
                      {skills.length > 0 ? "Your items" : "No items yet"}
                    </p>
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: {
                          transition: { staggerChildren: 0.05 },
                        },
                      }}
                    >
                      {skills.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Badge className="bg-primary/20 text-primary hover:bg-primary/30 gap-2 pr-1 py-1 pl-3">
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(idx)}
                              className="hover:text-primary/80 transition-colors ml-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Location & Links Tab */}
          <TabsContent value="location" className="space-y-4">
            <motion.div variants={itemVariants}>
              <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
                <CardHeader>
                  <CardTitle>Location & Links</CardTitle>
                  <CardDescription>Where are you located and how to reach you?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">Region</label>
                    <Input
                      defaultValue={role === "mentor" ? "San Francisco, CA" : "New York, NY"}
                      className="mt-2 bg-background border-border/50 focus-visible:ring-primary/50"
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Email</label>
                    <Input
                      defaultValue={role === "mentor" ? "sarah@example.com" : "alex@example.com"}
                      type="email"
                      className="mt-2 bg-background border-border/50 focus-visible:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">LinkedIn URL</label>
                    <Input
                      defaultValue={role === "mentor" ? "linkedin.com/in/sarahjohnson" : "linkedin.com/in/alexchen"}
                      className="mt-2 bg-background border-border/50 focus-visible:ring-primary/50"
                      placeholder="Your LinkedIn profile"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="flex gap-3">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30"
        >
          {isSaving ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Saving...
            </>
          ) : (
            <>
              <ChevronRight className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
        <Button variant="outline" className="border-border/50 hover:bg-muted transition-colors bg-transparent">
          Cancel
        </Button>
      </motion.div>
    </motion.div>
  )
}
