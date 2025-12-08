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
import { useRouter } from 'next/navigation'

export default function MatchesPage() {
  const [mentors, setMentors] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const { role, isLoading: isRoleLoading } = useRole()

  useEffect(() => {
    if (!isRoleLoading && !role) {
      router.push('/select-role')
    }
  }, [isRoleLoading, role, router])

  const initialMentors = [
    {
      id: 1,
      name: 'James Wilson',
      title: 'VP Product Strategy',
      expertise: ['Product', 'Strategy', 'Leadership'],
      location: 'North America',
      languages: ['English', 'Spanish'],
      matchScore: 92,
    },
    {
      id: 2,
      name: 'Sarah Mitchell',
      title: 'Chief Technology Officer',
      expertise: ['Technology', 'Engineering', 'Innovation'],
      location: 'Europe',
      languages: ['English', 'German'],
      matchScore: 88,
    },
    {
      id: 3,
      name: 'Robert Chen',
      title: 'Director of Operations',
      expertise: ['Operations', 'Process', 'Analytics'],
      location: 'Asia Pacific',
      languages: ['English', 'Mandarin'],
      matchScore: 85,
    },
    {
      id: 4,
      name: 'Emma Rodriguez',
      title: 'Head of People',
      expertise: ['HR', 'Talent', 'Culture'],
      location: 'North America',
      languages: ['English', 'Spanish', 'Portuguese'],
      matchScore: 83,
    },
    {
      id: 5,
      name: 'Michael Thompson',
      title: 'Finance Director',
      expertise: ['Finance', 'FP&A', 'Business'],
      location: 'Europe',
      languages: ['English', 'French'],
      matchScore: 81,
    },
    {
      id: 6,
      name: 'Lisa Kumar',
      title: 'Marketing Leader',
      expertise: ['Marketing', 'Brand', 'Digital'],
      location: 'Asia Pacific',
      languages: ['English', 'Hindi', 'Mandarin'],
      matchScore: 79,
    },
  ]

  const loadMoreMentors = useCallback(async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    try {
      const newMentors = [
        {
          id: 6 + page * 3,
          name: `Mentor ${6 + page * 3}`,
          title: 'Senior Leader',
          expertise: ['Strategy', 'Leadership'],
          location: 'Remote',
          languages: ['English'],
          matchScore: 75 + Math.random() * 20,
        },
        {
          id: 7 + page * 3,
          name: `Mentor ${7 + page * 3}`,
          title: 'Industry Expert',
          expertise: ['Technology', 'Innovation'],
          location: 'Global',
          languages: ['English', 'Spanish'],
          matchScore: 70 + Math.random() * 25,
        },
        {
          id: 8 + page * 3,
          name: `Mentor ${8 + page * 3}`,
          title: 'Executive Coach',
          expertise: ['Leadership', 'Growth'],
          location: 'Multiple',
          languages: ['English', 'French'],
          matchScore: 80 + Math.random() * 15,
        },
      ]

      setMentors((prev) => [...prev, ...newMentors])
      setPage((prev) => prev + 1)

      if (page > 3) setHasMore(false)
    } catch (error) {
      console.error('[v0] Error loading mentors:', error)
    } finally {
      setIsLoading(false)
    }
  }, [page, isLoading, hasMore])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && hasMore) {
          loadMoreMentors()
        }
      },
      { threshold: 0.1 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMoreMentors, isLoading, hasMore])

  useEffect(() => {
    setMentors(initialMentors)
  }, [])

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
            <p className="text-lg text-muted-foreground">Find the perfect mentor for your growth</p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search mentors by name or expertise..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            {mentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                variants={itemVariants}
                whileHover="hoverY"
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer group"
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

                <div className="mb-4">
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

          <div ref={observerTarget} className="mt-12 flex justify-center">
            {isLoading && (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="px-4 py-2 bg-card border border-border rounded-lg text-muted-foreground"
              >
                Loading more mentors...
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}
