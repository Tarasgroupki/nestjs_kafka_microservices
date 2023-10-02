FROM ubuntu:18.04
FROM node:16.15-alpine

ARG APP_DIR=app-auth
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}

COPY . ./

RUN rm -rf node_modules package-lock.json

RUN ls -l

RUN npm install

# uninstall the current bcrypt modules
RUN npm uninstall bcrypt

# install the bcrypt modules for the machine
RUN npm install bcrypt

CMD ["npm", "run", "start"]
