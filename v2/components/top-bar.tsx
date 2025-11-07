"use client"

import { motion } from "framer-motion"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggler } from "./theme-toggler"
import { RoleToggler } from "./role-toggler"

interface TopBarProps {
  currentRole: "mentor" | "mentee"
  hasMultipleRoles: boolean
}

export function TopBar({ currentRole, hasMultipleRoles }: TopBarProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("currentRole")
    router.push("/")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-sm px-6 lg:px-8 py-4 flex items-center justify-between"
    >
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          {currentRole === "mentor" ? "Mentor Dashboard" : "Mentee Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggler />
        <RoleToggler currentRole={currentRole} hasMultipleRoles={hasMultipleRoles} />
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
    </motion.div>
  )
}
