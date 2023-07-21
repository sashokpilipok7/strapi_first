# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the Next.js application
COPY . .

# Build the Next.js app
RUN npm run build

# Set the environment to production
ENV NODE_ENV=production

# Start the Next.js app
CMD ["npm", "start"]
