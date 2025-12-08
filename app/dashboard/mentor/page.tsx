"use client"

import { motion } from "framer-motion"
import { Users, Check, X, Target, MapPin, Languages, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TopBar } from "@/components/top-bar"

export default function MentorDashboardPage() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [activeMentees, setActiveMentees] = useState([
    { 
      id: 1, 
      name: "Sarah Johnson", 
      title: "Product Manager",
      goals: "Career transition to product management", 
      region: "North America",
      languages: ["English", "Spanish"],
      joinDate: "2 weeks ago"
    },
    { 
      id: 2, 
      name: "Marcus Chen", 
      title: "Software Engineer",
      goals: "Leadership skills development", 
      region: "Asia Pacific",
      languages: ["English", "Mandarin"],
      joinDate: "1 month ago"
    },
    { 
      id: 3, 
      name: "Alex Rodriguez", 
      title: "Senior Designer",
      goals: "Transitioning to senior designer role", 
      region: "Europe",
      languages: ["English", "Portuguese"],
      joinDate: "3 weeks ago"
    },
  ])

  const pendingMentees = [
    { 
      id: 4, 
      name: "Emma Wilson", 
      title: "Business Analyst",
      goals: "Leadership development and team management", 
      region: "North America",
      languages: ["English", "French"],
      requestDate: "3 days ago"
    },
    { 
      id: 5, 
      name: "David Park", 
      title: "Mid-level Developer",
      goals: "Career growth in software engineering", 
      region: "Asia Pacific",
      languages: ["English", "Korean"],
      requestDate: "1 day ago"
    },
  ]

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const removeMentee = (id: number) => {
    setActiveMentees(activeMentees.filter((m) => m.id !== id))
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  if (!isHydrated) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <TopBar />

      <motion.div 
        className="max-w-6xl mx-auto py-12 px-4" 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Mentor Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your active mentees and review new requests</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-accent/10 border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Mentees</p>
                  <p className="text-4xl font-bold mt-2">{activeMentees.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-accent/20">
                  <Users className="w-8 h-8 text-accent-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-chart-1/10 border-chart-1/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Requests</p>
                  <p className="text-4xl font-bold mt-2">{pendingMentees.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-chart-1/20">
                  <Users className="w-8 h-8 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Mentees Section */}
        <motion.div variants={fadeUp} className="mb-8">
          <Card className="border-border/50 bg-card">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Active Mentees</h2>
              </div>
              {activeMentees.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No active mentees yet</p>
              ) : (
                <div className="space-y-4">
                  {activeMentees.map((mentee) => (
                    <motion.div
                      key={mentee.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors border border-accent/20"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg text-foreground">{mentee.name}</h3>
                            <Badge className="bg-accent/20 text-accent-foreground border-accent/30">
                              Active
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{mentee.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Target className="w-4 h-4" />
                            <span>{mentee.goals}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{mentee.region}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Languages className="w-4 h-4" />
                              <span>{mentee.languages.join(", ")}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground/70 mt-2">Joined {mentee.joinDate}</p>
                        </div>
                        <motion.button
                          onClick={() => removeMentee(mentee.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-all"
                          title="Remove mentee"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Pending Mentees Section */}
        <motion.div variants={fadeUp}>
          <Card className="border-border/50 bg-card">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-chart-1" />
                <h2 className="text-2xl font-bold">Pending Requests</h2>
              </div>
              {pendingMentees.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No pending requests</p>
              ) : (
                <div className="space-y-4">
                  {pendingMentees.map((mentee) => (
                    <motion.div
                      key={mentee.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors border border-chart-1/20"
                    >
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-foreground">{mentee.name}</h3>
                          <Badge className="bg-chart-1/20 text-chart-1 border-chart-1/30">
                            Pending
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{mentee.title}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Target className="w-4 h-4" />
                          <span>{mentee.goals}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{mentee.region}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Languages className="w-4 h-4" />
                            <span>{mentee.languages.join(", ")}</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground/70">Requested {mentee.requestDate}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-4">
                        <Button
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-2 border-destructive/50 text-destructive hover:bg-destructive/10"
                        >
                          <X className="w-4 h-4" />
                          Decline
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
