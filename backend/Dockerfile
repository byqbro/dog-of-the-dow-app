# FROM openjdk:8-jdk-alpine
# ARG JAR_FILE=target/*.jar
# COPY ${JAR_FILE} app.jar
# ENTRYPOINT ["java","-jar","/app.jar"]


#Start from maven docker image
FROM maven:3.6.1-jdk-8-alpine

#Copy all sources
COPY . .

#Build ( because you want to execute tests after the spring boot application is started you should disable test during build phase )
RUN mvn install

#Start container
COPY commands.sh /scripts/commands.sh
RUN ["chmod", "+x", "/scripts/commands.sh"]
ENTRYPOINT ["/scripts/commands.sh"]