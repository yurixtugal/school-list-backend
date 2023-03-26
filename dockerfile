# Base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source code
COPY . .

# Build the app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
