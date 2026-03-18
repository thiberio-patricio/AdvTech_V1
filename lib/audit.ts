/**
 * Sistema de Auditoria
 *
 * Este módulo fornece funções para registrar atividades dos usuários
 * e detectar comportamentos suspeitos.
 */

export type AuditLogLevel = "info" | "warning" | "error" | "security"

export interface AuditLogEntry {
  id: string
  timestamp: Date
  userId: string
  userName: string
  action: string
  resource: string
  resourceId?: string
  details?: any
  ipAddress?: string
  userAgent?: string
  level: AuditLogLevel
}

// Classe para gerenciar logs de auditoria
export class AuditLogger {
  private static instance: AuditLogger
  private logs: AuditLogEntry[] = []
  private suspiciousActivities: AuditLogEntry[] = []

  private constructor() {
    // Singleton
  }

  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger()
    }
    return AuditLogger.instance
  }

  // Registrar uma atividade
  public log(entry: Omit<AuditLogEntry, "id" | "timestamp">): AuditLogEntry {
    const logEntry: AuditLogEntry = {
      id: this.generateId(),
      timestamp: new Date(),
      ...entry,
    }

    this.logs.push(logEntry)

    // Verificar se a atividade é suspeita
    if (this.isSuspiciousActivity(logEntry)) {
      this.suspiciousActivities.push(logEntry)
      this.notifySecurity(logEntry)
    }

    // Enviar para o servidor (simulado)
    this.sendToServer(logEntry)

    return logEntry
  }

  // Registrar um login
  public logLogin(
    userId: string,
    userName: string,
    success: boolean,
    ipAddress?: string,
    userAgent?: string,
  ): AuditLogEntry {
    return this.log({
      userId,
      userName,
      action: success ? "login.success" : "login.failed",
      resource: "auth",
      level: success ? "info" : "warning",
      details: { success },
      ipAddress,
      userAgent,
    })
  }

  // Registrar acesso a um recurso
  public logAccess(
    userId: string,
    userName: string,
    resource: string,
    resourceId?: string,
    details?: any,
  ): AuditLogEntry {
    return this.log({
      userId,
      userName,
      action: "access",
      resource,
      resourceId,
      level: "info",
      details,
    })
  }

  // Registrar uma modificação
  public logModification(
    userId: string,
    userName: string,
    resource: string,
    resourceId?: string,
    details?: any,
  ): AuditLogEntry {
    return this.log({
      userId,
      userName,
      action: "modify",
      resource,
      resourceId,
      level: "info",
      details,
    })
  }

  // Registrar uma exclusão
  public logDeletion(
    userId: string,
    userName: string,
    resource: string,
    resourceId?: string,
    details?: any,
  ): AuditLogEntry {
    return this.log({
      userId,
      userName,
      action: "delete",
      resource,
      resourceId,
      level: "warning",
      details,
    })
  }

  // Registrar um erro de segurança
  public logSecurityEvent(
    userId: string,
    userName: string,
    action: string,
    resource: string,
    details?: any,
  ): AuditLogEntry {
    return this.log({
      userId,
      userName,
      action,
      resource,
      level: "security",
      details,
    })
  }

  // Obter todos os logs
  public getLogs(): AuditLogEntry[] {
    return [...this.logs]
  }

  // Obter logs filtrados
  public getFilteredLogs(filter: Partial<AuditLogEntry>): AuditLogEntry[] {
    return this.logs.filter((log) => {
      for (const key in filter) {
        if ((filter as Record<string, any>)[key] !== (log as Record<string, any>)[key]) {
          return false
        }
      }
      return true
    })
  }

  // Obter atividades suspeitas
  public getSuspiciousActivities(): AuditLogEntry[] {
    return [...this.suspiciousActivities]
  }

  // Verificar se uma atividade é suspeita
  private isSuspiciousActivity(entry: AuditLogEntry): boolean {
    // Verificar falhas de login consecutivas
    if (entry.action === "login.failed") {
      const recentFailedLogins = this.logs.filter(
        (log) =>
          log.userId === entry.userId &&
          log.action === "login.failed" &&
          log.timestamp.getTime() > Date.now() - 10 * 60 * 1000, // Últimos 10 minutos
      )

      if (recentFailedLogins.length >= 5) {
        return true
      }
    }

    // Verificar acessos de locais incomuns
    if (entry.ipAddress) {
      const userLogs = this.logs.filter((log) => log.userId === entry.userId)
      const commonIPs = new Set(userLogs.map((log) => log.ipAddress))

      if (!commonIPs.has(entry.ipAddress) && userLogs.length > 10) {
        return true
      }
    }

    // Verificar ações sensíveis
    if (entry.action === "delete" && (entry.resource === "cliente" || entry.resource === "processo")) {
      return true
    }

    return false
  }

  // Notificar equipe de segurança sobre atividade suspeita
  private notifySecurity(entry: AuditLogEntry): void {
    console.warn("Atividade suspeita detectada:", entry)
    // Aqui seria implementada a notificação real (e-mail, SMS, etc.)
  }

  // Enviar log para o servidor
  private sendToServer(entry: AuditLogEntry): void {
    // Simulação de envio para o servidor
    console.log("Log enviado para o servidor:", entry)
  }

  // Gerar ID único para o log
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
}

// Exportar uma instância singleton
export const auditLogger = AuditLogger.getInstance()

