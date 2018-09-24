//Bringing in dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Initializing Express App
const app = express();

//Defining port for server
const port = 5000;

//Importing mongoURI for database connection
const keys = require("./config/keys");

//Bringing in routes
const users = require("./routes/users");

//bodypaser middleware to access req.body object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Passport middleware for maintaining a session and authenticating user
app.use(passport.initialize());

//passport config file
require("./config/passport.js")(passport);

//Assigning routes
app.use("/users", users);

//Making a connection to the mongoDB database
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Listening on specified port for requests
app.listen(port, () => console.log(`Server Listening on port ${port}`));
