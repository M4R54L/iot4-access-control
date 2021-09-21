FROM node:16-alpine3.11
    RUN npm install -g npm@latest
    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 3000
    CMD [ "npm", "run", "start" ]