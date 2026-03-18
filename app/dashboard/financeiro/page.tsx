"use client"

export default function FinanceiroPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Financeiro</h1>
      <p className="text-muted-foreground mt-2">
        Gerenciar receitas, despesas e pagamentos
      </p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Receita do Mês</h3>
          <p className="text-2xl font-bold mt-2">R$ 45.200</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Despesas</h3>
          <p className="text-2xl font-bold mt-2">R$ 12.800</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold">Lucro Líquido</h3>
          <p className="text-2xl font-bold mt-2 text-green-600">R$ 32.400</p>
        </div>
      </div>
    </div>
  )
}
