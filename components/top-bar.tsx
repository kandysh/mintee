"use client"

import { motion } from "framer-motion"
import { LogOut, ChevronDown, Moon, Sun } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from 'react'

interface TopBarProps {
  selectedRole: string;
}

export function TopBar({ selectedRole }: TopBarProps) {
  const router = useRouter()
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
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

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("currentRole")
    router.push("/")
  }

  if (!isHydrated) return null

  return (
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
          <Link href="/profile">
            <button className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
              View Profile
            </button>
          </Link>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-destructive hover:bg-destructive/10"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}