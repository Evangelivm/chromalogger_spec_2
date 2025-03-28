#!/bin/bash

# Configuración
CONFIG_FILE="src/config/connections.config.ts"
COMPOSE_FILE="docker-compose.yml"
TEMP_FILE="${COMPOSE_FILE}.tmp"

# Extraer puertos del archivo de configuración
PORTS=$(grep -oP "port:\s*\K[0-9]+" "$CONFIG_FILE" | sort -u | xargs)

if [ -z "$PORTS" ]; then
  echo "Error: No se encontraron puertos en $CONFIG_FILE"
  exit 1
fi

echo "Actualizando puertos en $COMPOSE_FILE:"
echo "$PORTS" | tr ' ' '\n' | awk '{print " - " $1}'

# Generar nuevo bloque de puertos
PORTS_BLOCK="    ports:"
for port in $PORTS; do
  PORTS_BLOCK+="\n      - \"$port:$port\""
done

# Procesar el archivo YAML
awk -v ports_block="$PORTS_BLOCK" '
  BEGIN {in_ports=0}
  /^    ports:/ {
    print ports_block
    in_ports=1
    next
  }
  in_ports && /^      -/ { next }
  in_ports && !/^      -/ { in_ports=0 }
  { print }
' "$COMPOSE_FILE" > "$TEMP_FILE" && mv "$TEMP_FILE" "$COMPOSE_FILE"

echo "Actualización completada. Archivo $COMPOSE_FILE modificado solo en la sección de puertos."

# Ejecutar docker compose
echo "Iniciando servicios con Docker Compose..."
# docker compose up --build "$@"