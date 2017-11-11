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


passport.serializeUser((user, done) => {
  console.log("xxxxxxx", user);

  if(user.name) {
    var firstname = (user.name.givenName) ? user.name.givenName : ""
    var lastname = (user.name.familyName) ? user.name.familyName : ""
    var id = (user.id)
    done(null, {
      authid: id,
      firstname: firstname,
      lastname: lastname,
      picture: ""
    })

  }
  else {
    return done(null, user)
  }

})

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get( '/auth',
  passport.authenticate('auth0',
    { successRedirect: '/me', failureRedirect: '/auth', failureFlash: true }
  )
);


app.get('/logout', (req, res) => {
  req.logOut();
  return res.redirect('https://bearded.auth0.com/v2/logout')
})




app.get('/me', ( req, res, next) => {
  if ( !req.user ) {
    res.redirect('/auth');
  } else {
    // req.user === req.session.passport.user
    // console.log( req.user )
    // console.log( req.session.passport.user );
    res.status(200).send( JSON.stringify( req.user, null, 10 ) );
  }
});




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
