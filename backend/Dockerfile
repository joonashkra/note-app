FROM node:20 as build
  
WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

RUN npm run build

ENV DEBUG=backend:*
  
USER node

CMD ["npm", "start"]