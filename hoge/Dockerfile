FROM node:21.6.1-bookworm-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g npm@10.4.0 && npm install

COPY . .
EXPOSE 8080

CMD [ "node", "app.js" ]