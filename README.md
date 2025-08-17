# NoPIX - App de Serviços e Crédito

Uma aplicação moderna para contratação de serviços domésticos com sistema de crédito integrado, baseada nos designs HTML fornecidos.

## 🚀 Funcionalidades

### 📱 Páginas Principais
- **Feed de Usuário** (`/feed`) - Serviços recomendados personalizados
- **Busca de Serviços** (`/busca`) - Pesquisa e comparação de serviços
- **Perfil do Usuário** (`/perfil`) - Gestão de crédito e despesas
- **Landing Page** (`/`) - Apresentação da empresa com carrossel das telas do app

### 💳 Sistema de Crédito
- Visualização de limite disponível e bloqueado
- Acompanhamento de despesas mensais
- Histórico de serviços contratados
- Sistema de parcelamentos ativos

### 🔍 Busca de Serviços
- Filtros por categoria
- Avaliações e preços
- Localização dos prestadores
- Sistema de favoritos

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Query
- **Database**: Supabase (conectado na nuvem)

## 🐳 Execução com Docker

### Opção 1: Produção
```bash
# Build e execução da versão de produção
docker-compose up agenda-app

# Acesse: http://localhost:3000
```

### Opção 2: Desenvolvimento (com hot reload)
```bash
# Build e execução da versão de desenvolvimento
docker-compose up agenda-dev

# Acesse: http://localhost:5173
```

### Opção 3: Docker Compose simples
```bash
# Usando o docker-compose simplificado
docker-compose -f docker-compose.simple.yml up agenda-dev

# Acesse: http://localhost:5173
```

### Comandos úteis
```bash
# Parar todos os serviços
docker-compose down

# Rebuild das imagens
docker-compose build --no-cache

# Ver logs
docker-compose logs -f agenda-dev

# Executar em background
docker-compose up -d
```

## 🚀 Execução Local (sem Docker)

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes base (Shadcn/ui)
│   ├── HeroSection.tsx # Seção principal da landing
│   ├── BusinessSection.tsx # Seção de negócios
│   ├── AppCarousel.tsx # Carrossel das telas do app
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Landing page
│   ├── FeedUsuario.tsx # Feed de serviços
│   ├── PerfilUsuario.tsx # Perfil e crédito
│   └── BuscaServicos.tsx # Busca de serviços
├── hooks/              # Hooks customizados
├── lib/                # Utilitários
└── integrations/       # Integrações externas
```

## 🎨 Design System

O app segue o design system baseado nos arquivos HTML da pasta `design/`:
- **Cores principais**: Verde (#639155), Verde escuro (#121a0f)
- **Background**: Cinza claro (#f9fbf9)
- **Tipografia**: Manrope + Noto Sans
- **Layout**: Mobile-first com max-width de 384px (max-w-sm)

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env.local`:
```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### Supabase
O projeto está configurado para usar o Supabase na nuvem. Para configurar:
1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as variáveis de ambiente
3. Execute as migrações: `npx supabase db push`

## 📱 Responsividade

O app é otimizado para dispositivos móveis com:
- Layout mobile-first
- Navegação por tabs
- Componentes touch-friendly
- Design adaptativo

## 🚀 Deploy

### Build de Produção
```bash
# Build otimizado
npm run build

# Os arquivos ficam em dist/
```

### Docker Production
```bash
# Build da imagem
docker build -t nopix-app .

# Execução
docker run -p 3000:3000 nopix-app
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos canais oficiais da empresa.
