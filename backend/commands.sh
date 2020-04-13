#!/bin/bash

#Execute Spring application
# CMD="java -jar target/app.jar"
# $CMD &
# SERVICE_PID=$!

# #Execute Tests
# mvn test

# #Wait for Spring execution
# wait "$SERVICE_PID"

# mvn spring-boot:run
  
FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]