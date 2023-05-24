# Pipedrive QA Automation Test Task
## By Dmytro Abdulakh -- [Repository](https://github.com/FolkusKyiv/pipedrive) 

## Set up

-  Install [Node.js 18.16.0](https://nodejs.org/en/download)
-  (optional) Install and set up [Docker](https://www.docker.com/) on the local machine

### There two ways to run test -- locally and though the Docker container
- To run locally, use ```npx cypress open```, to launch cypress test suite

- To run in a Docker container, after you set up Docker app, run ```docker-compose up --build``` in the terminal.
You can stop a container by running ```docker stop $(docker ps -aq)``` 
or check the status of active containers by ```docker ps -a```.
To remove a container, use ```docker rm $(docker ps -aq)```

For Docker runs, screenshots and videos of the test runs will be generated in /cypress/