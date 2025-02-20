# back/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Installer les dépendances système nécessaires pour compiler bcrypt et OpenSSL
RUN apk add --no-cache python3 py3-pip make g++ openssl

# Copier uniquement les fichiers de dépendances (pour bénéficier du cache Docker)
COPY package*.json ./

# Installer les dépendances et forcer la recompilation de bcrypt dans le conteneur
RUN npm install

# Copier le reste du code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate dev

# Appliquer les migrations pour créer les tables
# RUN npx prisma migrate dev --name init

# Exposer le port de l'API
EXPOSE 3000

# Démarrer l'application
# CMD ["npm", "start"]
