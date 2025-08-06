# Base stage
FROM node:18-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Development stage
FROM base AS development
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Production stage
FROM base AS production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]