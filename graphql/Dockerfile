FROM node:lts-alpine

WORKDIR /app

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

COPY . ./
COPY .env ./.env

RUN npm install
# && npm run build

CMD ["npm", "run", "dev"]
