"use client"

import { Award } from "lucide-react"
import { useState } from "react"

interface Mentee {
  id: string
  name: string
  field: string
  goals: string[]
  bio: string
  image: string
  experience: string
}

interface MenteeCardProps {
  mentee: Mentee
  isSelected: boolean
  onSelect: (mentee: Mentee) => void
}

export default function MenteeCard({ mentee, isSelected, onSelect }: MenteeCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      onClick={() => onSelect(mentee)}
      className={`w-full overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
        isSelected
          ? "border-secondary bg-gradient-to-br from-secondary/10 to-accent/10 shadow-lg shadow-secondary/20"
          : "border-border bg-card hover:border-secondary/50 hover:shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-6">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? "opacity-100" : ""}`}
        />

        {/* Content */}
        <div className="relative flex gap-4">
          {/* Avatar */}
          <div className={`relative flex-shrink-0 transition-transform duration-300 ${isHovered ? "scale-105" : ""}`}>
            <div
              className={`h-16 w-16 overflow-hidden rounded-xl border-2 ${isSelected ? "border-secondary" : "border-border"}`}
            >
              <img src={mentee.image || "/placeholder.svg"} alt={mentee.name} className="h-full w-full object-cover" />
            </div>
            {isSelected && (
              <div className="absolute -right-1 -top-1 h-5 w-5 animate-pulse-ring rounded-full bg-secondary" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-left">
            <h3 className="font-bold text-foreground">{mentee.name}</h3>
            <p className="text-sm text-secondary">{mentee.field}</p>

            {/* Goals tags */}
            <div className="mt-3 flex flex-wrap gap-2">
              {mentee.goals.slice(0, 2).map((goal, i) => (
                <span
                  key={i}
                  className="inline-block rounded-full bg-secondary/10 px-2 py-1 text-xs font-medium text-secondary"
                >
                  {goal}
                </span>
              ))}
            </div>

            {/* Experience level */}
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Award className="h-3.5 w-3.5" />
              <span className="font-medium">{mentee.experience}</span>
            </div>
          </div>

          {/* Selection indicator */}
          {isSelected && (
            <div className="flex h-full items-center">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary">
                <svg
                  className="h-4 w-4 text-secondary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
