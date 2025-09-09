# Agenda PIX Crédito

Sistema de agendamento com integração PIX e gestão de crédito.

## 🐳 Docker Setup

### Pré-requisitos

- Docker
- Docker Compose

### Iniciar a aplicação

```bash
./start.sh
```

### Parar a aplicação

```bash
./stop.sh
```

## 📋 Serviços

- **Backend (API)**: http://localhost:8000
- **Documentação da API**: http://localhost:8000/docs  
- **Frontend**: http://localhost:3000

## 🔧 Comandos Docker Úteis

```bash
# Ver logs
docker-compose logs -f

# Ver logs de um serviço específico
docker-compose logs -f backend
docker-compose logs -f frontend

# Status dos containers
docker-compose ps

# Reconstruir imagens
docker-compose build --no-cache

# Reiniciar serviços
docker-compose restart

# Parar todos os serviços
docker-compose down

# Parar e remover volumes
docker-compose down -v
```

## 🏗️ Estrutura do Projeto

```
.
├── backend/              # API FastAPI
│   ├── main.py
│   └── Dockerfile
├── frontend/             # Interface web
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml    # Configuração dos serviços
├── start.sh             # Script para iniciar
├── stop.sh              # Script para parar
└── requirements.txt     # Dependências Python
```

## 🔄 Desenvolvimento

Para desenvolvimento, você pode modificar os arquivos e os containers irão recarregar automaticamente:

- O backend usa `--reload` do uvicorn
- O frontend usa volumes para sincronização em tempo real

## 🗃️ Banco de Dados

O SQLite está configurado em um volume persistente, então os dados serão mantidos entre reinicializações dos containers.
