FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node ./express-app-test .

RUN npm ci

ENV DEBUG=playground:*

USER node

CMD npm start