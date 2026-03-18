"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  FileText,
  Clock,
  DollarSign,
  Users2,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import type { User } from "@/types/users"

interface DashboardNavProps {
  user: User
}

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    resource: "dashboard",
  },
  {
    label: "Clientes",
    href: "/dashboard/clientes",
    icon: Users,
    resource: "clientes",
  },
  {
    label: "Processos",
    href: "/dashboard/processos",
    icon: FileText,
    resource: "processos",
  },
  {
    label: "Documentos",
    href: "/dashboard/documentos",
    icon: FileText,
    resource: "documentos",
  },
  {
    label: "Prazos",
    href: "/dashboard/prazos",
    icon: Clock,
    resource: "prazos",
  },
  {
    label: "Financeiro",
    href: "/dashboard/financeiro",
    icon: DollarSign,
    resource: "financeiro",
  },
  {
    label: "Equipe",
    href: "/dashboard/equipe",
    icon: Users2,
    resource: "equipe",
  },
  {
    label: "Configurações",
    href: "/dashboard/configuracoes",
    icon: Settings,
    resource: "configuracoes",
  },
]

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden"
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <nav
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static md:translate-x-0 top-0 left-0 h-screen w-64 bg-sidebar border-r border-border z-30 transition-transform duration-300 overflow-y-auto pt-4`}
      >
        {/* Logo */}
        <div className="px-6 mb-8">
          <h2 className="text-xl font-bold text-foreground">SistemaIntegrado</h2>
          <p className="text-xs text-muted-foreground">v1.0</p>
        </div>

        {/* Nav Items */}
        <div className="space-y-2 px-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link key={item.href} href={item.href}>
                <a
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </Link>
            )
          })}
        </div>

        {/* User Info at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4 bg-muted">
          <p className="text-xs text-muted-foreground">Logado como</p>
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.role.name}</p>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
