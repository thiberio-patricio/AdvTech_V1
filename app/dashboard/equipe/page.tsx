"use client"

export default function EquipePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Equipe</h1>
      <p className="text-muted-foreground mt-2">
        Gerencie membros da sua equipe
      </p>
      
      <div className="mt-8 space-y-4">
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Administrador</h3>
            <p className="text-sm text-muted-foreground">admin@advtech.com</p>
          </div>
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
            Ativo
          </span>
        </div>
        <div className="p-4 border rounded-lg flex items-center justify-between">
          <div>
            <h3 className="font-semibold">João Silva</h3>
            <p className="text-sm text-muted-foreground">joao@advtech.com</p>
          </div>
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded">
            Ativo
          </span>
        </div>
      </div>
    </div>
  )
}
