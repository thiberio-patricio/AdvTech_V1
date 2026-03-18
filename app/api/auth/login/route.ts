import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Mock de usuários - em produção seria do banco de dados
const MOCK_USERS = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@advtech.com",
    password: "admin123", // Em produção seria hash
    escritorioId: "escritorio-1",
    role: {
      id: "admin",
      name: "Administrador",
      description: "Acesso total ao sistema",
      permissions: [],
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "João Silva",
    email: "joao@advtech.com",
    password: "user123",
    escritorioId: "escritorio-1",
    role: {
      id: "advogado",
      name: "Advogado",
      description: "Acesso a clientes e processos",
      permissions: [],
    },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

// Mock de escritórios
const MOCK_ESCRITORIOS = [
  {
    id: "escritorio-1",
    name: "AdvTech Advocacia",
    address: "Rua Principal, 123",
    phone: "+55 11 3000-0000",
    email: "contato@advtech.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    adminUserId: "1",
    plan: "professional",
    maxUsers: 10,
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validar entrada
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email e senha são obrigatórios" },
        { status: 400 }
      )
    }

    // Buscar usuário
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { error: "Email ou senha incorretos" },
        { status: 401 }
      )
    }

    // Buscar escritório
    const escritorio = MOCK_ESCRITORIOS.find((e) => e.id === user.escritorioId)

    if (!escritorio) {
      return NextResponse.json(
        { error: "Escritório não encontrado" },
        { status: 404 }
      )
    }

    // Preparar dados para sessão
    const sessionData = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        escritorioId: user.escritorioId,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      escritorio: {
        id: escritorio.id,
        name: escritorio.name,
        plan: escritorio.plan,
      },
      timestamp: new Date().toISOString(),
    }

    // Criar resposta com cookies
    const response = NextResponse.json({
      success: true,
      user: sessionData.user,
      escritorio: sessionData.escritorio,
    })

    // Definir cookies (httpOnly para melhor segurança)
    response.cookies.set("user", JSON.stringify(sessionData.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    })

    response.cookies.set("escritorio", JSON.stringify(sessionData.escritorio), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Erro ao fazer login:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
