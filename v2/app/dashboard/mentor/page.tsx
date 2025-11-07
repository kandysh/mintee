"use client"

import { motion } from "framer-motion"
import { MessageSquare, Users, TrendingUp, Eye, Moon, Sun, ChevronDown, Settings, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { PreferenceForm } from "@/components/shared/preference-form" // Fixed import path for PreferenceForm component

export default function MentorDashboardPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [selectedRole, setSelectedRole] = useState<string>("")
  const [isHydrated, setIsHydrated] = useState(false)
  const [showPreferencesSidebar, setShowPreferencesSidebar] = useState(false)
  const [mentees, setMentees] = useState([
    { id: 1, name: "Sarah Johnson", role: "Product Manager", joinDate: "2 weeks ago" },
    { id: 2, name: "Marcus Chen", role: "Software Engineer", joinDate: "1 month ago" },
    { id: 3, name: "Alex Rodriguez", role: "Designer", joinDate: "3 weeks ago" },
  ])

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem("selectedRole")
    if (stored) setSelectedRole(stored)

    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const currentTheme = storedTheme || (prefersDark ? "dark" : "light")
    setTheme(currentTheme)
    document.documentElement.classList.toggle("dark", currentTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleRoleChange = (role: string) => {
    if (role === "mentor") {
      window.location.href = "/dashboard/mentor"
    } else if (role === "mentee") {
      window.location.href = "/dashboard/mentee"
    }
  }

  const removeMentee = (id: number) => {
    setMentees(mentees.filter((m) => m.id !== id))
  }

  // Dummy data
  const pendingRequests = [
    { id: 1, name: "Emma Wilson", role: "Business Analyst", message: "Wants to learn about leadership" },
    { id: 2, name: "David Park", role: "Developer", message: "Interested in career growth" },
  ]

  const stats = [
    { label: "Active Mentees", value: `${mentees.length} / 5`, icon: Users },
    { label: "Profile Views", value: "24", icon: Eye },
    { label: "Rating", value: "4.8 / 5", icon: TrendingUp },
  ]

  const userPreferences = {
    expertise: ["Leadership", "Strategy", "Tech"],
    locations: ["New York", "Remote"],
    languages: ["English", "Spanish"],
    availability: "Weekends",
    maxMentees: 5,
  }

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
      {/* Top Bar */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-serif font-bold">MentorHub</h1>
          </Link>
          <div className="flex items-center justify-end gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-border hover:bg-card transition-colors"
              title="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {selectedRole === "both" && (
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
                  Switch Role
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-32 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block z-50">
                  <button
                    onClick={() => handleRoleChange("mentor")}
                    className="w-full text-left px-4 py-2 hover:bg-accent/10 transition-colors rounded-t-lg"
                  >
                    Mentor
                  </button>
                  <button
                    onClick={() => handleRoleChange("mentee")}
                    className="w-full text-left px-4 py-2 hover:bg-accent/10 transition-colors rounded-b-lg"
                  >
                    Mentee
                  </button>
                </div>
              </div>
            )}

            <Link href="/profile">
              <button className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
                View Profile
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-5xl font-serif font-bold mb-2">Welcome back, Alex</h1>
            <p className="text-lg text-muted-foreground">You're making a difference in others' careers</p>
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

        {/* Stats */}
        <motion.div className="grid md:grid-cols-3 gap-6 mb-12" variants={containerVariants}>
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-3xl font-serif font-bold">{stat.value}</p>
                  </div>
                  <Icon className="w-6 h-6 text-primary opacity-50" />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main content grid */}
        <motion.div className="grid lg:grid-cols-2 gap-8" variants={containerVariants}>
          {/* Active Mentees */}
          <motion.div variants={itemVariants} className="rounded-xl bg-card border border-border p-8">
            <h2 className="text-2xl font-serif font-bold mb-6">Active Mentees</h2>
            <div className="space-y-4">
              {mentees.map((mentee) => (
                <motion.div
                  key={mentee.id}
                  whileHover={{ x: 4 }}
                  className="p-4 rounded-lg bg-background border border-border hover:border-primary/50 transition-all flex items-start justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{mentee.name}</h3>
                    <p className="text-sm text-muted-foreground">{mentee.role}</p>
                    <p className="text-xs text-muted-foreground mt-1">Joined {mentee.joinDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                    >
                      <MessageSquare className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => removeMentee(mentee.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
                      title="Remove mentee"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pending Requests */}
          <motion.div variants={itemVariants} className="rounded-xl bg-card border border-border p-8">
            <h2 className="text-2xl font-serif font-bold mb-6">Pending Requests</h2>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <motion.div key={request.id} className="p-4 rounded-lg bg-background border border-border">
                  <div className="mb-3">
                    <h3 className="font-semibold text-foreground">{request.name}</h3>
                    <p className="text-sm text-muted-foreground">{request.role}</p>
                    <p className="text-sm text-muted-foreground mt-2">{request.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                    >
                      Approve
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 px-3 py-2 border border-border text-foreground rounded-lg text-sm font-semibold hover:bg-background transition-all"
                    >
                      Decline
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
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

              <PreferenceForm role="mentor" onSave={() => setShowPreferencesSidebar(false)} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
