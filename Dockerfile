# Stage 1: Build the React app
FROM node:18-alpine AS builder
WORKDIR /app
# Copy package files first to leverage caching
COPY package*.json ./
RUN npm install
# Copy the rest of the source code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the built files with Nginx
FROM nginx:alpine
# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*
# Copy the production build from builder
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]