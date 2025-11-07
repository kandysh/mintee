"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, ChevronDown, ArrowLeft } from "lucide-react"
import { PreferenceForm } from "@/components/shared/preference-form"

export default function ProfilePage() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [selectedRole, setSelectedRole] = useState<"mentor" | "mentee">("mentor")
  const [isHydrated, setIsHydrated] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
    const stored = localStorage.getItem("selectedRole")
    if (stored && (stored === "mentor" || stored === "mentee")) {
      setSelectedRole(stored)
    }

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

  const handleRoleChange = (role: "mentor" | "mentee") => {
    setSelectedRole(role)
    localStorage.setItem("selectedRole", role)
  }

  if (!isHydrated) return null

  const profileData = {
    name: "Alex Johnson",
    role: selectedRole === "mentor" ? "Senior VP Strategy" : "Product Manager",
    bio: "Passionate about mentoring and helping others grow in their careers.",
    regions: ["New York", "Remote"],
    languages: ["English", "Spanish"],
    expertise: selectedRole === "mentor" ? ["Leadership", "Strategy", "Tech"] : ["Product", "Strategy", "Analytics"],
    availability: "Weekends",
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

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

            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
                {selectedRole === "mentor" ? "Mentor" : "Mentee"} Profile
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-40 bg-card border border-border rounded-lg shadow-lg hidden group-hover:block z-50">
                <button
                  onClick={() => handleRoleChange("mentor")}
                  className="w-full text-left px-4 py-2 hover:bg-accent/10 transition-colors rounded-t-lg"
                >
                  View Mentor Profile
                </button>
                <button
                  onClick={() => handleRoleChange("mentee")}
                  className="w-full text-left px-4 py-2 hover:bg-accent/10 transition-colors rounded-b-lg"
                >
                  View Mentee Profile
                </button>
              </div>
            </div>

            <Link href={`/dashboard/${selectedRole}`}>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        className="max-w-6xl mx-auto py-12 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile Header */}
        <motion.div variants={itemVariants} className="mb-12">
          <h1 className="text-5xl font-serif font-bold mb-2">{profileData.name}</h1>
          <p className="text-xl text-muted-foreground mb-4">{profileData.role}</p>
          <p className="text-lg text-foreground max-w-2xl">{profileData.bio}</p>
        </motion.div>

        {/* Profile Info Grid */}
        <motion.div className="grid lg:grid-cols-3 gap-8 mb-12" variants={containerVariants}>
          {/* Info Cards */}
          <motion.div variants={itemVariants} className="lg:col-span-1 rounded-xl bg-card border border-border p-8">
            <h2 className="text-xl font-serif font-bold mb-6">Information</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-foreground">Regions</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.regions.map((region) => (
                    <span
                      key={region}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">
                  {selectedRole === "mentor" ? "Expertise" : "Learning Focus"}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-foreground">Availability</h3>
                <p className="text-muted-foreground">{profileData.availability}</p>
              </div>
            </div>
          </motion.div>

          {/* Edit Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-serif font-bold">Edit Profile</h2>
              <p className="text-muted-foreground mt-1">Update your preferences and information</p>
            </div>
            <PreferenceForm role={selectedRole} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
