# front/Dockerfile

# Étape 1 : Build
FROM node:alpine AS build
WORKDIR /app

# Copie des fichiers nécessaires
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du code source
COPY . .

# Build de l'application
RUN npm run build

# Étape 2 : Serveur Nginx minimal pour servir les fichiers statiques
FROM nginx:alpine

# Copie des fichiers compilés depuis l'étape précédente
COPY --from=build /app/dist /usr/share/nginx/html

# Exposition du port 5173
EXPOSE 5173

# Lancement de Nginx au premier plan
CMD ["nginx", "-g", "daemon off;"]
