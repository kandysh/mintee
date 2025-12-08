"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Check, X, Calendar, Target } from "lucide-react"

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

export default function MentorDashboard() {
  const activeMentees = [
    { 
      id: 1, 
      name: "Alex Chen", 
      goals: "Career transition to product management", 
      joinDate: "2 weeks ago",
      nextSession: "Tomorrow at 2:00 PM",
      progress: 65
    },
    { 
      id: 2, 
      name: "Jordan Smith", 
      goals: "Leadership skills development", 
      joinDate: "1 month ago",
      nextSession: "Friday at 10:00 AM",
      progress: 80
    },
  ]

  const pendingMentees = [
    { 
      id: 3, 
      name: "Casey Williams", 
      goals: "Technical skills in data analytics", 
      requestDate: "3 days ago",
      bio: "Recent graduate looking to break into tech"
    },
    { 
      id: 4, 
      name: "Morgan Lee", 
      goals: "Career pivot to UX design", 
      requestDate: "1 day ago",
      bio: "5 years in marketing, passionate about design"
    },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-bold text-foreground">Mentor Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your active mentees and review new requests</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Mentees</p>
                <p className="text-4xl font-bold mt-2">{activeMentees.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/20">
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Requests</p>
                <p className="text-4xl font-bold mt-2">{pendingMentees.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/20">
                <Users className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Mentees Section */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-600" />
              Active Mentees
            </CardTitle>
            <CardDescription>Your current mentoring relationships</CardDescription>
          </CardHeader>
          <CardContent>
            {activeMentees.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No active mentees yet</p>
            ) : (
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {activeMentees.map((mentee) => (
                  <motion.div
                    key={mentee.id}
                    variants={fadeUp}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors border border-green-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-foreground">{mentee.name}</h3>
                          <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                            Active
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Target className="w-4 h-4" />
                          <span>{mentee.goals}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Next session: {mentee.nextSession}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{mentee.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${mentee.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="bg-green-500 h-2 rounded-full"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground/70 mt-2">Joined {mentee.joinDate}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Pending Mentees Section */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-yellow-600" />
              Pending Requests
            </CardTitle>
            <CardDescription>Review and respond to mentorship requests</CardDescription>
          </CardHeader>
          <CardContent>
            {pendingMentees.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No pending requests</p>
            ) : (
              <motion.div
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                {pendingMentees.map((mentee) => (
                  <motion.div
                    key={mentee.id}
                    variants={fadeUp}
                    whileHover={{ scale: 1.01 }}
                    className="p-5 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors border border-yellow-500/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg text-foreground">{mentee.name}</h3>
                          <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30">
                            Pending
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Target className="w-4 h-4" />
                          <span>{mentee.goals}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{mentee.bio}</p>
                        <p className="text-xs text-muted-foreground/70">Requested {mentee.requestDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        size="sm"
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-2 border-red-500/30 text-red-600 hover:bg-red-500/10"
                      >
                        <X className="w-4 h-4" />
                        Decline
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
