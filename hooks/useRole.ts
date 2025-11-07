"use client"

import { useState, useEffect } from "react"

export function useRole() {
  const [role, setRole] = useState<"mentor" | "mentee" | null>(null)
  const [hasMultipleRoles, setHasMultipleRoles] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedRole = localStorage.getItem("currentRole") as "mentor" | "mentee" | null
    const hasMultiple = localStorage.getItem("hasMultipleRoles") === "true"

    setRole(storedRole)
    setHasMultipleRoles(hasMultiple)
    setIsLoading(false)
  }, [])

  return { role, hasMultipleRoles, isLoading }
}
