"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { BookOpen, Users } from "lucide-react"

interface RoleTogglerProps {
  currentRole: "mentor" | "mentee"
  hasMultipleRoles: boolean
}

export function RoleToggler({ currentRole, hasMultipleRoles }: RoleTogglerProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  if (!hasMultipleRoles) {
    return null
  }

  const roles = [
    { id: "mentor", label: "Mentor", icon: BookOpen },
    { id: "mentee", label: "Mentee", icon: Users },
  ]

  const handleRoleChange = (role: "mentor" | "mentee") => {
    if (role !== currentRole) {
      localStorage.setItem("currentRole", role)
      setIsOpen(false)
      router.push("/dashboard")
    }
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium"
      >
        {currentRole === "mentor" ? <BookOpen className="w-4 h-4" /> : <Users className="w-4 h-4" />}
        <span className="capitalize">{currentRole}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden"
            >
              {roles.map((role) => {
                const Icon = role.icon
                const isActive = role.id === currentRole

                return (
                  <motion.button
                    key={role.id}
                    onClick={() => handleRoleChange(role.id as "mentor" | "mentee")}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                      isActive ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                    whileHover={{ x: 4 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{role.label}</span>
                    {isActive && <span className="ml-auto text-primary">✓</span>}
                  </motion.button>
                )
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
