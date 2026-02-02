'use client'

import { motion } from 'framer-motion'
import { Search, MapPin, Languages } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
import {
  containerVariants,
  itemVariants,
  scale,
  hoverY,
  fadeIn,
  rotate,
} from '@/lib/animations'
import { TopBar } from '@/components/top-bar'
import { useRole } from '@/hooks/useRole'
import { useMatching } from '@/hooks/useMatching'
import { useRouter } from 'next/navigation'

export default function MatchesPage() {
  const [mentors, setMentors] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()
  const { role, isLoading: isRoleLoading } = useRole()

  // Get current user's mentee ID (replace with actual auth)
  const menteeId = typeof window !== 'undefined'
    ? localStorage.getItem('mentee_id') || '1'
    : '1'

  // Use the matching hook
  const { matches, loading, error, fetchMatches } = useMatching({
    menteeId,
    limit: 20,
    autoFetch: true,
  })

  // Update local state when matches arrive
  useEffect(() => {
    if (matches.length > 0) {
      setMentors(matches)
    }
  }, [matches])

  useEffect(() => {
    if (!isRoleLoading && !role) {
      router.push('/select-role')
    }
  }, [isRoleLoading, role, router])

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mentor.expertise.some((exp: string) =>
      exp.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  if (isRoleLoading || !role) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div variants={rotate} animate="animate">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="py-12 px-4 bg-gradient-to-br from-background to-primary/5">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <h1 className="text-5xl font-serif font-bold mb-3">Explore Mentors</h1>
            <p className="text-lg text-muted-foreground">
              {loading
                ? 'Finding your perfect mentor matches...'
                : `Found ${filteredMentors.length} mentor${filteredMentors.length !== 1 ? 's' : ''} for you`}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search mentors by name or expertise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </motion.div>

          {error && (
            <motion.div
              variants={itemVariants}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-600"
            >
              Error loading matches: {error}
            </motion.div>
          )}

          {loading && filteredMentors.length === 0 ? (
            <motion.div
              variants={containerVariants}
              className="flex justify-center items-center py-12"
            >
              <motion.div variants={fadeIn} className="text-center">
                <motion.div variants={rotate} animate="animate" className="mb-4">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto" />
                </motion.div>
                <p className="text-muted-foreground">Loading matches...</p>
              </motion.div>
            </motion.div>
          ) : filteredMentors.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">No mentors found matching your criteria</p>
              <motion.button
                variants={scale}
                whileHover="hover"
                whileTap="tap"
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold"
              >
                Clear Search
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {filteredMentors.map((mentor) => (
                <motion.div
                  key={mentor.id}
                  variants={itemVariants}
                  whileHover="hoverY"
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer group flex flex-col"
                >
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-serif font-bold text-lg">{mentor.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{mentor.title}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{mentor.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Languages className="w-4 h-4" />
                          <span>{mentor.languages.join(', ')}</span>
                        </div>
                      </div>
                      <div className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded h-fit">
                        {Math.round(mentor.matchScore)}% match
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map((exp: string) => (
                      <span
                        key={exp}
                        className="px-2 py-1 rounded text-xs bg-accent/10 text-accent font-medium"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>

                  <div className="mb-4 mt-auto">
                    <div className="w-full bg-border rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${mentor.matchScore}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>

                  <motion.button
                    variants={scale}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all group-hover:shadow-lg"
                  >
                    View Profile
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
