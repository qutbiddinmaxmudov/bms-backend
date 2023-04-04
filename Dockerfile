FROM node:16-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .
RUN yarn build

# ---

FROM node:16-alpine

ENV NODE_ENV production

LABEL maintainer="Maxmudov qutbiddin.makhmudov@gmail.com"

ARG IMAGE_NAME=bms
ARG IMAGE_TAG=latest

LABEL name=$IMAGE_NAME tag=IMAGE_TAG

USER node
WORKDIR /home/node

COPY --from=builder --chown=node:node /home/node/package*.json ./
COPY --from=builder --chown=node:node /home/node/yarn.lock ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/dist/ ./dist/

EXPOSE 8000
CMD ["yarn", "start:prod"]