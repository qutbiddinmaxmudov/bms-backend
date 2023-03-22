FROM node:16.19.0
RUN apt-get update && \
        apt install -y --no-install-recommends
        
WORKDIR /max/app

COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./nest-cli.json ./
COPY ./tsconfig.build ./
COPY ./tsconfig.json ./

RUN yarn install

COPY .src/ /max/app/src/

EXPOSE 8080
CMD [ "yarn", "start" ]