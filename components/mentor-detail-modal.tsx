"use client"

import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, MessageSquare, Calendar, MapPin } from "lucide-react"

interface MentorDetailModalProps {
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
  onClose: () => void
}

export default function MentorDetailModal({ mentor, onClose }: MentorDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border-border/50 bg-gradient-to-br from-background to-muted/30">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="pb-6">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-start gap-4 pt-2">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-2xl">{mentor.avatar}</span>
              </div>
              <div className="text-left flex-1">
                <DialogTitle className="text-2xl font-bold">{mentor.name}</DialogTitle>
                <DialogDescription className="text-primary font-medium mt-1">{mentor.title}</DialogDescription>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                  <MapPin className="w-4 h-4" />
                  {mentor.region}
                </div>
              </div>
            </div>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* Bio */}
            <div>
              <h3 className="font-semibold text-foreground mb-2">About</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{mentor.bio}</p>
            </div>

            {/* Experience */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Experience</h3>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{mentor.yearsExperience}+ years of mentoring experience</span>
              </div>
            </div>

            {/* Expertise */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Expertise Areas</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.map((exp, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                  >
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-default">
                      {exp}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* GCB Tags */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Mentoring Focus</h3>
              <div className="flex flex-wrap gap-2">
                {mentor.gcb.map((tag, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + idx * 0.05 }}
                  >
                    <Badge variant="outline" className="border-primary/30 text-primary/80">
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Compatibility Score */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-lg bg-primary/5 border border-primary/20"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Compatibility with you</span>
                <span className="text-lg font-bold text-primary">94%</span>
              </div>
              <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "94%" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-primary/60"
                />
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex gap-3 pt-4"
            >
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-border/50 hover:bg-muted transition-colors bg-transparent"
              >
                Close
              </Button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/30">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Connect
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
