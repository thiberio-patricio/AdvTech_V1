import { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "sonner"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "SistemaIntegrado - Gestão Jurídica",
  description: "Plataforma integrada de gestão para escritórios de advocacia",
  keywords: [
    "gestão jurídica",
    "advocacia",
    "clientes",
    "processos",
    "documentos",
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
