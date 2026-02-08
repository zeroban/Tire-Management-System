FROM node:20-alpine

# Create app directory
WORKDIR /app

# Installs dependencies first (for better caching)
COPY package*.json ./
RUN npm ci --omit=dev

# Copys app source
COPY . .

# Environment
ENV NODE_ENV=production
ENV PORT=3000

# port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
