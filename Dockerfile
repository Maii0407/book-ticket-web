# Use the official Node.js 14 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables for configuration
ENV NODE_ENV=production
ENV PORT=4407
ENV NEXT_PUBLIC_BOOK_TICKET_API_URL="http://localhost:3000"

# Expose the port that the Next.js application will run on
EXPOSE $PORT

# Build the Next.js application
RUN npm run build

# Start the Next.js application
CMD ["npm", "start"]