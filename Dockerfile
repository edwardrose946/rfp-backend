FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN echo $(ls -a)

EXPOSE 4000

CMD ["node", "./build/index.js"]