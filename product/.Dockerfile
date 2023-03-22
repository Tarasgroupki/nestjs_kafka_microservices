FROM node:16.15-alpine

ARG APP_DIR=app-product
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY /product .

RUN rm -rf node_modules package-lock.json

RUN ls -l

RUN npm install

CMD ["npm", "run", "start"]
