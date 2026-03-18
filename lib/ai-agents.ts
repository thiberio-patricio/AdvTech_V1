/**
 * Serviço de Integração com Anthropic Claude
 * Para usar este serviço, configure a variável de ambiente ANTHROPIC_API_KEY
 */

export interface AIAgentConfig {
  model: "claude-3-5-sonnet-20241022" | "claude-3-opus-20240229"
  temperature?: number
  maxTokens?: number
  systemPrompt: string
}

export interface AnalysisResult {
  analysis: string
  highlights: string[]
  riskLevel: "low" | "medium" | "high"
  recommendations: string[]
}

// Tipo genérico para resposta de IA
export interface AIResponse {
  content: string
  usage?: {
    inputTokens: number
    outputTokens: number
  }
}

/**
 * Analisador de Documentos Jurídicos com IA
 * Analisa documentos para riscos, conformidade e sugestões
 */
export const DocumentAnalysisAgent = {
  config: {
    model: "claude-3-5-sonnet-20241022",
    temperature: 0.3,
    maxTokens: 2000,
    systemPrompt: `Você é um especialista em análise de documentos jurídicos com mais de 20 anos de experiência.
Sua tarefa é analisar documentos fornecidos e identificar:
1. Riscos legais potenciais
2. Cláusulas importantes
3. Conformidade com legislação
4. Recomendações de ajustes

Responda sempre em português brasileiro, de forma clara e estruturada.`,
  } as AIAgentConfig,

  async analyze(documentContent: string): Promise<AnalysisResult> {
    if (!process.env.ANTHROPIC_API_KEY) {
      return {
        analysis: "Serviço de IA não configurado",
        highlights: [],
        riskLevel: "medium",
        recommendations: [
          "Configure a chave ANTHROPIC_API_KEY para ativar análise com IA",
        ],
      }
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
          system: this.config.systemPrompt,
          messages: [
            {
              role: "user",
              content: `Por favor, analise o seguinte documento jurídico:\n\n${documentContent}`,
            },
          ],
        }),
      })

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`)
      }

      const data = await response.json()
      const analysisText =
        data.content[0].type === "text" ? data.content[0].text : ""

      return {
        analysis: analysisText,
        highlights: extractHighlights(analysisText),
        riskLevel: detectRiskLevel(analysisText),
        recommendations: extractRecommendations(analysisText),
      }
    } catch (error) {
      console.error("Erro ao analisar documento:", error)
      throw error
    }
  },
}

/**
 * Assistente de Prazos com IA
 * Sugere e identifica prazos importantes automaticamente
 */
export const DeadlineAssistant = {
  config: {
    model: "claude-3-5-sonnet-20241022",
    temperature: 0.5,
    maxTokens: 1500,
    systemPrompt: `Você é um assistente especializado em gestão de prazos jurídicos.
Baseado no histórico de casos e padrões, você:
1. Identifica prazos críticos automaticamente
2. Sugere datas de acompanhamento
3. Previne atrasos com alertas

Sempre responda em português brasileiro.`,
  } as AIAgentConfig,

  async suggestDeadlines(
    caseHistory: string,
    clientProfile: string
  ): Promise<{
    suggestedDates: Array<{ date: Date; reason: string }>
    predictedDuration: number
    riskFactors: string[]
  }> {
    if (!process.env.ANTHROPIC_API_KEY) {
      return {
        suggestedDates: [],
        predictedDuration: 30,
        riskFactors: ["IA não configurada"],
      }
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
          system: this.config.systemPrompt,
          messages: [
            {
              role: "user",
              content: `Histórico do caso:\n${caseHistory}\n\nPerfil do cliente:\n${clientProfile}\n\nSugira prazos críticos.`,
            },
          ],
        }),
      })

      if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`)

      const data = await response.json()
      const suggestion =
        data.content[0].type === "text" ? data.content[0].text : ""

      return {
        suggestedDates: parseDateSuggestions(suggestion),
        predictedDuration: 30,
        riskFactors: extractRiskFactors(suggestion),
      }
    } catch (error) {
      console.error("Erro ao sugerir prazos:", error)
      throw error
    }
  },
}

/**
 * Assistente de Chat com IA
 * Fornece suporte e responde perguntas sobre o sistema
 */
export const ChatAssistant = {
  config: {
    model: "claude-3-5-sonnet-20241022",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: `Você é um assistente de suporte para um sistema de gestão jurídica chamado SistemaIntegrado.
Você ajuda usuários com:
1. Dúvidas sobre o sistema
2. Procedimentos operacionais
3. Boas práticas em gestão jurídica
4. Escalação para humanos quando necessário

Seja amigável, profissional e sempre em português brasileiro.`,
  } as AIAgentConfig,

  async respond(userMessage: string): Promise<AIResponse> {
    if (!process.env.ANTHROPIC_API_KEY) {
      return {
        content:
          "Desculpe, o serviço de IA não está configurado no momento.",
      }
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: this.config.model,
          max_tokens: this.config.maxTokens,
          temperature: this.config.temperature,
          system: this.config.systemPrompt,
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      })

      if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`)

      const data = await response.json()
      const content =
        data.content[0].type === "text" ? data.content[0].text : ""

      return {
        content,
        usage: {
          inputTokens: data.usage.input_tokens,
          outputTokens: data.usage.output_tokens,
        },
      }
    } catch (error) {
      console.error("Erro ao executar chat:", error)
      throw error
    }
  },
}

// Funções auxiliares
function extractHighlights(text: string): string[] {
  const highlights: string[] = []
  const lines = text.split("\n")

  lines.forEach((line) => {
    if (line.includes("risco") || line.includes("importante")) {
      highlights.push(line.trim())
    }
  })

  return highlights.slice(0, 5)
}

function detectRiskLevel(text: string): "low" | "medium" | "high" {
  const text_lower = text.toLowerCase()

  if (
    text_lower.includes("alto risco") ||
    text_lower.includes("muito preocupante")
  ) {
    return "high"
  }
  if (
    text_lower.includes("médio risco") ||
    text_lower.includes("atenção necessária")
  ) {
    return "medium"
  }
  return "low"
}

function extractRecommendations(text: string): string[] {
  const recommendations: string[] = []
  const lines = text.split("\n")

  lines.forEach((line) => {
    if (line.includes("recomend") || line.includes("suger")) {
      recommendations.push(line.replace(/^-\s*/, "").trim())
    }
  })

  return recommendations.slice(0, 5)
}

function parseDateSuggestions(
  text: string
): Array<{ date: Date; reason: string }> {
  return [
    {
      date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      reason: "Acompanhamento sugerido",
    },
  ]
}

function extractRiskFactors(text: string): string[] {
  const factors: string[] = []
  const lines = text.split("\n")

  lines.forEach((line) => {
    if (line.includes("risco")) {
      factors.push(line.trim())
    }
  })

  return factors.slice(0, 3)
}
