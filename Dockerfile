FROM node:12.16.3-alpine3.9

RUN mkdir -p /var/www/dockerize-nuxt/nuxt-app
WORKDIR /var/www/dockerize-nuxt/nuxt-app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4002

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=4002

CMD [ "npm", "start" ]