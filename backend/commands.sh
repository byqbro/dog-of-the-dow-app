!/bin/bash

Execute Spring application
CMD="java -jar target/app.jar"
$CMD &
SERVICE_PID=$!

#Execute Tests
mvn test


# after test compli create jar file
mvn package

#Wait for Spring execution
wait "$SERVICE_PID"

mvn spring-boot:run


  
