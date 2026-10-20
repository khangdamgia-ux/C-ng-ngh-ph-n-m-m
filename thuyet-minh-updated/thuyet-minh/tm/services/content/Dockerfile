FROM node:24-alpine
WORKDIR /app
COPY package.json ./
COPY shared ./shared
COPY services/content ./services/content
ENV NODE_ENV=production DATA_DIR=/data
VOLUME /data
CMD ["node", "services/content/index.js"]
