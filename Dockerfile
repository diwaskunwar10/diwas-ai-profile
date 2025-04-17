# Use a lightweight Node image
FROM node:20.11-slim

# Set working directory
WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm ci

# Install serve globally
RUN npm install -g serve

# Copy the rest of the app
COPY . .

# Create a script to replace API URLs at runtime using environment variables
RUN echo '#!/bin/sh\n\
echo "Creating .env.production file with runtime environment variables..."\n\
echo "VITE_BACKEND_URL=\${VITE_BACKEND_URL}" > .env.production\n\
echo "Building the application..."\n\
npm run build\n\
echo "Starting the server..."\n\
exec serve -s dist -l 3000\n\
' > /app/start.sh && chmod +x /app/start.sh

# Expose the port that serve will use
EXPOSE 3000

# Run the start script
CMD ["/app/start.sh"]
