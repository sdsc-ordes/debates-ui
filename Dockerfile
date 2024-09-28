FROM node:18

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the development port
EXPOSE 3000

# Default command to start the development server
CMD ["npm", "run", "dev", "--", "--host"]
