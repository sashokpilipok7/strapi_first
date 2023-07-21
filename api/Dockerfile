# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/api

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Strapi application
COPY . .

# Expose the Strapi port
EXPOSE 1337

# Start Strapi
CMD ["npm", "start"]
