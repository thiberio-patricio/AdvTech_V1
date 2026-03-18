"use client"

export default function ConfiguracoesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Configurações</h1>
      <p className="text-muted-foreground mt-2">
        Configure seu sistema e preferências
      </p>
      
      <div className="mt-8 space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Tema</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Sistema (segue preferência do sistema operacional)
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Integrações</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Configure integrações com sistemas externos
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Notificações</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Gerencie suas preferências de notificações
          </p>
        </div>
      </div>
    </div>
  )
}
