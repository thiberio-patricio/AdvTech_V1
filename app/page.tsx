"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  console.log("[v0] Home render - isLoading:", isLoading, "user:", user)
  
  useEffect(() => {
    console.log("[v0] Home useEffect - isLoading:", isLoading, "user:", !!user)
    if (!isLoading) {
      if (user) {
        console.log("[v0] Redirecting to /dashboard")
        router.push("/dashboard")
      } else {
        console.log("[v0] Redirecting to /login")
        router.push("/login")
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">SistemaIntegrado</h1>
        <p className="text-muted-foreground">
          Carregando...
        </p>
      </div>
    </div>
  )
}
