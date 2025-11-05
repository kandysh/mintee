"use client"

import { motion } from "framer-motion"
import DashboardLayout from "@/components/dashboard-layout"
import ProfileCard from "@/components/profile-card"
import { useState } from "react"

export default function ProfilePage() {
  const [userRole] = useState<"mentor" | "mentee">("mentor")

  return (
    <DashboardLayout role={userRole}>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-1">Manage your profile information</p>
        </div>
        <ProfileCard role={userRole} />
      </motion.div>
    </DashboardLayout>
  )
}
