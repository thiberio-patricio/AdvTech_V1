"use client"

export default function ProcessosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Processos</h1>
      <p className="text-muted-foreground mt-2">
        Acompanhe todos os processos jurídicos
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Em Andamento</h3>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Concluídos</h3>
          <p className="text-2xl font-bold mt-2">23</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Aguardando</h3>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
      </div>
    </div>
  )
}
