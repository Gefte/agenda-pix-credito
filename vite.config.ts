import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: 'public',
  // Configuração para servir os arquivos HTML da pasta design
  assetsInclude: ['**/*.html'],
  server: {
    host: '0.0.0.0', // Permite acesso externo (necessário para Docker)
    port: 5173,
    watch: {
      usePolling: true, // Necessário para funcionar com Docker no Windows/Mac
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
})
