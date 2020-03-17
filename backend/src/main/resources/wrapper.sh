#!/usr/bin/env bash

java -Djava.security.egd=file:/dev/./urandom -Dspring.profiles.active=containers -jar /app.jar