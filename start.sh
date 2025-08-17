#!/bin/bash

echo "🚀 NoPIX - Inicializador"
echo "========================"
echo ""

# Verificar se o Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não está instalado. Por favor, instale o Docker primeiro."
    exit 1
fi

# Verificar se o Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não está instalado. Por favor, instale o Docker Compose primeiro."
    exit 1
fi

echo "✅ Docker e Docker Compose encontrados!"
echo ""

# Menu de opções
echo "Escolha uma opção:"
echo "1) 🚀 Executar em modo desenvolvimento (com hot reload)"
echo "2) 🏭 Executar em modo produção"
echo "3) 🛑 Parar todos os serviços"
echo "4) 🔄 Rebuild das imagens"
echo "5) 📊 Ver logs"
echo "6) 🧹 Limpar tudo (parar e remover containers)"
echo "7) ❌ Sair"
echo ""

read -p "Digite sua opção (1-7): " choice

case $choice in
    1)
        echo "🚀 Iniciando modo desenvolvimento..."
        docker-compose -f docker-compose.simple.yml up agenda-dev
        ;;
    2)
        echo "🏭 Iniciando modo produção..."
        docker-compose up agenda-app
        ;;
    3)
        echo "🛑 Parando todos os serviços..."
        docker-compose down
        ;;
    4)
        echo "🔄 Rebuild das imagens..."
        docker-compose build --no-cache
        echo "✅ Rebuild concluído!"
        ;;
    5)
        echo "📊 Mostrando logs..."
        docker-compose logs -f
        ;;
    6)
        echo "🧹 Limpando tudo..."
        docker-compose down -v --remove-orphans
        docker system prune -f
        echo "✅ Limpeza concluída!"
        ;;
    7)
        echo "👋 Até logo!"
        exit 0
        ;;
    *)
        echo "❌ Opção inválida!"
        exit 1
        ;;
esac
