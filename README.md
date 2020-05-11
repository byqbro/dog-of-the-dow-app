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
- [Backend Tech Stack](#backend-tech-stack)
- [Database](#database)
- [Web Tech Stack](#web-tech-stack)
- [Mobile Tech Stack](#mobile-tech-stack)
- [Team Collaboration](#team-collaboration)
- [Challenges](#challenges)

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
- Use Notion to share notes
- Required code review for every merge

### Challenges
- CI / CD
  - .env file environment variable setup
  - Task definition container environment variable overwrite
  - Finding AWS logs
  - Switch from AWS Elastic Beanstalk to ECS
- Version conflict
- Simplest way may not be the right way; complicate way may not be the the wrong way
