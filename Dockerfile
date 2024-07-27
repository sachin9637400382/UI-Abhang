# Use an official Node.js runtime as a parent image
FROM node:20.9.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Define environment variable
ENV NODE_ENV=production

# Run the application
#CMD ["npm", "start"]
CMD ["npm","start"]
