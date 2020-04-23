docker rm -f mysql
docker run \
-d \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=dog_of_the_dow_app \
-e MYSQL_USER=shihao \
-e MYSQL_PASSWORD=shihao \
-p 3306:3306 \
--name mysql \
mysql