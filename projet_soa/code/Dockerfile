FROM node:20-alpine
WORKDIR /app

# Variables d'environnement
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Copie des fichiers de dépendances d'abord (meilleure utilisation du cache Docker)
COPY package*.json ./
COPY package-lock.json* ./

# Installation avec legacy-peer-deps comme vous le faites
RUN npm install --legacy-peer-deps

# Copie du reste du code
COPY . .

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]