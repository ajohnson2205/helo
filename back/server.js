//external modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const session = require('express-session')
require('dotenv').config();

const passport = require('passport');


//get express going
const app = module.exports = express();
app.use( bodyParser.json() );
app.use( cors() );

//connect the database
massive ( process.env.CONNECTION_STRING ).then( dbInstance => app.set('db', dbInstance));

//my dependencies
const testController = require('./controllers/testController.js')
const userController = require('./controllers/userController.js')
const strategy = require('./strategy.js')



//session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));


//passport strategy
app.use(passport.initialize());
app.use(passport.session());
passport.use( strategy  );

//serve the files with express static
// app.use(express.static(__dirname + '/'))


//getting the server going
const port = process.env.PORT || 1337;
app.listen( port, () => { console.log(`Good to go on port ${port}...`)})


//middlewares





//endpoints
  //test
  app.get('/', testController.home)
  app.get('/sayHello', testController.sayHello)

  //users
  app.post('api/user/add', userController.addUser )
