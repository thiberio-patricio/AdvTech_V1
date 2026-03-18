"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { User, PermissionLevel, Escritorio } from "@/types/users"
import { resourcePermissions } from "@/types/users"

interface AuthContextType {
  user: User | null
  escritorio: Escritorio | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  hasPermission: (resource: string, action: string) => boolean
  getPermissionLevel: (resource: string) => PermissionLevel | null
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [escritorio, setEscritorio] = useState<Escritorio | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar usuário da sessão ao iniciar
  useEffect(() => {
    const loadUserFromSession = async () => {
      try {
        const response = await fetch("/api/auth/session")
        if (response.ok) {
          const data = await response.json()
          if (data.user && data.escritorio) {
            setUser(data.user)
            setEscritorio(data.escritorio)
          } else {
            setUser(null)
            setEscritorio(null)
          }
        } else {
          // Se não autenticado (401) ou erro, limpar estado
          setUser(null)
          setEscritorio(null)
        }
      } catch (error) {
        console.error("Erro ao carregar usuário:", error)
        setUser(null)
        setEscritorio(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUserFromSession()
  }, [])

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setEscritorio(data.escritorio)
        return true
      }
      return false
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Logout
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      setEscritorio(null)
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  // Verificar permissão
  const hasPermission = (resource: string, action: string): boolean => {
    if (!user?.role.permissions) return false

    const permission = user.role.permissions.find((p) => p.resource === resource)
    if (!permission) return false

    const allowedActions =
      resourcePermissions[resource as keyof typeof resourcePermissions]?.[
        permission.level
      ]
    return allowedActions?.includes(action) ?? false
  }

  // Obter nível de permissão
  const getPermissionLevel = (resource: string): PermissionLevel | null => {
    if (!user?.role.permissions) return null

    const permission = user.role.permissions.find((p) => p.resource === resource)
    return permission?.level || null
  }

  // Atualizar usuário
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value: AuthContextType = {
    user,
    escritorio,
    isLoading,
    login,
    logout,
    hasPermission,
    getPermissionLevel,
    updateUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}

