FROM nginx:alpine

# Remover configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar apenas arquivos do frontend (excluindo Dockerfile e nginx.conf)
COPY index.html /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY styles.css /usr/share/nginx/html/

# Expor porta 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
