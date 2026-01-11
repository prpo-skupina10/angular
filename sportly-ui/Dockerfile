# =========================
# 1️⃣ BUILD STAGE
# =========================
FROM node:20-alpine AS build

WORKDIR /app

# Kopiramo package datoteke
COPY package*.json ./

# Namestimo dependencyje
RUN npm ci

# Kopiramo preostalo kodo
COPY . .

# Build za production
RUN npm run build -- --configuration production


# =========================
# 2️⃣ RUNTIME STAGE (NGINX)
# =========================
FROM nginx:1.25-alpine

# Pobrišemo default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Dodamo naš nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopiramo buildane datoteke
COPY --from=build /app/dist/sportly-ui/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
