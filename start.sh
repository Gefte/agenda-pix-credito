#!/bin/bash

# Script para inicializar e rodar a aplicação com Docker Compose
# Autor: Sistema de Agenda PIX Crédito
# Data: $(date)

set -e  # Parar execução se algum comando falhar

echo "🚀 Iniciando aplicação Agenda PIX Crédito..."

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

# Verificar se Docker está rodando
if ! docker info &> /dev/null; then
    echo "❌ Docker não está rodando. Por favor, inicie o Docker primeiro."
    exit 1
fi

echo "✅ Docker verificado com sucesso!"

# Função para fazer cleanup em caso de interrupção
cleanup() {
    echo "🛑 Parando aplicação..."
    docker-compose down
    exit 0
}

# Capturar sinais de interrupção
trap cleanup SIGINT SIGTERM

# Parar containers existentes (se houver)
echo "🧹 Limpando containers existentes..."
docker-compose down --remove-orphans

# Construir e iniciar os serviços
echo "🔨 Construindo imagens Docker..."
docker-compose build --no-cache

echo "🚀 Iniciando serviços..."
docker-compose up -d

echo "⏳ Aguardando serviços ficarem prontos..."
sleep 10

# Verificar se os serviços estão rodando
echo "🔍 Verificando status dos serviços..."

backend_status=$(docker-compose ps -q backend | xargs docker inspect --format='{{.State.Health.Status}}' 2>/dev/null || echo "starting")
frontend_status=$(docker-compose ps -q frontend | xargs docker inspect --format='{{.State.Health.Status}}' 2>/dev/null || echo "starting")

echo "Backend status: $backend_status"
echo "Frontend status: $frontend_status"

# Mostrar logs se algo não estiver funcionando
if [[ "$backend_status" != "healthy" ]]; then
    echo "⚠️  Backend pode não estar saudável. Logs do backend:"
    docker-compose logs backend --tail=20
fi

if [[ "$frontend_status" != "healthy" ]]; then
    echo "⚠️  Frontend pode não estar saudável. Logs do frontend:"
    docker-compose logs frontend --tail=20
fi

echo ""
echo "🎉 Aplicação iniciada com sucesso!"
echo ""
echo "📋 Informações dos serviços:"
echo "  🔧 Backend (API):     http://localhost:8000"
echo "  📊 Docs da API:       http://localhost:8000/docs"
echo "  🌐 Frontend:          http://localhost:3000"
echo ""
echo "📝 Comandos úteis:"
echo "  Ver logs:             docker-compose logs -f"
echo "  Parar aplicação:      docker-compose down"
echo "  Reiniciar:            docker-compose restart"
echo "  Status:               docker-compose ps"
echo ""
echo "💡 Pressione Ctrl+C para parar a aplicação"

# Seguir logs em tempo real
echo "📋 Seguindo logs da aplicação..."
docker-compose logs -f
