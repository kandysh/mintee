"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TopBar } from "@/components/top-bar"
import MentorDashboard from "@/components/mentor-dashboard"
import MenteeDashboard from "@/components/mentee-dashboard"

export default function DashboardPage() {
  const router = useRouter()
  const [role, setRole] = useState<"mentor" | "mentee" | null>(null)
  const [hasMultipleRoles, setHasMultipleRoles] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedRole = localStorage.getItem("currentRole") as "mentor" | "mentee" | null
    const hasMultiple = localStorage.getItem("hasMultipleRoles") === "true"

    if (!storedRole) {
      router.push("/select-role")
      return
    }

    setRole(storedRole)
    setHasMultipleRoles(hasMultiple)
    setIsLoading(false)
  }, [router])

  if (isLoading || !role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentRole={role} hasMultipleRoles={true} />
      <main className="container mx-auto px-4 py-8">
        {role === "mentor" ? <MentorDashboard /> : <MenteeDashboard />}
      </main>
    </div>
  )
}
