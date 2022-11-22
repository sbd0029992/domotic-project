FROM node:18-alpine AS next-domotica
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]