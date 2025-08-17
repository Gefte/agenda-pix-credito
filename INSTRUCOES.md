# 🚀 Instruções Rápidas - NoPIX

## ⚡ Início Rápido

### 1. Com Docker (Recomendado)
```bash
# Opção mais fácil - use o script interativo
./start.sh

# Ou use o Makefile
make docker-dev      # Desenvolvimento
make docker-prod     # Produção
```

### 2. Com Makefile
```bash
# Ver todos os comandos disponíveis
make help

# Executar em desenvolvimento
make dev

# Executar em produção
make prod

# Comandos Docker
make docker-dev      # Docker desenvolvimento
make docker-prod     # Docker produção
make docker-stop     # Parar Docker
```

### 3. Com Docker Compose diretamente
```bash
# Desenvolvimento (com hot reload)
docker-compose up agenda-dev

# Produção
docker-compose up agenda-app

# Docker Compose simplificado
docker-compose -f docker-compose.simple.yml up agenda-dev
```

## 🌐 URLs de Acesso

- **Desenvolvimento**: http://localhost:5173
- **Produção**: http://localhost:3000

## 📱 Funcionalidades do App

### Páginas Principais:
- **`/`** - Landing page com carrossel das telas do app
- **`/feed`** - Feed de serviços recomendados
- **`/busca`** - Busca e comparação de serviços
- **`/perfil`** - Gestão de crédito e despesas

### Carrossel das Telas:
- **Feed de Serviços** - Serviços recomendados personalizados
- **Busca de Serviços** - Encontre e compare serviços
- **Meu Crédito** - Gerencie crédito e despesas
- **Dashboard Empresa** - Visão completa para empresas

## 🔧 Comandos Úteis

### Docker
```bash
# Parar todos os serviços
docker-compose down

# Ver logs
docker-compose logs -f agenda-dev

# Rebuild
docker-compose build --no-cache

# Limpar tudo
docker system prune -f
```

### Desenvolvimento Local
```bash
# Instalar dependências
npm install

# Executar
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 🎨 Design System

O app segue o design mobile-first baseado nos arquivos HTML da pasta `design/`:
- **Cores**: Verde (#639155), Verde escuro (#121a0f)
- **Layout**: Mobile-first com max-width de 384px
- **Tipografia**: Manrope + Noto Sans

## 🚨 Solução de Problemas

### Docker não inicia:
```bash
# Verificar se Docker está rodando
docker --version
docker-compose --version

# Limpar e rebuild
make docker-clean
make docker-build
```

### Porta já em uso:
```bash
# Parar todos os serviços
make docker-stop

# Ou matar processo na porta
sudo lsof -ti:3000 | xargs kill -9
```

### Hot reload não funciona:
- Verifique se está usando `make docker-dev` ou `docker-compose up agenda-dev`
- O modo produção não tem hot reload

## 📞 Suporte

- **Documentação completa**: README.md
- **Script interativo**: ./start.sh
- **Comandos rápidos**: make help
- **Docker Compose**: docker-compose.yml

---

**🎯 Dica**: Use `./start.sh` para uma experiência mais amigável!
