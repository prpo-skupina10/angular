# Build
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production


#Runtime
FROM nginx:1.25-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/sportly-ui/browser /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
