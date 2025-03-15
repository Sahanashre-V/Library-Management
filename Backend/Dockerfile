# Use official Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all backend files into the container
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Apply migrations (for production, use `prisma migrate deploy`)
RUN npx prisma migrate deploy

# Expose the port (should match docker-compose.yml)
EXPOSE 7070

# Start the backend server
CMD ["node", "server.js"]



