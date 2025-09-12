FROM node:20-alpine

WORKDIR /app

# Install dependencies first (cached if package files unchanged)
COPY package*.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

EXPOSE 5173

# Run Vite dev server, binding to all interfaces for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]


