# Stage 1: Build the Angular app
FROM node:12-alpine as build

# Set the working directory inside the Docker image
WORKDIR /app

# Copy package.json and package-lock.json to work directory
COPY package.json package-lock.json ./

# Install Angular CLI and node packages
RUN npm install -g @angular/cli@11.2.2 && npm install

# Copy the rest of the app's source code from the host to the container
COPY . .

# Build the project for production
RUN ng build 

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Remove the default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built files from the build stage to the Nginx serve directory
COPY --from=build /app/dist/architectui-angular-free /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
