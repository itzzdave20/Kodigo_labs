FROM node:20-alpine AS frontend
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM php:8.2-cli-bookworm

RUN apt-get update && apt-get install -y --no-install-recommends \
        git unzip libzip-dev libpng-dev libonig-dev libxml2-dev libpq-dev libicu-dev libsqlite3-dev \
    && docker-php-ext-install -j$(nproc) pdo_mysql pdo_pgsql pdo_sqlite mbstring zip bcmath pcntl intl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .
COPY --from=frontend /app/public/build ./public/build

RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist \
    && mkdir -p \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
        database \
    && touch database/database.sqlite \
    && chmod -R 775 storage bootstrap/cache database \
    && chmod +x docker/start.sh \
    && cp .env.production .env


EXPOSE 10000

CMD ["sh", "docker/start.sh"]
