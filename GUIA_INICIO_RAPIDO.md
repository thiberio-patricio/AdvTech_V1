# Guia de Início Rápido - SistemaIntegrado

## 🚀 Instalação e Setup

### 1. Pré-requisitos
- Node.js 18+ 
- npm ou pnpm
- Chave de API Anthropic (opcional, para IA)

### 2. Instalação
```bash
# Instalar dependências
pnpm install

# ou com npm
npm install
```

### 3. Configurar Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar .env.local e adicionar suas chaves
```

### 4. Executar em Desenvolvimento
```bash
pnpm dev

# ou com npm
npm run dev
```

Acesse: **http://localhost:3000**

---

## 🔐 Login Demonstração

Use as seguintes credenciais para testar:

**Administrador:**
- Email: `admin@advtech.com`
- Senha: `admin123`

**Usuário Comum:**
- Email: `joao@advtech.com`
- Senha: `user123`

---

## 📁 Estrutura do Projeto

```
app/
├── layout.tsx          # Layout raiz com Provider
├── page.tsx            # Página inicial (redireciona)
├── login/
│   └── page.tsx        # Página de login
├── dashboard/
│   ├── layout.tsx      # Layout do dashboard
│   ├── page.tsx        # Painel principal
│   ├── clientes/       # Gerenciamento de clientes
│   ├── processos/      # Processos jurídicos
│   ├── documentos/     # Análise de documentos com IA
│   ├── prazos/         # Gestão de prazos
│   ├── financeiro/     # Financeiro
│   ├── equipe/         # Gerenciamento da equipe
│   └── configuracoes/  # Configurações do sistema
└── api/
    ├── auth/           # Rotas de autenticação
    │   ├── login/
    │   ├── logout/
    │   └── session/
    └── ai/             # Rotas de IA
        ├── analyze-document/
        └── chat/

components/
├── ui/                 # Componentes shadcn/ui
├── dashboard/          # Componentes do dashboard
│   ├── nav.tsx         # Navegação lateral
│   └── header.tsx      # Header do dashboard

contexts/
└── auth-context.tsx    # Contexto de autenticação

lib/
├── ai-agents.ts        # Agentes de IA
├── audit.ts            # Sistema de auditoria
├── crypto.ts           # Funções criptográficas
├── utils.ts            # Utilitários gerais
└── webhooks.ts         # Sistema de webhooks
```

---

## 🤖 Integrações de IA

### Análise de Documentos
A página de Documentos permite carregar arquivos (TXT, PDF, DOCX) para análise automática com IA.

- Acesse: `/dashboard/documentos`
- Carregue um arquivo
- Receba análise de riscos, recomendações e pontos-chave

### Chat com IA (Em desenvolvimento)
ChatAssistant fornece suporte e respostas a perguntas sobre o sistema.

### Sugestão de Prazos (Em desenvolvimento)
DeadlineAssistant analisa histórico e sugere prazos automáticamente.

---

## 🔌 Integração com Anthropic Claude

### Configurar
1. Crie uma conta em https://console.anthropic.com
2. Obtenha sua API Key
3. Adicione a `.env.local`:
   ```
   ANTHROPIC_API_KEY=sk_ant_xxxxxxxxxxxxx
   ```

### Modelos Disponíveis
- `claude-3-5-sonnet-20241022` (padrão, rápido e econômico)
- `claude-3-opus-20240229` (mais poderoso)

---

## 📝 Funcionalidades Principais

### ✅ Implementado
- ✅ Autenticação com simulação de usuários
- ✅ Sistema de permissões por papel
- ✅ Dashboard com gráficos
- ✅ Integração com Claude IA
- ✅ Análise de documentos
- ✅ Navegação entre seções
- ✅ UI moderna com Tailwind CSS
- ✅ Componentes reutilizáveis

### 🔄 Em Desenvolvimento
- 🔄 Banco de dados com Prisma
- 🔄 Gerenciamento completo de clientes
- 🔄 CRUD de processos e documentos
- 🔄 Chat com IA em tempo real
- 🔄 Webhooks para integrações externas

### 📋 Planejado
- 📋 Suporte a 2FA
- 📋 OAuth (Google, Microsoft)
- 📋 Anexação de arquivos
- 📋 Relatórios avançados
- 📋 Mobile app nativa

---

## 🧪 Build para Produção

```bash
# Build
pnpm build

# Iniciar servidor
pnpm start
```

---

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

---

## 💡 Dicas de Desenvolvimento

### Adicionar Nova Página
1. Crie arquivo em `app/dashboard/[seção]/page.tsx`
2. Use componentes do `components/ui/`
3. Importe `useAuth` para acessar dados do usuário

### Adicionar Nova API Route
1. Crie arquivo em `app/api/[rota]/route.ts`
2. Exporte handlers: `GET`, `POST`, `PUT`, `DELETE`
3. Use `NextResponse` para respostas

### Usar IA
```typescript
import { DocumentAnalysisAgent } from "@/lib/ai-agents"

const result = await DocumentAnalysisAgent.analyze(documentContent)
```

---

## 🐛 Troubleshooting

### "ANTHROPIC_API_KEY não definida"
- Adicione a chave em `.env.local`
- Reinicie o servidor: `pnpm dev`

### Erros de compilação TypeScript
- Execute: `pnpm build`
- Verifique tipos nos arquivos

### Login não funciona
- Verifique se está usando credenciais corretas (veja acima)
- Cookies podem estar desabilitados

---

## 📞 Suporte

Para dúvidas e sugestões, consulte a documentação ou abra uma issue.

**Versão:** 1.0.0  
**Última atualização:** 17/03/2026
