FROM node:8-alpine

ENV NODE_ENV production

RUN mkdir /app
WORKDIR /app

COPY package-lock.json /app
COPY package.json /app

RUN npm install

COPY . /app
RUN npm run build

EXPOSE 400

CMD ["node", "./server"]