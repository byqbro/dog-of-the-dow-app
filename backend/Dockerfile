# Start from maven docker image
FROM maven:3.6.1-jdk-8-alpine

# COPY all sources
COPY . .

# # install the package into the local repository, for use as a dependency in other projects locally
# RUN mvn install

# # test the compiled source code using a suitable unit testing framework
# RUN mvn test

# # take the compiled code and package it in its distributable format, such as a JAR
# RUN mvn package

# define a variable
ARG JAR_FILE=target/*.jar

# copy jar file in to container
COPY ${JAR_FILE} app.jar

# open to port 8080
EXPOSE 8080

# configure a container that will run as an executable
ENTRYPOINT ["java","-jar","/app.jar"]