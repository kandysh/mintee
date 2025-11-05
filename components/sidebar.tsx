"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Users, Briefcase, Settings, LogOut } from "lucide-react"

interface SidebarProps {
  role: "mentor" | "mentee"
}

export default function Sidebar({ role }: SidebarProps) {
  const menuItems =
    role === "mentor"
      ? [
          { label: "Dashboard", icon: Briefcase, href: "/" },
          { label: "My Profile", icon: Users, href: "/profile" },
          { label: "Settings", icon: Settings, href: "/settings" },
        ]
      : [
          { label: "Dashboard", icon: Briefcase, href: "/" },
          { label: "Find Mentors", icon: Users, href: "/mentors" },
          { label: "My Profile", icon: Users, href: "/profile" },
        ]

  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="hidden md:flex flex-col w-64 bg-background/50 border-r border-border/50 backdrop-blur-sm p-6 gap-8"
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
          <span className="text-white font-bold text-lg">M</span>
        </div>
        <h1 className="text-xl font-bold">MentorHub</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted transition-all group"
            >
              <item.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>
    </motion.div>
  )
}
