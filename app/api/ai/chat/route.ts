import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { ChatAssistant } from "@/lib/ai-agents"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: "Mensagem é obrigatória" },
        { status: 400 }
      )
    }

    const response = await ChatAssistant.respond(message)

    return NextResponse.json({
      success: true,
      response,
    })
  } catch (error) {
    console.error("Erro ao processar chat:", error)
    return NextResponse.json(
      { error: "Erro ao processar chat" },
      { status: 500 }
    )
  }
}
