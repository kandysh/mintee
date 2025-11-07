"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { TopBar } from "@/components/top-bar"
import MentorDashboard from "@/components/mentor-dashboard"
import MenteeDashboard from "@/components/mentee-dashboard"
import { rotate } from "@/lib/animations"
import { useRole } from "@/hooks/useRole"

export default function DashboardPage() {
  const router = useRouter()
  const { role, hasMultipleRoles, isLoading } = useRole()

  useEffect(() => {
    if (!isLoading && !role) {
      router.push("/select-role")
    }
  }, [isLoading, role, router])

  if (isLoading || !role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          variants={rotate}
          animate="animate"
        >
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar currentRole={role} hasMultipleRoles={hasMultipleRoles} />
      <main className="container mx-auto px-4 py-8">
        {role === "mentor" ? <MentorDashboard /> : <MenteeDashboard />}
      </main>
    </div>
  )
}
