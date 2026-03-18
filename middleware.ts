import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar se o usuário está autenticado
  const user = request.cookies.get("user")?.value
  const escritorio = request.cookies.get("escritorio")?.value

  // Se não estiver autenticado, redirecionar para o login
  if (!user || !escritorio) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // Verificar se o usuário pertence ao escritório correto
    const userData = JSON.parse(user)
    const escritorioData = JSON.parse(escritorio)

    // Verificar se o usuário está tentando acessar dados de outro escritório
    const url = request.nextUrl.pathname
    const escritorioIdInUrl = url.match(/\/escritorios\/([^/]+)/)

    if (escritorioIdInUrl && escritorioIdInUrl[1] !== escritorioData.id) {
      // Tentativa de acesso a dados de outro escritório
      return NextResponse.redirect(new URL("/acesso-negado", request.url))
    }

    // Verificar permissões para a rota atual
    // Isso seria implementado com base nas rotas e permissões necessárias

    return NextResponse.next()
  } catch (error) {
    console.error("Erro no middleware:", error)
    return NextResponse.redirect(new URL("/login", request.url))
  }
}

// Configurar as rotas que devem passar pelo middleware
export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
}

