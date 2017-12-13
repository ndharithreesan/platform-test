## Running the Application

**Setup**

1. I used Postgres for the majority of the data of the application. The database
and username/password information can be found in config/config.js. You can either
choose to use those or your own preferred values- so long as the config file is
up to date, the settings wont be affected. There is probably an easier way to do this,
but this is how I set up the database and my user:

  ``` sudo -u postgres psql

      postgres=# CREATE USER platformtester WITH PASSWORD test;

      postgres=# CREATE DATABASE platformtest;

      postgres=# GRANT ALL PRIVILEGES ON DATABASE platformtest TO platformtester;
  ```

2. You're also going to need to have a redis server up and running. If you already have Redis installed, then its as simple as running `redis-server`. If not, here is the [link](https://redis.io/download)

3. The app is built with Node 8.9.1, so you will need to have the correct version. [NVM](https://github.com/creationix/nvm) is a good way to go.

4. After everything is set up, go to the project root and run `npm install` and wait while the dependencies download...

**Running/Testing the App**
- Running the app is straightforward: from the project root run `node index.js` and the app will be running on port 8000.

- For testing the endpoints, I largely used Postman, but that's up to the developer.

**Thought Process**
- I kept the controllers pretty fat because I wanted to keep the logic in one place. I hadn't run into a huge issue of reusing code yet, but I see that cropping up and would want to split out some of the more common services into a library

- I went back and forth on how implement the logout functionality of the application. I wanted to keep the token part of the application stateless and didn't want to make calls to the db every time i needed to log out the user. I went with a Redis layer to store blacklisted tokens.

**Enhancements**
- break up the user into user and auth (login, signup, and logout could probably be its own thing)
- consolidate a lot of the callback/promise discrepancies
- add additional routes
  - after logging in, it'd be ideal to route the user to a home page/ landing page
- add tests
- dockerize the app
  - would significantly reduce build times
  - less set up required for devs
- force email verification on signup
- add more input sanitization (theres a BIG assumption this is being done before hitting the app)
