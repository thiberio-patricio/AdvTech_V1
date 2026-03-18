import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const userCookie = request.cookies.get("user")?.value
    const escritorioCookie = request.cookies.get("escritorio")?.value

    if (!userCookie || !escritorioCookie) {
      // Retorna 200 com valores nulos para indicar que não há sessão
      // Isso permite que o cliente saiba que a verificação foi feita
      return NextResponse.json(
        { user: null, escritorio: null, authenticated: false },
        { status: 200 }
      )
    }

    const user = JSON.parse(userCookie)
    const escritorio = JSON.parse(escritorioCookie)

    return NextResponse.json({
      user,
      escritorio,
      authenticated: true,
    })
  } catch (error) {
    console.error("Erro ao obter sessão:", error)
    return NextResponse.json(
      { user: null, escritorio: null, authenticated: false, error: "Erro ao processar sessão" },
      { status: 200 }
    )
  }
}
