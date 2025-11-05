"use client"

import { Heart, Zap, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface Mentor {
  id: string
  name: string
  title: string
  expertise: string[]
  bio: string
  image: string
  rating: number
  mentees: number
}

interface Mentee {
  id: string
  name: string
  field: string
  goals: string[]
  bio: string
  image: string
  experience: string
}

interface ConnectionFlowProps {
  mentor: Mentor
  mentee: Mentee
  matched: boolean
  onMatch: () => void
}

export default function ConnectionFlow({ mentor, mentee, matched, onMatch }: ConnectionFlowProps) {
  const [showAnalysis, setShowAnalysis] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowAnalysis(true), 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      {/* Connection Visualization */}
      <div className="animate-fade-in-up rounded-3xl border border-border bg-gradient-to-br from-card to-muted p-8 md:p-12">
        <div className="mb-8 grid gap-8 md:grid-cols-3 md:items-center">
          {/* Mentor */}
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-primary shadow-lg shadow-primary/30">
                <img
                  src={mentor.image || "/placeholder.svg"}
                  alt={mentor.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground">{mentor.name}</h3>
              <p className="text-sm text-primary">{mentor.title}</p>
            </div>
          </div>

          {/* Connection indicator */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary md:h-32 md:w-1">
              <div
                className={`absolute inset-0 animate-connection-line bg-gradient-to-r from-primary via-accent to-secondary ${matched ? "opacity-100" : "opacity-0"}`}
              />
            </div>
            <div
              className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
                matched ? "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30" : "bg-muted"
              }`}
            >
              {matched ? (
                <>
                  <CheckCircle className="h-5 w-5 text-primary-foreground" />
                  <span className="font-bold text-primary-foreground">Matched!</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 text-accent animate-pulse" />
                  <span className="font-semibold text-foreground">Analyzing...</span>
                </>
              )}
            </div>
          </div>

          {/* Mentee */}
          <div className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="relative h-24 w-24 overflow-hidden rounded-2xl border-2 border-secondary shadow-lg shadow-secondary/30">
                <img
                  src={mentee.image || "/placeholder.svg"}
                  alt={mentee.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground">{mentee.name}</h3>
              <p className="text-sm text-secondary">{mentee.field}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compatibility Analysis */}
      {showAnalysis && (
        <div className="animate-fade-in-up space-y-4">
          <h2 className="text-xl font-bold text-foreground">Compatibility Analysis</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Expertise Match",
                description: "Sarah specializes in UX design which aligns perfectly with Jordan's career goals",
                score: 96,
              },
              {
                title: "Experience Gap",
                description: "Ideal balance between senior mentor guidance and junior learner potential",
                score: 94,
              },
              {
                title: "Goal Alignment",
                description: "Portfolio building and design systems are key focus areas for both",
                score: 98,
              },
              {
                title: "Learning Style",
                description: "Complimentary communication preferences and availability windows",
                score: 92,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-scale-in rounded-2xl border border-border bg-card p-6"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{item.score}%</div>
                  </div>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                    style={{ width: showAnalysis ? `${item.score}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onMatch}
          disabled={matched}
          className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-4 font-bold text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50"
        >
          <Heart className="mr-2 inline-block h-5 w-5" />
          Confirm Match
        </button>
        <button className="flex-1 rounded-xl border-2 border-border bg-card px-6 py-4 font-bold text-foreground transition-all hover:border-accent/50 hover:bg-muted">
          Try Different Match
        </button>
      </div>
    </div>
  )
}
