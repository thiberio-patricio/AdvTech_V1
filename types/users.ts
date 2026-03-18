export type PermissionLevel = "total" | "media" | "fraca"

export interface Permission {
  resource: string
  level: PermissionLevel
  actions: string[] // create, read, update, delete
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
}

export interface User {
  id: string
  name: string
  email: string
  escritorioId: string
  role: Role
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  profileImage?: string
  oab?: string
  specialty?: string[]
  availability?: Availability[]
}

export interface Escritorio {
  id: string
  name: string
  logo?: string
  address: string
  phone: string
  email: string
  website?: string
  createdAt: Date
  updatedAt: Date
  adminUserId: string
  plan: "basic" | "professional" | "enterprise"
  maxUsers: number
}

export interface Availability {
  id: string
  userId: string
  date: Date
  startTime: string
  endTime: string
  status: "available" | "busy" | "out-of-office"
  notes?: string
}

// Mapeamento de recursos para níveis de permissão
export const resourcePermissions = {
  clientes: {
    total: ["create", "read", "update", "delete", "export"],
    media: ["create", "read", "update"],
    fraca: ["read"],
  },
  processos: {
    total: ["create", "read", "update", "delete", "export"],
    media: ["create", "read", "update"],
    fraca: ["read"],
  },
  documentos: {
    total: ["create", "read", "update", "delete", "export"],
    media: ["create", "read", "update"],
    fraca: ["read"],
  },
  prazos: {
    total: ["create", "read", "update", "delete", "export"],
    media: ["create", "read", "update"],
    fraca: ["read"],
  },
  financeiro: {
    total: ["create", "read", "update", "delete", "export"],
    media: ["read", "update"],
    fraca: ["read"],
  },
  equipe: {
    total: ["create", "read", "update", "delete", "invite"],
    media: ["read"],
    fraca: ["read"],
  },
  configuracoes: {
    total: ["read", "update"],
    media: ["read"],
    fraca: ["read"],
  },
}

// Papéis predefinidos
export const predefinedRoles: Role[] = [
  {
    id: "admin",
    name: "Administrador",
    description: "Acesso total a todas as funcionalidades do sistema",
    permissions: Object.keys(resourcePermissions).map((resource) => ({
      resource,
      level: "total",
      actions: resourcePermissions[resource as keyof typeof resourcePermissions]["total"],
    })),
  },
  {
    id: "advogado",
    name: "Advogado",
    description: "Acesso médio às funcionalidades do sistema",
    permissions: Object.keys(resourcePermissions).map((resource) => ({
      resource,
      level: "media",
      actions: resourcePermissions[resource as keyof typeof resourcePermissions]["media"],
    })),
  },
  {
    id: "assistente",
    name: "Assistente",
    description: "Acesso limitado às funcionalidades do sistema",
    permissions: Object.keys(resourcePermissions).map((resource) => ({
      resource,
      level: "fraca",
      actions: resourcePermissions[resource as keyof typeof resourcePermissions]["fraca"],
    })),
  },
]

