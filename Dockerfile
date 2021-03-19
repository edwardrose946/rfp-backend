FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm run tsc

COPY . .

EXPOSE 4000

CMD ["node", "./build/index.js"]