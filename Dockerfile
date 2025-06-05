# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy env and package files
COPY .env .env
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
