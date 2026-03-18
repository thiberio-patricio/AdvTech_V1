import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout realizado com sucesso",
    })

    // Limpar cookies
    response.cookies.delete("user")
    response.cookies.delete("escritorio")

    return response
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
