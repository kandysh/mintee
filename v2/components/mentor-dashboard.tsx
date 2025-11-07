"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Users, TrendingUp, Star, MessageSquare } from "lucide-react"

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
  const expertise = [
    { area: "Product Strategy", years: 8 },
    { area: "Data Analytics", years: 6 },
    { area: "Team Leadership", years: 5 },
  ]

  const mentees = [
    { id: 1, name: "Alex Chen", goals: "Career transition", status: "Active", joinDate: "2 weeks ago" },
    { id: 2, name: "Jordan Smith", goals: "Leadership skills", status: "Active", joinDate: "1 month ago" },
    { id: 3, name: "Casey Williams", goals: "Technical skills", status: "Pending", joinDate: "3 days ago" },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah</h1>
          <p className="text-muted-foreground mt-1">Manage your mentoring profile and connections</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Card className="p-4 rounded-lg hover:bg-primary/10 transition-colors">
            <motion.button className="gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </motion.button>
          </Card>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Users, label: "Active Mentees", value: "2", color: "from-blue-500 to-blue-600" },
          { icon: TrendingUp, label: "Profile Views", value: "47", color: "from-purple-500 to-purple-600" },
          { icon: Star, label: "Rating", value: "4.8", color: "from-amber-500 to-amber-600" },
        ].map((stat, idx) => (
          <motion.div key={idx} whileHover={{ scale: 1.02, y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="bg-gradient-to-br from-background to-muted/30 border-border/50 hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Expertise Areas */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
          <CardHeader>
            <CardTitle>Expertise Areas</CardTitle>
            <CardDescription>Your core competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {expertise.map((exp, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors group"
                >
                  <span className="font-medium text-foreground">{exp.area}</span>
                  <Badge variant="secondary" className="bg-primary/20 text-primary group-hover:bg-primary/30">
                    {exp.years} years
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Active Mentees */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Active Mentees
            </CardTitle>
            <CardDescription>Your current mentoring relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {mentees.map((mentee, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ x: 5 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors group"
                >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{mentee.name}</p>
                    <p className="text-sm text-muted-foreground">{mentee.goals}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Joined {mentee.joinDate}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </motion.button>
                    <Badge
                      className={
                        mentee.status === "Active"
                          ? "bg-green-500/20 text-green-700"
                          : "bg-yellow-500/20 text-yellow-700"
                      }
                    >
                      {mentee.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
