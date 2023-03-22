FROM node:16.15-alpine

ARG APP_DIR=app-gateway
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY /api-gateway .

RUN rm -rf node_modules package-lock.json

RUN ls -l

RUN npm install

RUN ls -l

EXPOSE 3000

CMD ["npm", "run", "start"]
