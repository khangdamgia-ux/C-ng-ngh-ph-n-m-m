FROM node:24-alpine
WORKDIR /app
COPY package.json ./
COPY gateway ./gateway
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "gateway/index.js"]
