# Usa una imagen base de Node.js
FROM node:18

# Instala mysql-client para poder verificar la base de datos
RUN apt-get update && apt-get install -y default-mysql-client \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto necesarios para instalar dependencias
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

# Limpia la caché de npm para evitar problemas anteriores
RUN npm cache clean --force

# Instala las dependencias
RUN npm install

# Genera el cliente de Prisma
RUN npx prisma generate

# Copia el resto de los archivos del proyecto
COPY . .

# Copia el script de inicialización y dale permisos de ejecución
COPY init.sh generate-prisma-schema.sh ./
RUN chmod +x init.sh generate-prisma-schema.sh

# Compila el código TypeScript
RUN npm run build

# Expone el puerto que usará la aplicación
EXPOSE 3000

# Usa el script de inicialización como punto de entrada
CMD ["./init.sh"]