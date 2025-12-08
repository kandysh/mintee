"use client"

import { motion } from "framer-motion"
import { Search, MapPin, Languages, X } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { PreferenceForm } from "@/components/shared/preference-form"
import { TopBar } from "@/components/top-bar"
import { DashboardHeader } from "@/components/dashboard-header"

export default function MenteeDashboardPage() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [showPreferencesSidebar, setShowPreferencesSidebar] = useState(false)
  const [assignedMentors, setAssignedMentors] = useState([
    { 
      id: 1, 
      name: "John Smith", 
      title: "Senior VP of Product", 
      expertise: ["Leadership", "Strategy"],
      location: "North America",
      languages: ["English", "French"],
      matchScore: 95 
    },
    { 
      id: 2, 
      name: "Jennifer Lee", 
      title: "Principal Engineer", 
      expertise: ["Tech", "Career Growth"],
      location: "Asia Pacific",
      languages: ["English", "Korean", "Mandarin"],
      matchScore: 88 
    },
  ])

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const removeMentor = (id: number) => {
    setAssignedMentors(assignedMentors.filter((m) => m.id !== id))
  }

  const suggestedMentors = [
    {
      id: 3,
      name: "Michael Brown",
      title: "Director of Operations",
      expertise: ["Operations", "Management"],
      location: "Europe",
      languages: ["English", "Spanish"],
      matchScore: 85
    },
    {
      id: 4,
      name: "Lisa Garcia",
      title: "Product Lead",
      expertise: ["Product", "Strategy"],
      location: "North America",
      languages: ["English", "Spanish", "Portuguese"],
      matchScore: 82
    },
    {
      id: 5,
      name: "David Kumar",
      title: "Tech Lead",
      expertise: ["Engineering", "Architecture"],
      location: "Asia Pacific",
      languages: ["English", "Hindi"],
      matchScore: 79
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
      <TopBar />

      <motion.div
        className="max-w-6xl mx-auto py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <DashboardHeader
          title="Welcome back, Jamie"
          subtitle="Continue your learning journey with your mentors"
          onEditPreferences={() => setShowPreferencesSidebar(true)}
        />

        {/* Assigned Mentors */}
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-3xl font-serif font-bold mb-6">Your Mentors</h2>
          {assignedMentors.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="inline-block p-4 rounded-full bg-muted/50 mb-4">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No mentors yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't connected with any mentors yet. Explore our mentor matches below to find the perfect guide for your journey.
              </p>
              <Link href="/matches">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Find Mentors
                </motion.button>
              </Link>
            </div>
          ) : (
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
                      <p className="text-sm text-muted-foreground mb-3">{mentor.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{mentor.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Languages className="w-4 h-4" />
                          <span>{mentor.languages.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => removeMentor(mentor.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
                      title="Remove mentor"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map((exp) => (
                      <span key={exp} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {exp}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Match Score</span>
                    <span className="text-sm font-semibold text-primary">{mentor.matchScore}%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
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
          )}
        </motion.div>

        {/* Suggested Mentors */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-serif font-bold">Find More Mentors</h2>
            <Link href="/matches">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2 p-2 rounded-lg hover:bg-muted transition-colors font-semibold hover:shadow-lg transition-all text-sm"
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
                  <p className="text-sm text-muted-foreground mb-3">{mentor.title}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mentor.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Languages className="w-4 h-4" />
                    <span>{mentor.languages.join(", ")}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((exp) => (
                    <span key={exp} className="px-2 py-1 rounded text-xs bg-accent/10 text-accent font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Match Score</span>
                  <span className="text-sm font-semibold text-primary">{mentor.matchScore}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${mentor.matchScore}%` }}
                    transition={{ duration: 1 }}
                  />
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
