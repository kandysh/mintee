"use client"

import { motion } from "framer-motion"
import { Star, MapPin, Award, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MentorDetailPage() {
  const mentor = {
    id: 1,
    name: "James Wilson",
    role: "VP Product Strategy",
    bio: "Passionate about helping emerging leaders develop their strategic thinking and product intuition. 15+ years in product management and strategy.",
    expertise: ["Product Strategy", "Leadership", "Innovation", "Team Building"],
    regions: ["North America", "Europe"],
    languages: ["English", "Spanish"],
    rating: 4.9,
    mentees: 4,
    maxMentees: 5,
    experience: "Senior leader with 15+ years in product strategy and management",
    strengths: ["Strategic Thinking", "Leadership", "Communication", "Problem Solving"],
    availability: "Available for weekly 30-min sessions",
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 py-12 px-4">
      <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
        {/* Back button */}
        <motion.div variants={itemVariants} className="mb-8">
          <Link href="/matches">
            <motion.button
              whileHover={{ scale: 1.05, x: -4 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-primary hover:text-accent transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Mentors
            </motion.button>
          </Link>
        </motion.div>

        {/* Profile header */}
        <motion.div variants={itemVariants} className="mb-8 p-8 rounded-xl bg-card border border-border">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">{mentor.name}</h1>
              <p className="text-xl text-muted-foreground">{mentor.role}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(mentor.rating) ? "fill-secondary text-secondary" : "text-border"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-muted-foreground">{mentor.rating} rating</p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground mb-6">{mentor.bio}</p>

          {/* Capacity */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Mentoring Capacity</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-border rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-3 rounded-full"
                  style={{ width: `${(mentor.mentees / mentor.maxMentees) * 100}%` }}
                />
              </div>
              <span className="text-sm font-semibold">
                {mentor.mentees} / {mentor.maxMentees}
              </span>
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Request Mentorship
          </motion.button>
        </motion.div>

        {/* Content grid */}
        <motion.div className="grid lg:grid-cols-2 gap-6" variants={containerVariants}>
          {/* Expertise */}
          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-serif font-bold mb-4">Expertise</h2>
            <div className="space-y-3">
              {mentor.expertise.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Strengths */}
          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-serif font-bold mb-4">Key Strengths</h2>
            <div className="flex flex-wrap gap-2">
              {mentor.strengths.map((strength) => (
                <span
                  key={strength}
                  className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold"
                >
                  {strength}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-serif font-bold mb-4">Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Experience</p>
                <p className="text-foreground">{mentor.experience}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Availability</p>
                <p className="text-foreground">{mentor.availability}</p>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div variants={itemVariants} className="p-6 rounded-xl bg-card border border-border">
            <h2 className="text-xl font-serif font-bold mb-4">Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{mentor.regions.join(", ")}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.languages.map((lang) => (
                    <span key={lang} className="px-2 py-1 rounded bg-accent/10 text-accent text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
