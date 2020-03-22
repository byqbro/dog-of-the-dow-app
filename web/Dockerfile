FROM node:12.2.0-alpine

WORKDIR '/app'
COPY ./package.json ./
RUN npm install
RUN npm i -g cross-env
COPY . .
CMD ["npm", "start"]