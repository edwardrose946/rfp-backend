FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run tsc

EXPOSE 4000

CMD ["node", "./build/index.js"]