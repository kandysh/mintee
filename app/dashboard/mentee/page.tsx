"use client"

import { motion } from "framer-motion"
import { Star, Search, Settings, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { PreferenceForm } from "@/components/shared/preference-form"
import { TopBar } from "@/components/top-bar"

export default function MenteeDashboardPage() {
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isHydrated, setIsHydrated] = useState(false)
  const [showPreferencesSidebar, setShowPreferencesSidebar] = useState(false)
  const [assignedMentors, setAssignedMentors] = useState([
    { id: 1, name: "John Smith", role: "Senior VP", expertise: ["Leadership", "Strategy"], matchScore: 95 },
    { id: 2, name: "Jennifer Lee", role: "Principal Engineer", expertise: ["Tech", "Career Growth"], matchScore: 88 },
  ])

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem("selectedRole")
    if (stored) setSelectedRole(stored)
  }, [])

  const removeMentor = (id: number) => {
    setAssignedMentors(assignedMentors.filter((m) => m.id !== id))
  }

  // Dummy data
  const suggestedMentors = [
    {
      id: 3,
      name: "Michael Brown",
      role: "Director of Operations",
      expertise: ["Operations", "Management"],
      matchScore: 85,
      rating: 4.9,
    },
    {
      id: 4,
      name: "Lisa Garcia",
      role: "Product Lead",
      expertise: ["Product", "Strategy"],
      matchScore: 82,
      rating: 4.7,
    },
    {
      id: 5,
      name: "David Kumar",
      role: "Tech Lead",
      expertise: ["Engineering", "Architecture"],
      matchScore: 79,
      rating: 4.8,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <TopBar selectedRole={selectedRole} />

      <motion.div
        className="max-w-6xl mx-auto py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header with Edit Preferences */}
        <motion.div variants={itemVariants} className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-2">Welcome back, Jamie</h1>
            <p className="text-lg text-muted-foreground">Continue your learning journey with your mentors</p>
          </div>
          <motion.button
            onClick={() => setShowPreferencesSidebar(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            <Settings className="w-5 h-5" />
            Edit Preferences
          </motion.button>
        </motion.div>

        {/* Assigned Mentors */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-6">Your Mentors</h2>
          <motion.div className="grid md:grid-cols-2 gap-6" variants={containerVariants}>
            {assignedMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold">{mentor.name}</h3>
                    <p className="text-sm text-muted-foreground">{mentor.role}</p>
                  </div>
                  <motion.button
                    onClick={() => removeMentor(mentor.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
                    title="Remove mentor"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((exp) => (
                    <span key={exp} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                      {exp}
                    </span>
                  ))}
                </div>
                <div className="w-full bg-border rounded-full h-2 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${mentor.matchScore}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Suggested Mentors */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-serif font-bold">Find More Mentors</h2>
            <Link href="/matches">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                <Search className="w-4 h-4" />
                Explore All
              </motion.button>
            </Link>
          </div>
          <motion.div className="grid md:grid-cols-3 gap-6" variants={containerVariants}>
            {suggestedMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="mb-4">
                  <h3 className="font-serif font-bold text-lg">{mentor.name}</h3>
                  <p className="text-sm text-muted-foreground">{mentor.role}</p>
                </div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(mentor.rating) ? "fill-secondary text-secondary" : "text-border"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{mentor.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((exp) => (
                    <span key={exp} className="px-2 py-1 rounded text-xs bg-accent/10 text-accent font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Request
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Preferences Sidebar */}
      {showPreferencesSidebar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setShowPreferencesSidebar(false)}
        >
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-background border-l border-border overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif font-bold">Edit Preferences</h2>
                <button
                  onClick={() => setShowPreferencesSidebar(false)}
                  className="p-2 hover:bg-card rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              <PreferenceForm role="mentee" onSave={() => setShowPreferencesSidebar(false)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
