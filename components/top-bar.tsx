'use client'

import { motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ThemeToggler } from './theme-toggler'
import { RoleToggler } from './role-toggler'

export function TopBar() {
  const router = useRouter()
  const [currentRole, setCurrentRole] = useState<'mentor' | 'mentee'>('mentee')

  useEffect(() => {
    const storedCurrentRole = localStorage.getItem('currentRole') as 'mentor' | 'mentee' | null
    if (storedCurrentRole) {
      setCurrentRole(storedCurrentRole)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userRole')
    localStorage.removeItem('currentRole')
    router.push('/')
  }

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-serif font-bold">MentorHub</h1>
        </Link>
        <div className="flex items-center justify-end gap-4">
          <ThemeToggler />
          <RoleToggler currentRole={currentRole} />

          <Link href="/profile">
            <button className="px-4 py-2 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
              View Profile
            </button>
          </Link>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-destructive hover:bg-destructive/10"
            aria-label="Logout"
          >
            <LogOut className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
