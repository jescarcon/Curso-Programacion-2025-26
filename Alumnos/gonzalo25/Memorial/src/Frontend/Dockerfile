# Etapa de build
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm install && npm install esbuild@latest --force
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]