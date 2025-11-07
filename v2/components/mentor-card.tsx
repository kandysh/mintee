"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

interface MentorCardProps {
  mentor: {
    id: number
    name: string
    title: string
    region: string
    gcb: string[]
    expertise: string[]
    yearsExperience: number
    bio: string
    avatar: string
  }
  onClick: () => void
}

export default function MentorCard({ mentor, onClick }: MentorCardProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left h-full"
    >
      <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/30 hover:border-primary/30 hover:shadow-lg transition-all h-full flex flex-col gap-4 group">
        {/* Avatar & Basic Info */}
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0 group-hover:shadow-md group-hover:shadow-primary/30 transition-all">
            <span className="text-white font-bold text-lg">{mentor.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate">{mentor.name}</h3>
            <p className="text-sm text-primary truncate">{mentor.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{mentor.region}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-foreground transition-colors">
          {mentor.bio}
        </p>

        {/* Expertise Tags */}
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.slice(0, 2).map((exp, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
            >
              {exp}
            </Badge>
          ))}
        </div>

        {/* Stats Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/30 mt-auto">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">4.8</span>
          </div>
          <span className="text-xs text-muted-foreground">{mentor.yearsExperience}+ years exp.</span>
        </div>
      </div>
    </motion.button>
  )
}
