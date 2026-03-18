"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const router = useRouter()
  const { user, isLoading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isLoading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, isLoading, router, mounted])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-2">SistemaIntegrado</h1>
        <p className="text-slate-400">
          {!mounted ? "Iniciando..." : isLoading ? "Verificando sessão..." : "Redirecionando..."}
        </p>
      </div>
    </div>
  )
}
