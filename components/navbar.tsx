"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Bell } from "lucide-react"

interface NavbarProps {
  role: "mentor" | "mentee"
}

export default function Navbar({ role }: NavbarProps) {
  const userName = role === "mentor" ? "Sarah Johnson" : "Alex Chen"
  const userAvatar = role === "mentor" ? "SJ" : "AC"

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-border/50 bg-background/80 backdrop-blur-sm px-6 lg:px-8 py-4 flex items-center justify-between"
    >
      <h1 className="text-xl font-semibold text-foreground">
        {role === "mentor" ? "Mentor Dashboard" : "Mentee Dashboard"}
      </h1>
      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </motion.button>
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
            <AvatarImage src={`https://avatar.vercel.sh/${userAvatar}`} alt={userName} />
            <AvatarFallback>{userAvatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
