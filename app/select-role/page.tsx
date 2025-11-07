"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Users } from "lucide-react"
import {
  fadeInUp,
  containerVariants,
  itemVariants,
  springIn,
} from "@/lib/animations"

export default function SelectRolePage() {
  const [selectedRole, setSelectedRole] = useState<"mentor" | "mentee" | null>(null)
  const router = useRouter()

  const handleContinue = () => {
    if (selectedRole) {
      // Store role(s) - support both single and multiple roles
      localStorage.setItem("userRole", selectedRole)
      localStorage.setItem("currentRole", selectedRole)
      localStorage.setItem("hasMultipleRoles", "true") // In future, support actual multi-select
      router.push("/dashboard")
    }
  }

  const roles = [
    {
      id: "mentor",
      title: "Become a Mentor",
      description: "Share your expertise and guide the next generation",
      icon: BookOpen,
      color: "from-primary to-primary/60",
      benefits: ["Share knowledge", "Build reputation", "Impact others"],
    },
    {
      id: "mentee",
      title: "Find a Mentor",
      description: "Learn from experienced professionals and accelerate your growth",
      icon: Users,
      color: "from-accent to-accent/60",
      benefits: ["Learn faster", "Get guidance", "Network globally"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5 px-4 py-20">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-foreground mb-4"
            variants={fadeInUp}
          >
            Choose Your Path
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground"
            variants={fadeInUp}
          >
            Tell us how you'd like to grow with MentorHub
          </motion.p>
        </div>

        {/* Role cards grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {roles.map((role, index) => {
            const Icon = role.icon
            const isSelected = selectedRole === role.id

            return (
              <motion.div
                key={role.id}
                variants={itemVariants}
              >
                <button
                  onClick={() => setSelectedRole(role.id as "mentor" | "mentee")}
                  className={`w-full h-full text-left transition-all duration-300 ${
                    isSelected ? "scale-105" : "hover:scale-102"
                  }`}
                >
                  <div
                    className={`p-8 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-accent bg-gradient-to-br from-card to-accent/10 shadow-xl"
                        : "border-border bg-card hover:border-accent/50 shadow-md hover:shadow-lg"
                    }`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title and description */}
                    <h2 className="text-2xl font-bold text-foreground mb-2">{role.title}</h2>
                    <p className="text-muted-foreground mb-6">{role.description}</p>

                    {/* Benefits */}
                    <ul className="space-y-2">
                      {role.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    {/* Selection indicator */}
                    {isSelected && (
                      <motion.div
                        className="absolute top-4 right-4 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                        variants={springIn}
                        initial="hidden"
                        animate="visible"
                      >
                        <svg className="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </div>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Continue button */}
        <motion.div
          className="flex justify-center"
          variants={itemVariants}
        >
          <button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              selectedRole
                ? "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:scale-105 cursor-pointer"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
            }`}
          >
            Continue to Dashboard
          </button>
        </motion.div>
      </motion.div>
    </div>
  )
}
