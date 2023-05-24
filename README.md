# Pipedrive QA Automation Test Task
## By Dmytro Abdulakh -- [Repository](https://github.com/FolkusKyiv/pipedrive) 

## Set up

-  Install [Node.js 18.16.0](https://nodejs.org/en/download)
-  (optional) Install and set up [Docker](https://www.docker.com/) on the local machine


## Execution
### There two ways to run test -- locally and though the Docker container
- To run locally, install cypress and other dependencies (faker for email generation) 
```
npm install cypress
npm install faker --save-dev
```
-  use ```npx cypress open```, to launch cypress test suite


### --------------------------------------------------------------------------------
- To run in a Docker container, after you set up Docker app, run ```docker-compose up --build``` in the terminal.

- You can stop a container by running ```docker stop $(docker ps -aq)``` 
or check the status of active containers by ```docker ps -a```.
To remove a container, use ```docker rm $(docker ps -aq)```

For Docker runs, screenshots and videos of the test runs will be generated in /cypress/
### --------------------------------------------------------------------------------

There are 3 test spec
1. LoginRegister.cy.js -- it looks briefly at the landing, log in and register pages
2. RegisterFunctional.cy.js -- checks that registration is processed fine with different cases (valid/invalid email, no email and required field not selected
   )
3. RegisterPage.cy.js -- checks UI and CSS values of all visible components on the registration page
### --------------------------------------------------------------------------------
# Note 1
For valid email test at RegisterFunctionality.cy.js, I have not proceeded to actually register users, as this is PROD and I do not want to cause commotion in your DB (but the possible checks will follow similar patterns to other checks + check that the email is no longer valid for registration)

# Note 2

If you have cypress already installed locally in Users\Appdata\Local\Cypress, you can run just
```
npm install faker --save-dev
npx cypress open
```
to launch the tests
Alternatively, you can also do ```npx cypress run -b chrome``` to launch headless execution of the tests in chrome

# Note 3
For the sake of demonstration, the checks assume that everything is OK and according to design doc. In reality, it is not always the case. 

Import of css constants from design doc can be used, for examaple, by
constants.js
``` 

export const MY_CONSTANT = 'Hello, World!';
export const ANOTHER_CONSTANT = 'Pipedrive is awesome!';
```
and then just import these in your specs file 
```
import { MY_CONSTANT, ANOTHER_CONSTANT } from './constants';
```