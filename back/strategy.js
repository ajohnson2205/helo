const Auth0Strategy = require('passport-auth0');
const config = require(`${__dirname}/config.js`);
const { domain, clientID, clientSecret } = config;
var app = require('./server.js')

console.log(app);

module.exports = new Auth0Strategy({
   domain:       domain,
   clientID:     clientID,
   clientSecret: clientSecret,
   callbackURL:  '/login'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user

    db.find_user([profile.identities[0].userID])
      .then(user => {
        if(user[0]) {
          return done(null, {id: user[0].id})
        }
        else
      })

    return done(null, profile);
  }
);
