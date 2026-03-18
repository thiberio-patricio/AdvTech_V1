"use client"

export default function PrazosPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Prazos</h1>
      <p className="text-muted-foreground mt-2">
        Acompanhe prazos e datas importantes
      </p>
      
      <div className="mt-8 space-y-4">
        <div className="p-4 border rounded-lg border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-50">Próximos 7 dias</h3>
          <p className="text-sm text-yellow-800 dark:text-yellow-200 mt-2">
            Processo #2024-001 vence em 3 dias
          </p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Próximos 30 dias</h3>
          <p className="text-sm text-muted-foreground mt-2">
            5 prazos programados
          </p>
        </div>
      </div>
    </div>
  )
}
