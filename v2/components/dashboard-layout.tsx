"use client"

import type React from "react"

import { motion } from "framer-motion"
import Navbar from "./navbar"
import Sidebar from "./sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role: "mentor" | "mentee"
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex">
      <Sidebar role={role} />
      <div className="flex-1 flex flex-col">
        <Navbar role={role} />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1 overflow-auto p-6 lg:p-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
