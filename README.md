# Background

This project was created for a Tech Tips Talk inside EPAM systems. It covers Spring Security, JWT and REST Client@VS Code, etc.

# Prerequisite

1. Java 1.8.
2. REST Client extention in VS Code.

# Steps

1. Start UAA service which listens to port 8080

        cd service-uaa
        mvn clean package
        cd target
        java -jar demo-0.0.1-SNAPSHOT.jar

2. Start Normal service which listens to port 8081

        cd service-normal
        mvn clean package
        cd target
        java -jar demo-0.0.1-SNAPSHOT.jar

3. Open doc/*.http files with Visual Studio and execute HTTP requests.