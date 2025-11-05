"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import ProfileEditor from "@/components/profile-editor"

export default function ProfileEditPage() {
  const [userRole] = useState<"mentor" | "mentee">("mentor")

  return (
    <DashboardLayout role={userRole}>
      <ProfileEditor role={userRole} />
    </DashboardLayout>
  )
}
