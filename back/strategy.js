const Auth0Strategy = require('passport-auth0');
const config = require(`${__dirname}/config.js`);
const { domain, clientID, clientSecret } = config;
var app = require('./server.js')

module.exports = new Auth0Strategy({
   domain:       domain,
   clientID:     clientID,
   clientSecret: clientSecret,
   callbackURL:  '/auth'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    const db = app.get('db')
    console.log(profile)
    var random = Math.floor(Math.random() * 1000000)
    profile.identities[0].user_id = profile.identities[0].user_id.toString()

    db.findUser([profile.identities[0].user_id])
      .then(user => {
        //if a user is found, do this and continue with authentication
        if(user[0]) {
          return done(null, {id: user[0].id})
        }
        //a user was not found, let's create one
        else {
          db.createUser([profile.emails[0].value, profile.identities[0].user_id, `https://robohash.org/${random}`])
          return done(null, profile)
        }
      })
  }
);
