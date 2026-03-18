import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { DocumentAnalysisAgent } from "@/lib/ai-agents"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { content } = body

    if (!content) {
      return NextResponse.json(
        { error: "Conteúdo do documento é obrigatório" },
        { status: 400 }
      )
    }

    const analysis = await DocumentAnalysisAgent.analyze(content)

    return NextResponse.json({
      success: true,
      analysis,
    })
  } catch (error) {
    console.error("Erro ao analisar documento:", error)
    return NextResponse.json(
      {
        error: "Erro ao analisar documento",
        analysis: {
          analysis: "Análise não disponível",
          highlights: [],
          riskLevel: "medium",
          recommendations: [
            "Verifique se a chave de API está configurada",
          ],
        },
      },
      { status: 500 }
    )
  }
}
