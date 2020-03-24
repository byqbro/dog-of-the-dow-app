build project application
    $ mvn install
run application
    $ mvn spring-boot:run
run jar file as java application
    $ java -jar example.jar file
docker build image
    $ docker build -t username/tag .
list all existing image
    $ docker images
    $ docker image ls -a (include none images)
list all the container
    $ docker container ls -a
    $ docker ps -a
delete everything from docker system
    $ docker system prune

run a container for a image that dont have locally 
    $ docker run \
// config for mysql container
<!-- 

-d \
-e MYSQL_ROOT_PASSWORD=rootpassword \
-e MYSQL_DATABASE=dog_of_the_dow_app \
-e MYSQL_USER=shihao \
-e MYSQL_PASSWORD=shihao \
-p 3306:3306 \
--name mysql \
mysql 

-->

docker run -d -e MYSQL_ROOT_PASSWORD=rootpassword -e MYSQL_DATABASE=dog_of_the_dow_app -e MYSQL_USER=shihao -e MYSQL_PASSWORD=shihao -p 3306:3306 --name mysql --network spb-mysql  mysql

stop a specific container
    $ docker container stop container_NAMES if successful will return container_NAMES

remove a images
    $ docker rmi image_id


