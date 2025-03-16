# Stage 1: Build the Angular app
FROM node:12-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli@11.2.2 && npm install
COPY . .
RUN ng build --prod

# Stage 2: Serve the app with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/architectui-angular-free /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]