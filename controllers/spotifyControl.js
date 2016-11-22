// This is the basic code for the OAuth2 flow to authenticate against Spotify accounts.

// I built this as a standalone app file,  need to remove some of these dependencies and the port at the end of the file


var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

// These are our team's  Spotify app credentials.   These should be kept secret by not putting the server.js  file in the public folder.
var client_id = '7e460edc49e64d138a8f87bd87cfdc1c';
var client_secret = '23324134048446d6a40c8599dd00ab2d'; // Your secret
// We need to put a redirect URL in here later.  Wherever our app's homepage is hosted,  or the URL of the authenticated user landing page
// THIS IS A REQUIRED PARAMETER FOR THE API.  WE HAVE TO SET IT.
var redirect_uri = 'http://localhost:3000/dummycallback.html';

// Generates a random string containing numbers and letters
//  * @param  {number} length The length of the string
//  * @return {string} The generated string

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cookieParser());


// Need to review all these routes.
app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // request authorization
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// This is the redirect route.  We'll need to set it to wherever we are sending the user after they authenticate successfully.
app.get('/callback', function(req, res) {
  // request refresh and access tokens
  // after checking the state parameter

  // the response sends back a code --  this code will be exchanged for an access token in the POST request
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };


    // in this POST method the authOptions contains the code from the GET request.  That code is sent and an access token is received.
    //  The access token will be used to ping the API for user info,  like favorite artists.

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/index.html' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/index.html' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

// access tokens are set to expire --  the refresh will get a new token
app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

module.exports = app; 