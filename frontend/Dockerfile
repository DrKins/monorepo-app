# Use an official Node.js image as a base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if applicable)
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the necessary port (e.g., for Vite preview)
EXPOSE 4173

# Set the command to run the app
CMD ["npm", "run", "dev"]