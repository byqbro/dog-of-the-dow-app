FROM openjdk:8-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ARG SH_FILE=src/main/resources/*.sh
COPY ${SH_FILE} wrapper.sh
RUN /bin/sh -c "apk add --no-cache bash"
RUN bash -c 'touch /app.jar'
RUN bash -c 'chmod +x /wrapper.sh'

ENTRYPOINT ["/bin/bash", "/wrapper.sh"]