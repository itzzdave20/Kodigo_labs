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

# Use Gmail/SMTP when credentials exist; otherwise keep inquiries in the log.
if [ -n "${MAIL_USERNAME}" ] && [ -n "${MAIL_PASSWORD}" ]; then
  export MAIL_MAILER="${MAIL_MAILER:-smtp}"
  export MAIL_HOST="${MAIL_HOST:-smtp.gmail.com}"
  export MAIL_PORT="${MAIL_PORT:-587}"
  export MAIL_SCHEME="${MAIL_SCHEME:-smtp}"
  export MAIL_ENCRYPTION="${MAIL_ENCRYPTION:-tls}"
  export MAIL_FROM_ADDRESS="${MAIL_FROM_ADDRESS:-$MAIL_USERNAME}"
  export MAIL_TO_ADDRESS="${MAIL_TO_ADDRESS:-$MAIL_USERNAME}"
else
  echo "SMTP credentials missing; using log mailer."
  export MAIL_MAILER=log
fi

# Render terminates TLS; artisan serve only sees HTTP unless we force HTTPS URLs.
case "${APP_URL}" in
  http://*)
    export APP_URL="https://${APP_URL#http://}"
    ;;
esac
if [ -z "${APP_URL}" ]; then
  export APP_URL="https://kodigo-labs.onrender.com"
fi
export ASSET_URL="${ASSET_URL:-$APP_URL}"

php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

exec php artisan serve --host=0.0.0.0 --port="${PORT:-10000}"
