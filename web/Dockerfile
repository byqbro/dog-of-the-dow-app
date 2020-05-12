FROM node:alpine as builder

WORKDIR '/app'
COPY package.json ./
RUN npm install
COPY . .
RUN npm run test
RUN npm run build

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
# at the end its a nginx images