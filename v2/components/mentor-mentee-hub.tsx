"use client"

import { useState, useEffect } from "react"
import { Sparkles, Users, Trophy, Zap } from "lucide-react"
import MentorCard from "./mentor-card"
import MenteeCard from "./mentee-card"
import ConnectionFlow from "./connection-flow"

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

export default function MentorMenteeHub() {
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null)
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null)
  const [matched, setMatched] = useState(false)
  const [showConnection, setShowConnection] = useState(false)

  const mentors: Mentor[] = [
    {
      id: "1",
      name: "Sarah Chen",
      title: "Senior Product Designer",
      expertise: ["Product Design", "UX Research", "Design Systems"],
      bio: "Passionate about creating intuitive digital experiences with 8+ years of industry experience.",
      image: "/professional-woman-designer.jpg",
      rating: 4.9,
      mentees: 12,
    },
    {
      id: "2",
      name: "Alex Rodriguez",
      title: "Full Stack Engineer",
      expertise: ["React", "Node.js", "System Design"],
      bio: "Love building scalable applications and mentoring the next generation of developers.",
      image: "/professional-man-engineer.jpg",
      rating: 4.8,
      mentees: 15,
    },
    {
      id: "3",
      name: "Maya Patel",
      title: "Data Science Lead",
      expertise: ["Machine Learning", "Analytics", "Python"],
      bio: "Excited to share knowledge about AI and help emerging data scientists grow.",
      image: "/professional-woman-scientist.jpg",
      rating: 4.95,
      mentees: 8,
    },
  ]

  const mentees: Mentee[] = [
    {
      id: "1",
      name: "Jordan Kim",
      field: "UX Design",
      goals: ["Learn Design Systems", "Portfolio Building", "Industry Connections"],
      bio: "Recently graduated designer looking to grow in product design.",
      image: "/young-designer-profile.jpg",
      experience: "Junior",
    },
    {
      id: "2",
      name: "Taylor Smith",
      field: "Web Development",
      goals: ["Master React", "Career Growth", "Build Projects"],
      bio: "Bootcamp graduate eager to land first dev role and learn best practices.",
      image: "/young-developer-profile.jpg",
      experience: "Beginner",
    },
    {
      id: "3",
      name: "Casey Johnson",
      field: "Data Science",
      goals: ["ML Fundamentals", "Real Projects", "Networking"],
      bio: "Computer science student interested in AI and machine learning applications.",
      image: "/young-student-profile.jpg",
      experience: "Student",
    },
  ]

  useEffect(() => {
    if (selectedMentor && selectedMentee) {
      setShowConnection(true)
    }
  }, [selectedMentor, selectedMentee])

  const handleMatch = () => {
    setMatched(true)
    setTimeout(() => {
      setMatched(false)
      setSelectedMentor(null)
      setSelectedMentee(null)
      setShowConnection(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen px-4 py-12 md:px-8">
      {/* Header */}
      <div className="mx-auto mb-16 max-w-6xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-foreground">Mentor Matching Platform</span>
        </div>
        <h1 className="mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Connect, Learn & Grow
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Bridge the gap between experienced mentors and ambitious learners. Find your perfect match and unlock your
          potential.
        </p>
      </div>

      {/* Stats */}
      <div className="mx-auto mb-16 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { icon: Users, label: "Active Members", value: "2,500+" },
          { icon: Trophy, label: "Success Rate", value: "94%" },
          { icon: Zap, label: "Skills Shared", value: "150+" },
        ].map((stat, i) => (
          <div
            key={i}
            className="animate-fade-in-up rounded-2xl border border-border bg-card p-6 backdrop-blur-sm transition-all hover:border-accent/50 hover:shadow-lg"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <stat.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Matching Area */}
      <div className="mx-auto max-w-6xl">
        {!showConnection ? (
          <div className="grid gap-12 md:grid-cols-2">
            {/* Mentors Section */}
            <div>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm font-bold text-primary-foreground">
                  M
                </span>
                Expert Mentors
              </h2>
              <div className="space-y-4">
                {mentors.map((mentor, i) => (
                  <div key={mentor.id} className="animate-slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
                    <MentorCard
                      mentor={mentor}
                      isSelected={selectedMentor?.id === mentor.id}
                      onSelect={setSelectedMentor}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mentees Section */}
            <div>
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-accent text-sm font-bold text-secondary-foreground">
                  L
                </span>
                Aspiring Learners
              </h2>
              <div className="space-y-4">
                {mentees.map((mentee, i) => (
                  <div key={mentee.id} className="animate-slide-in-right" style={{ animationDelay: `${i * 0.1}s` }}>
                    <MenteeCard
                      mentee={mentee}
                      isSelected={selectedMentee?.id === mentee.id}
                      onSelect={setSelectedMentee}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ConnectionFlow mentor={selectedMentor!} mentee={selectedMentee!} matched={matched} onMatch={handleMatch} />
        )}
      </div>

      {/* Footer */}
      <div className="mx-auto mt-16 max-w-6xl border-t border-border pt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Join thousands of mentors and mentees building meaningful professional relationships
        </p>
      </div>
    </div>
  )
}
