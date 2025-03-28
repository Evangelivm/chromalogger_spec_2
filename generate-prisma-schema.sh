#!/bin/bash

# Rutas de archivos
CONFIG_FILE="src/config/connections.config.ts"
CODE_MAP_FILE="src/tcp/code-map.ts" 
SCHEMA_FILE="prisma/schema.prisma"

## ---------------------------
## 1. VALIDACIÓN INICIAL
## ---------------------------

# Verificar archivos de configuración
if [ ! -f "$CONFIG_FILE" ]; then
    echo "Error: No se encontró $CONFIG_FILE"
    exit 1
fi

if [ ! -f "$CODE_MAP_FILE" ]; then
    echo "Error: No se encontró $CODE_MAP_FILE"
    exit 1
fi

if [ ! -d "$(dirname "$SCHEMA_FILE")" ]; then
    echo "Error: La carpeta 'prisma' no existe"
    exit 1
fi

## ---------------------------
## 2. EXTRACCIÓN DE DATOS
## ---------------------------

# Extraer nombres de tablas
TABLES=$(grep -E "tableName: '" "$CONFIG_FILE" | sed -E "s/.*tableName: '([^']+)'.*/\1/")

# Extraer nombres de campos de codeMap (SOLO db_name)
FIELDS=$(grep -A 1 -E "'[0-9]+':" "$CODE_MAP_FILE" | grep "db_name:" | sed -E "s/.*db_name: '([^']+)'.*/\1/" | sort -u)

# Verificar datos extraídos
if [ -z "$TABLES" ]; then
    echo "Error: No se encontraron tablas en $CONFIG_FILE"
    exit 1
fi

if [ -z "$FIELDS" ]; then
    echo "Error: No se encontraron campos en $CODE_MAP_FILE"
    exit 1
fi

## ---------------------------
## 3. GENERACIÓN DEL SCHEMA
## ---------------------------

# Crear archivo temporal
TMP_FILE=$(mktemp)

# Escribir encabezado
cat > "$TMP_FILE" << 'HEADER'
// Schema generado automáticamente - $(date)
// Basado en:
// - $CONFIG_FILE
// - $CODE_MAP_FILE

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

HEADER

# Función para generar campos dinámicos
generate_fields() {
    for FIELD in $FIELDS; do
        printf "  %-15s String?   @db.VarChar(255)\n" "$FIELD"
    done
}

# Generar cada modelo
for TABLE in $TABLES; do
    cat >> "$TMP_FILE" << MODEL
model $TABLE {
  id           Int       @id @default(autoincrement())
$(generate_fields)
  data         String?   @db.Text
  time         DateTime? @db.DateTime(0)
}

MODEL
done

## ---------------------------
## 4. GUARDADO Y RESULTADO
## ---------------------------

# Mover a ubicación final
mv "$TMP_FILE" "$SCHEMA_FILE"

# Mostrar resumen
echo "✅ Schema generado exitosamente en: $SCHEMA_FILE"
echo "📋 Modelos creados:"
echo "$TABLES" | awk '{print " - " $0}'
echo "🔢 Campos por modelo (${#FIELDS[@]}):"
printf " - %s\n" "${FIELDS[@]}"
echo "➕ Campos fijos: id, data, time"