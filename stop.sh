#!/bin/bash

# Script para parar a aplicação Docker Compose
# Autor: Sistema de Agenda PIX Crédito

set -e

echo "🛑 Parando aplicação Agenda PIX Crédito..."

# Parar e remover containers
docker-compose down --remove-orphans

echo "🧹 Limpando recursos não utilizados..."
docker system prune -f

echo "✅ Aplicação parada com sucesso!"
echo ""
echo "💡 Para iniciar novamente, execute: ./start.sh"
