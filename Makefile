.PHONY: help dev prod build clean docker-dev docker-prod docker-stop docker-logs docker-clean

help: ## Mostra esta ajuda
	@echo "🚀 NoPIX - Comandos disponíveis:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## Executa o projeto em modo desenvolvimento
	npm run dev

prod: ## Executa o projeto em modo produção
	npm run build
	npm run preview

build: ## Faz o build do projeto
	npm run build

clean: ## Limpa arquivos de build
	rm -rf dist node_modules
	npm install

docker-dev: ## Executa o projeto em Docker (desenvolvimento)
	docker-compose up agenda-dev

docker-prod: ## Executa o projeto em Docker (produção)
	docker-compose up agenda-app

docker-stop: ## Para todos os serviços Docker
	docker-compose down

docker-logs: ## Mostra logs dos serviços Docker
	docker-compose logs -f

docker-clean: ## Limpa tudo do Docker
	docker-compose down -v --remove-orphans
	docker system prune -f

docker-build: ## Rebuild das imagens Docker
	docker-compose build --no-cache

install: ## Instala dependências
	npm install

lint: ## Executa o linter
	npm run lint

test: ## Executa testes (se configurado)
	npm test

start: ## Inicia o projeto (alias para dev)
	@make dev
