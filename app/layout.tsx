import { Metadata } from "next"

export const metadata: Metadata = {
  title: "SistemaIntegrado - Gestão Jurídica",
  description: "Plataforma integrada de gestão para escritórios de advocacia",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: "#1e293b", color: "white", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  )
}
