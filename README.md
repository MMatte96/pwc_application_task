# pwc_application_task
To initialize the project please execute `npm install` to install all needed dependencies for this project, as stated in package.json

The components are written with Svelte and the tests with Jester and Cypress.

There are two test scripts you can run:
1. **Unit Tests in Jest**: Execute `npm run test` to execute all unit tests written with jest for the svelte components
2. **E2E tests in Cypress**: First execute `npm run dev` to start the server for the frontend and then `npm run e2e` to open cypress and run the tests from there