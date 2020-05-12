# Dog of the Dow App

The Dog of the Dow is a stock-picking strategy that picks the Dow stocks with the highest dividends. It was popularized by Michael B. O'Higgins in 1991. At this application, we intend to tell you about this technology, study its past performance, measure its current performance, and provide you the ways to get more “Dogs”. We create an application in the stock market for the investors.
- Create web version for admin user to monitoring users’ information
- Create mobile application for users to use
-  suggestions to users based on Dog of the Dow strategy and Small Dog of the Dow strategy

## Contents

- [Core Feature and User Flow Design](#core-feature-and-user-flow-design)
  - [Admin Web](#admin-web)
  - [User Mobile](#user-mobile)
- [Architecture](#architecture)
- [Development Steps](#development-steps)
  - [Local Environment](#development-steps-1-local-environment)
  - [CICD Pipeline](#development-steps-2-cicd-pipeline)
  - [AWS Pre-Configuration](#development-steps-3-aws-pre-configuration)
  - [Make a commit from local to AWS](#development-steps-4-make-a-commit-from-local-to-aws)
- [AWS Setup](#aws-setup)
- [Backend Tech Stack](#backend-tech-stack)
- [Database](#database)
- [Web Tech Stack](#web-tech-stack)
- [Mobile Tech Stack](#mobile-tech-stack)
- [Team Collaboration](#team-collaboration)
- [Challenges](#challenges)
- [Issues and solutions](#issues-and-solutions)

## Core Feature and User Flow Design
### Admin Web
- Login
- Get all users’ information
- Update a specific user’s setting
- Delete a user
![](/images/flowDesignAdmin.png)<br><br>

### User Mobile
- Register/Login
- Update setting
- Make a transaction
- Get the portfolio
- Get Dog of the dow strategies
- Get reminders to rebalance investments
![](/images/flowDesignUser.png)<br><br>

## Architecture
![](/images/architecture.png)<br><br>

## Development Steps
### Development Steps 1: Local Environment
- Development and Test in Local Environment
  - Backend: Spring Boot server in Intellij
  - Database: Local MySQL with MySQL WorkBench for monitoring
  - Frontend Web: React in local environment
- Development and Test in Local Environment
  - Docker-compose:
  ![](/images/dockerCompose.png)<br><br>
- If everything is fine, commit to Github

### Development Steps 2: CICD Pipeline
Github action workflows:

- CI.yml
  - Docker build on frontend
  - Docker build on backend
  - Npm test on mobile
- CICD.yml
  - Repeat CI Process
  - Deploy images to AWS Container Registry
<br><br>
![](/images/cicdPipeline.png)<br><br>

### Development Steps 3: AWS Pre-Configuration
![](/images/awsSetUp.png)<br><br>

### Development Steps 4: Make a commit from local to AWS
![](/images/localToAws.png)<br><br>

### AWS Setup
- ECS(Elastic Container Service)
    - Create cluster EC2 Linux + Networking
        - t2 micro
        - create a new VPC
    - Create task definition EC2 version
        - Task memory 512 MB
        - Add container setup container environment variable
    - Create service with task definition

- ECR(Elastic Container Registory)
    - Create repository
        - Name the repository name match on Github action CICD process

- RDS
    - Choose same VPC, and security group with cluster

- Resources: https://www.youtube.com/watch?v=yjb5kfRUw0A
- Resources: https://medium.com/@ryanzhou7/connecting-a-mysql-workbench-to-amazon-web-services-relational-database-service-36ae1f23d424

    

### Backend Tech Stack
#### Java(Spring Boot)

- Spring Data JPA
- Hibernate
- Spring Security
- JWT
- JUnit 5
- REST Assured
- H2 In-memory Database

### Database
- MySQL
  - for testing
  - don’t want to expose credentials to public
- Amazon RDS MySQL

### Web Tech Stack
- React
- Material-UI
- Bootstrap

### Mobile Tech Stack
- React Native
- Redux
- React Navigation
- React Native Elements
- Vector Icons
- Jest

### Team Collaboration
- Scrum meetings 4 times a week on Zoom
- Use [Notion](https://www.notion.so/) to share notes
- Required code review for every merge

### Challenges
- CI / CD
  - .env file environment variable setup
  - Task definition container environment variable overwrite
  - Finding AWS logs
  - Switch from AWS Elastic Beanstalk to ECS
- Version conflict
- Simplest way may not be the right way; complicate way may not be the the wrong way

### Issues and solutions
- Xcode setup error: Multiple commands produce '...'
    - [hampustagerud's Solution](https://github.com/oblador/react-native-vector-icons/issues/851)  
- AWS ECS error: service XYZ was unable to place a task because no container instance met all of its requirements. The closest matching container-instance ABC has inssufficent memory available.
    - Delete the Service, restart a new service with same task definition
- Overwrite priority: ECS container environment variable > application properties
- Make sure using same data type when perform a sorting/comparsion, toFix() method change the data type to string
