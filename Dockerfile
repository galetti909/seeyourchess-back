# Imagem base
FROM node:22-bookworm

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências primeiro (melhora cache)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código-fonte
COPY . .

# Compila o TypeScript (gera dist/)
RUN npm run build

# Expõe a porta da aplicação
EXPOSE 3000

# Roda o app compilado
CMD ["node", "dist/main.js"]
