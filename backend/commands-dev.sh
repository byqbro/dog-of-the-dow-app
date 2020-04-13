#!/bin/bash

#Execute Spring application
CMD="java -jar target/app.jar"
SERVICE_PID=$!

#Execute Tests
mvn test

# #Wait for Spring execution
# wait "$SERVICE_PID"