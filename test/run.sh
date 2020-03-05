#!/bin/sh
cd $(dirname $0)

cd ../backend
mvn clean
mvn install