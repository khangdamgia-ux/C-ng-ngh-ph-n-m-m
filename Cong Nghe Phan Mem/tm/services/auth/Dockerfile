FROM node:24-alpine
WORKDIR /app
COPY package.json ./
COPY shared ./shared
COPY services/auth ./services/auth
ENV NODE_ENV=production DATA_DIR=/data
VOLUME /data
CMD ["node", "services/auth/index.js"]
