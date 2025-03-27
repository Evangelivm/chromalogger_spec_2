#!/bin/bash

echo "Waiting for MySQL to be ready..."
until mysql -h"db_container_name" -u"root" -p"rootpassword" -e "SELECT 1" >/dev/null 2>&1
do
    echo "Waiting for database connection..."
    sleep 5
done

# Verificar si las tablas existen
TABLE_EXISTS=$(mysql -h"db_container_name" -u"root" -p"rootpassword" test_chroma -e "SHOW TABLES LIKE 'test_record_1';" 2>/dev/null)

if [ -z "$TABLE_EXISTS" ]; then
    echo "Tables do not exist. Running prisma db push..."
    npx prisma db push
else
    echo "Tables already exist. Skipping prisma db push..."
fi

# Inicia la aplicación
npm run start:prod