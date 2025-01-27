FROM node:20 as frontend-build

WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./ 
RUN npm run build

FROM node:20 as backend-build

WORKDIR /app/backend
COPY ./backend/package.json ./backend/package-lock.json ./
RUN npm ci
COPY ./backend ./

FROM node:20 as production

WORKDIR /app
COPY --from=frontend-build /app/frontend/dist /app/backend/build/dist
COPY --from=backend-build /app/backend/build /app/backend/build
COPY ./backend/README.md ./backend/README.md
COPY ./backend/package.json ./backend/package-lock.json ./backend/

WORKDIR /app/backend
RUN npm ci --production
ENV DEBUG=backend:*
EXPOSE 3001
USER node

CMD ["npm", "start"]
