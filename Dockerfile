FROM node:current-alpine

WORKDIR /var/www/jnex

COPY . .

EXPOSE 3000

CMD [ "node", "index.js" ]
