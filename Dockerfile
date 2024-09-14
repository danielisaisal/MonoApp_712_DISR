# Imagen base (para este caso se utilizo node en su version 21.6.2)
FROM node:21.6.2
# Create app directory
WORKDIR /app
# Copiar el package.json
COPY package*.json ./
# Correr la instalacion (para los node_modules)
RUN npm i
# Copiar todo y pegar todo en el contenedor
COPY . .
# Correr el comando de build espesificado en el package.json
RUN npm run build
# En que puerto se va a ejecutar
EXPOSE 3000
# Ejecucion del comando para correr la aplicacion
CMD ["node","dist/src/app.js"]