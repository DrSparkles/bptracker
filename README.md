# Blood Pressure Tracker

This is a simple site for tracking blood pressure readings.  It is a combined server 
and front end using Node Express and React, running off the same command line scripts for easy deployment and compilation.

# Careful!
This code currently has no tests and must be considered to have potential bugs.  Tests are on the way, but until they are, 
be mindful of the risk! 

## Known Bugs
  1. On the home page, the table showcasing BP entries sometimes will not load previously entered values.  A refresh of the 
     page will load the data.

## Planned Improvements
At the moment this simply allows the saving of a record of a person's blood pressure readings.  However, future 
improvements planned are:
 1. Analytical views of the data allowing for visualizing changes in the values
 2. Testing for both server and front end code with mocha and storybook
 3. Ability to update user information such as username or password, as well as more verification on the sign up page. 
    Currently, no restrictions are set on what kind of password you can use (length, types of characters), and that needs
    to be fixed.

## Getting Started
To get a local environment up and running, install this repo locally and run `npm install`.  To run the development 
environment simply run `npm run dev` on the command line from the root directory where you have installed the software.

The site will then be available at `http://localhost:3000`.

### Prerequisites

The prerequisites are Node.js / npm and MongoDB.  The server itself should install with `npm install`.

The database is currently set up to run at localhost and will need to be configured in the `src/server/config/db.config.js` 
file.  DO NOT run a production server without properly setting up your production database!  This must include
proper passwords and security!

### Installing

After downloading the repo, run `npm install`.  At that point you should have various scripts available to you via the package.json file. 
These include:

1. `clear`: clean the `dist` or distribution folder
2. `lint`: run the linter; currently linter isn't set up because it does not like decorators
3. `build:server`: compile the server through babel
4. `build:client`: run webpack on the code
5. `build`: run webpack and babel
6. `dev`: run the dev server
7. `start`: run the production server code at `dist/server/index.js`
8. `deploy`: run the production build and server start commands `build` and `start`

To run any of these scripts, run `npm run SCRIPTNAME`.  For example, `npm run dev` or `npm run start`.  Most of these scripts will not be used 
for day to day development.

Make sure that your database configurations are properly set up in `src/server/config/db.config.js`.

Similarly, hashing of passwords is configured through `src/server/config/auth.config.js`.  The auth "secret code" should be set here to 
ensure proper security.

## Running the tests

Tests are pending.  They will be set up with Mocha and Storybook, and will test both the server and front end code.

## Deployment

You can deploy with `npm run build` and then `npm run start`, or simply `npm run deploy` to both run and deploy in one.

## License

This project is licensed under the WTFPL License 

## Acknowledgments

* The all in one set up is inspired by code from Scotch.com 
* Some components were inspired by the React - MobX Real World system
