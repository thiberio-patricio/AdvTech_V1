import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const userCookie = request.cookies.get("user")?.value
    const escritorioCookie = request.cookies.get("escritorio")?.value

    if (!userCookie || !escritorioCookie) {
      return NextResponse.json(
        { user: null, escritorio: null },
        { status: 401 }
      )
    }

    return NextResponse.json({
      user: JSON.parse(userCookie),
      escritorio: JSON.parse(escritorioCookie),
    })
  } catch (error) {
    console.error("Erro ao obter sessão:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
