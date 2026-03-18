/**
 * Sistema de Webhooks
 *
 * Este módulo fornece funções para gerenciar webhooks e enviar notificações
 * para sistemas externos.
 */

import crypto from "crypto"

export interface Webhook {
  id: string
  url: string
  eventos: string[]
  secreto?: string
  ativo: boolean
  dataCriacao: Date
  ultimoEnvio?: Date
  ultimoStatus?: number
}

export interface WebhookPayload {
  id: string
  evento: string
  data: any
  timestamp: string
}

// Classe para gerenciar webhooks
export class WebhookManager {
  private static instance: WebhookManager
  private webhooks: Webhook[] = []

  private constructor() {
    // Singleton
  }

  public static getInstance(): WebhookManager {
    if (!WebhookManager.instance) {
      WebhookManager.instance = new WebhookManager()
    }
    return WebhookManager.instance
  }

  // Registrar um novo webhook
  public registerWebhook(webhook: Omit<Webhook, "id" | "dataCriacao">): Webhook {
    const newWebhook: Webhook = {
      id: this.generateId(),
      dataCriacao: new Date(),
      ...webhook,
    }

    this.webhooks.push(newWebhook)
    return newWebhook
  }

  // Atualizar um webhook existente
  public updateWebhook(id: string, data: Partial<Webhook>): Webhook | null {
    const index = this.webhooks.findIndex((webhook) => webhook.id === id)
    if (index === -1) {
      return null
    }

    const updatedWebhook = {
      ...this.webhooks[index],
      ...data,
    }

    this.webhooks[index] = updatedWebhook
    return updatedWebhook
  }

  // Remover um webhook
  public removeWebhook(id: string): boolean {
    const initialLength = this.webhooks.length
    this.webhooks = this.webhooks.filter((webhook) => webhook.id !== id)
    return this.webhooks.length < initialLength
  }

  // Obter todos os webhooks
  public getWebhooks(): Webhook[] {
    return [...this.webhooks]
  }

  // Obter webhook por ID
  public getWebhookById(id: string): Webhook | null {
    return this.webhooks.find((webhook) => webhook.id === id) || null
  }

  // Disparar um evento para todos os webhooks inscritos
  public async triggerEvent(evento: string, data: any): Promise<void> {
    const webhooksToNotify = this.webhooks.filter((webhook) => webhook.ativo && webhook.eventos.includes(evento))

    if (webhooksToNotify.length === 0) {
      return
    }

    const payload: WebhookPayload = {
      id: this.generateId(),
      evento,
      data,
      timestamp: new Date().toISOString(),
    }

    // Enviar para cada webhook inscrito
    const promises = webhooksToNotify.map((webhook) => this.sendWebhook(webhook, payload))
    await Promise.allSettled(promises)
  }

  // Enviar payload para um webhook
  private async sendWebhook(webhook: Webhook, payload: WebhookPayload): Promise<void> {
    try {
      // Preparar cabeçalhos
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }

      // Adicionar assinatura se houver secreto
      if (webhook.secreto) {
        const signature = this.generateSignature(payload, webhook.secreto)
        headers["X-Webhook-Signature"] = signature
      }

      // Enviar requisição
      const response = await fetch(webhook.url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })

      // Atualizar status do webhook
      this.updateWebhook(webhook.id, {
        ultimoEnvio: new Date(),
        ultimoStatus: response.status,
      })

      // Verificar resposta
      if (!response.ok) {
        console.error(`Erro ao enviar webhook para ${webhook.url}: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      console.error(`Erro ao enviar webhook para ${webhook.url}:`, error)

      // Atualizar status do webhook
      this.updateWebhook(webhook.id, {
        ultimoEnvio: new Date(),
        ultimoStatus: 0, // Erro de conexão
      })
    }
  }

  // Gerar assinatura para o payload
  private generateSignature(payload: any, secreto: string): string {
    const hmac = crypto.createHmac("sha256", secreto)
    hmac.update(JSON.stringify(payload))
    return hmac.digest("hex")
  }

  // Gerar ID único para o webhook
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

// Exportar uma instância singleton
export const webhookManager = WebhookManager.getInstance()

