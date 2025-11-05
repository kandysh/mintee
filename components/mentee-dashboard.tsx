"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Target, BookOpen, Check } from "lucide-react"
import { useState } from "react"
import MentorCard from "./mentor-card"
import MentorDetailModal from "./mentor-detail-modal"

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

const mentorsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Product Manager",
    region: "San Francisco",
    gcb: ["Product Strategy", "Data Analytics"],
    expertise: ["Product Strategy", "Data Analytics", "Team Leadership"],
    yearsExperience: 8,
    bio: "Passionate about building products that matter. 8 years in product management across startups and scale-ups.",
    avatar: "SJ",
    assigned: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Engineering Lead",
    region: "New York",
    gcb: ["Backend Development", "System Design"],
    expertise: ["System Design", "Backend Development", "Mentoring"],
    yearsExperience: 10,
    bio: "Building scalable systems at scale. Love mentoring junior engineers and sharing best practices.",
    avatar: "MC",
    assigned: false,
  },
  {
    id: 3,
    name: "Emma Davis",
    title: "Data Scientist",
    region: "Seattle",
    gcb: ["Machine Learning", "Analytics"],
    expertise: ["Machine Learning", "Data Analytics", "Python"],
    yearsExperience: 6,
    bio: "ML practitioner focused on real-world applications. Happy to guide through DS career journey.",
    avatar: "ED",
    assigned: false,
  },
]

export default function MenteeDashboard() {
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentorsData)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMentors = mentorsData.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const assignedMentors = filteredMentors.filter((m) => m.assigned)
  const availableMentors = filteredMentors.filter((m) => !m.assigned)

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-bold text-foreground">Your Learning Journey</h1>
        <p className="text-muted-foreground mt-1">
          Manage assigned mentors or discover new ones to accelerate your growth
        </p>
      </motion.div>

      {/* Assigned Mentors Section */}
      {assignedMentors.length > 0 && (
        <motion.div variants={fadeUp}>
          <Card className="border-border/50 bg-gradient-to-br from-green-50/50 to-green-50/10 dark:from-green-950/20 dark:to-green-950/10 border-green-200/50 dark:border-green-800/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-600" />
                Your Current Mentors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedMentors.map((mentor) => (
                  <motion.div
                    key={mentor.id}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-lg bg-background/50 border border-green-200/50 dark:border-green-800/50 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{mentor.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{mentor.name}</p>
                      <p className="text-sm text-muted-foreground">{mentor.title}</p>
                      <div className="flex gap-1 mt-2">
                        {mentor.expertise.slice(0, 2).map((exp, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-primary/10 text-primary">
                            {exp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Search & Filters */}
      <motion.div variants={fadeUp} className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by name or expertise..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background border-border/50 focus-visible:ring-primary/50"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["Product", "Engineering", "Data Science"].map((filter) => (
            <motion.div key={filter} whileHover={{ scale: 1.05 }}>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary/10 transition-colors border-border/50"
              >
                {filter}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Your Goals */}
      <motion.div variants={fadeUp}>
        <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Learning Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: BookOpen, title: "Learn Product Strategy" },
                { icon: Target, title: "Improve Leadership Skills" },
                { icon: BookOpen, title: "Transition to PM Role" },
              ].map((goal, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-background/50 border border-border/50 flex items-center gap-3"
                >
                  <goal.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{goal.title}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Mentors Section */}
      <motion.div variants={fadeUp}>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {availableMentors.length > 0 ? "Discover More Mentors" : "All Available Mentors"}
        </h2>
      </motion.div>

      {/* Mentor Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {availableMentors.map((mentor) => (
          <motion.div key={mentor.id} variants={fadeUp}>
            <MentorCard mentor={mentor} onClick={() => setSelectedMentor(mentor)} />
          </motion.div>
        ))}
      </motion.div>

      {/* Mentor Detail Modal */}
      {selectedMentor && <MentorDetailModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />}
    </motion.div>
  )
}
