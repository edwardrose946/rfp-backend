FROM node:14
ARG MONGODB_URI
ARG EPC_API_KEY
ARG GOOGLE_MAPS_API_KEY
ARG JWT_SECRET
ARG PROPERTYDATA_API_KEY

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run tsc

EXPOSE 4000

CMD ["node", "./build/index.js"]