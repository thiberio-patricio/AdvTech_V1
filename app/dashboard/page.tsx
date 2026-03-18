"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const clientsData = [
  { name: "Jan", clientes: 12, processos: 19, documentos: 29 },
  { name: "Fev", clientes: 13, processos: 23, documentos: 31 },
  { name: "Mar", clientes: 15, processos: 28, documentos: 35 },
  { name: "Abr", clientes: 18, processos: 31, documentos: 38 },
  { name: "Mai", clientes: 22, processos: 35, documentos: 42 },
  { name: "Jun", clientes: 25, processos: 39, documentos: 45 },
]

const pleadingStatusData = [
  { name: "Ganhos", value: 35, fill: "#10b981" },
  { name: "Perdidos", value: 12, fill: "#ef4444" },
  { name: "Pendentes", value: 23, fill: "#f59e0b" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Bem-vindo ao seu painel de controle
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Clientes Ativos"
          value="24"
          change="+2"
          icon="👥"
        />
        <StatCard
          title="Processos em Andamento"
          value="18"
          change="+3"
          icon="⚖️"
        />
        <StatCard
          title="Documentos"
          value="142"
          change="+12"
          icon="📄"
        />
        <StatCard
          title="Prazos Próximos"
          value="7"
          change="-1"
          icon="⏰"
        />
      </div>

      {/* Charts */}
      <Tabs defaultValue="growth" className="w-full">
        <TabsList>
          <TabsTrigger value="growth">Crescimento</TabsTrigger>
          <TabsTrigger value="pleadings">Status Processos</TabsTrigger>
        </TabsList>

        <TabsContent value="growth">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Crescimento de Atividades
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={clientsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clientes" fill="#3b82f6" name="Clientes" />
                <Bar dataKey="processos" fill="#8b5cf6" name="Processos" />
                <Bar dataKey="documentos" fill="#10b981" name="Documentos" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="pleadings">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Status dos Processos
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pleadingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pleadingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
        <div className="space-y-4">
          <ActivityItem
            title="Novo cliente adicionado"
            description="João Silva - Consultoria"
            time="Há 2 horas"
            icon="✨"
          />
          <ActivityItem
            title="Prazo aproximando"
            description="Processo #2024-001 vence em 3 dias"
            time="Há 5 horas"
            icon="⚠️"
          />
          <ActivityItem
            title="Documento enviado"
            description="Contrato assinado por Cliente XYZ"
            time="Há 8 horas"
            icon="📬"
          />
          <ActivityItem
            title="Parecer jurídico gerado"
            description="IA analisou: opinião positiva"
            time="Hoje às 14:30"
            icon="🤖"
          />
        </div>
      </Card>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: string
}

function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs text-green-600 mt-2">{change} desde mês passado</p>
        </div>
        <p className="text-4xl">{icon}</p>
      </div>
    </Card>
  )
}

interface ActivityItemProps {
  title: string
  description: string
  time: string
  icon: string
}

function ActivityItem({ title, description, time, icon }: ActivityItemProps) {
  return (
    <div className="flex items-start space-x-4 pb-4 border-b last:border-0 last:pb-0">
      <p className="text-2xl">{icon}</p>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}
