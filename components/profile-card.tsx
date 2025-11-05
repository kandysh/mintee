"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Edit2, Mail, MapPin } from "lucide-react"
import Link from "next/link"

interface ProfileCardProps {
  role: "mentor" | "mentee"
}

export default function ProfileCard({ role }: ProfileCardProps) {
  const mentorData = {
    name: "Sarah Johnson",
    title: "Senior Product Manager",
    email: "sarah@example.com",
    region: "San Francisco, CA",
    bio: "Passionate about building products that matter. 8 years in product management across startups and scale-ups.",
    expertise: ["Product Strategy", "Data Analytics", "Team Leadership"],
    experience: 8,
    avatar: "SJ",
    linkedin: "linkedin.com/in/sarahjohnson",
  }

  const menteeData = {
    name: "Alex Chen",
    title: "Design Student",
    email: "alex@example.com",
    region: "New York, NY",
    bio: "Aspiring product designer eager to learn and grow in the field.",
    learningGoals: ["Product Design", "UX Research", "Design Systems"],
    level: "Intermediate",
    avatar: "AC",
  }

  const data = role === "mentor" ? mentorData : menteeData

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-6"
    >
      {/* Main Profile Card */}
      <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30 overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -mr-20 -mt-20" />
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 ring-2 ring-primary/20">
                <AvatarImage src={`https://avatar.vercel.sh/${data.avatar}`} />
                <AvatarFallback>{data.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{data.name}</CardTitle>
                <CardDescription className="text-primary font-medium mt-1">{data.title}</CardDescription>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/profile/edit">
                <Button className="gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Button>
              </Link>
            </motion.div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 relative z-10">
          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Contact Information</h3>
            <div className="space-y-2">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground p-2 rounded hover:bg-muted/50 transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{data.email}</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 text-sm text-muted-foreground p-2 rounded hover:bg-muted/50 transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span>{data.region}</span>
              </motion.div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{data.bio}</p>
          </div>

          {/* Expertise or Learning Goals */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">
              {role === "mentor" ? "Expertise Areas" : "Learning Goals"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(role === "mentor" ? mentorData.expertise : menteeData.learningGoals).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors">{item}</Badge>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          {role === "mentor" ? (
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/30 border border-border/50">
              <div>
                <p className="text-xs text-muted-foreground">Years of Experience</p>
                <p className="text-lg font-bold text-foreground mt-1">{mentorData.experience}+</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rating</p>
                <p className="text-lg font-bold text-foreground mt-1">4.8 ⭐</p>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-xs text-muted-foreground">Current Level</p>
              <p className="text-lg font-bold text-foreground mt-1">{menteeData.level}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card className="border-border/50 bg-gradient-to-br from-background to-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Quick Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Dashboard", href: "/" },
              { label: "Find Mentors", href: "/mentors", hide: role === "mentor" },
              { label: "Settings", href: "/settings" },
            ]
              .filter((link) => !link.hide)
              .map((link) => (
                <Link key={link.label} href={link.href}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors text-sm font-medium text-foreground text-center"
                  >
                    {link.label}
                  </motion.button>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
