FROM node:18-alpine AS next-domotica
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
EXPOSE 3000
RUN npm run build
CMD ["npm", "start"]


# FROM node:18 AS server-build
# WORKDIR /root/
# COPY --from=ui-build /usr/src/app/my-app/out ./my-app/out
# COPY api/package*.json ./api/
# RUN cd api && npm install
# COPY api/server.js ./api/

# EXPOSE 3080

# CMD ["node", "./api/server.js"]

#base image
# FROM node:18-alpine

# # set working directory

# RUN mkdir -p /usr/src/app/
# WORKDIR /usr/src/app/

# # copy from to
# COPY ./ ./

# RUN npm install
# RUN npm run build

# EXPOSE 3000

# CMD ["npm", "start"]

