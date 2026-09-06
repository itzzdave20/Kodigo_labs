#!/bin/sh
set -e

if [ ! -f /var/www/html/.env ] && [ -f /var/www/html/.env.production ]; then
  cp /var/www/html/.env.production /var/www/html/.env
fi

# Render copied Railway placeholders as literal strings like ${MYSQLHOST}.
if echo "${DB_HOST}${DB_DATABASE}${DB_USERNAME}${DB_PASSWORD}${DB_URL}" | grep -q '\${'; then
  echo "Detected unresolved DB placeholders; using SQLite."
  export DB_CONNECTION=sqlite
  export DB_DATABASE=/var/www/html/database/database.sqlite
  unset DB_URL DB_HOST DB_PORT DB_USERNAME DB_PASSWORD
fi

if [ -z "${DB_HOST}" ] && [ "${DB_CONNECTION}" != "pgsql" ] && [ "${DB_CONNECTION}" != "postgres" ]; then
  export DB_CONNECTION=sqlite
  export DB_DATABASE="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
fi

if [ "${DB_CONNECTION}" = "sqlite" ] || [ -z "${DB_CONNECTION}" ]; then
  export DB_CONNECTION=sqlite
  export DB_DATABASE="${DB_DATABASE:-/var/www/html/database/database.sqlite}"
  mkdir -p "$(dirname "${DB_DATABASE}")"
  touch "${DB_DATABASE}"
  chmod 664 "${DB_DATABASE}"
fi

case "${MAIL_HOST}" in
  ''|smtp.mailpit.dev|127.0.0.1|localhost)
    export MAIL_MAILER=log
    ;;
esac

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
