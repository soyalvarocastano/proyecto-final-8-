# Usa una imagen base oficial de Node.js
FROM node:18.20.2-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias y luego instala
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto que usa tu app (ajústalo si usas otro)
EXPOSE 3000

# Comando por defecto para iniciar tu app
CMD ["npm", "run", "dev"]
