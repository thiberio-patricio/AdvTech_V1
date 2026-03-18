"use client"

export default function ClientesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Clientes</h1>
      <p className="text-muted-foreground mt-2">
        Gerencie seus clientes e informações importantes
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Total de Clientes</h3>
          <p className="text-2xl font-bold mt-2">24</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Clientes Ativos</h3>
          <p className="text-2xl font-bold mt-2">18</p>
        </div>
      </div>
    </div>
  )
}
