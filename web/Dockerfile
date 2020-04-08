FROM node:alpine as builder

WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .

FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
# at the end its a nginx images