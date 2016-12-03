// This is the code to authenticate against Spotify accounts, and to pull a Spotify user's top artists.
var models = require('../models');
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var users = require('../models')["Users"];

users.sync({force: true});

// These are our team's  Spotify app credentials.   These should be kept secret by not putting the server.js  file in the public folder.
var client_id = '7e460edc49e64d138a8f87bd87cfdc1c';
var client_secret = '23324134048446d6a40c8599dd00ab2d';  
var redirect_uri = 'http://localhost:3000/profile/callback';

// setting up global variables for user profile info.  Each of these comes from a user's Spotify account info.
var userID = "";
var userName = "";
var userEmail = "";
var userPic = [];
var favArtists = [];

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

app.get('/', function(req, res){
  res.redirect('/seatgeek/'+userID);
});


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  // create a cookie to store the user's Spotify auth state
  res.cookie(stateKey, state);

  // set scope for Spotify user info --  this will determine what info is available to our app
  var scope = 'user-read-private user-read-birthdate user-read-email user-top-read';
  // request authorization
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

// callback route to follow the authenitcation
app.get('/callback', function(req, res) {
  // request refresh and access tokens
  // the response sends back a code --  this code will be exchanged for an access token in the POST request
  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  // check the state parameter
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


    // POST method uses the access token from the above GET request.  That code is sent and an access token is received.
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
          userID = body.id;
          userName = body.display_name;
          userPic = body.images[0].url;
          userEmail = body.email;
          
          console.log("user id is " + userID);
          console.log("user name is "+ userName);
          console.log("user's email is " + userEmail);
          console.log("user's profile pic is " + userPic);

          if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API for a user's top artists
            request.get({
              url: 'https://api.spotify.com/v1/me/top/artists?limit=20&offset=0&time_range=medium_term',
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            }, function(error, response, body) {
            
            for (var i = 0; i < body.items.length; i++) {
            favArtists.push(body.items[i].name);
            };
            console.log(favArtists);


            users
            .create({ user_id: userID, 
                      name: userName,
                      email: userEmail,
                      userPic: userPic,
                      favArtists1: favArtists[0],
                      favArtists2: favArtists[1],
                      favArtists3: favArtists[2],
                      favArtists4: favArtists[3],
                      favArtists5: favArtists[4],
                      favArtists6: favArtists[5],
                      favArtists7: favArtists[6],
                      favArtists8: favArtists[7],
                      favArtists9: favArtists[8],
                      favArtists10: favArtists[9],
                      favArtists11: favArtists[10],
                      favArtists12: favArtists[11],
                      favArtists13: favArtists[12],
                      favArtists14: favArtists[13],
                      favArtists15: favArtists[14],
                      favArtists16: favArtists[15],
                      favArtists17: favArtists[16],
                      favArtists18: favArtists[17],
                      favArtists19: favArtists[18],
                      favArtists20: favArtists[19],
                      })
            .then(function() {
              users
                .findOrCreate({where: {email: userEmail}, defaults: {user_id: userID}})
                .spread(function(user, created) {
                  console.log(user.get({
                    plain: true
                  }))
                  console.log(created);
                })
            })

            });
          }

        });

        // redirect the user to the survey page
        res.redirect('/survey.html'
        );
      } 
    });
  }
});

// this route will update the concert with this.id by adding the user's id into
// that particular concert in the table
// NEED TO FIGURE OUT HOW TO SEND THIS UPDATE INTO THE CONCERTS TABLE
app.put('/update/:id', function (req, res) {
  var condition = 'id = ' + req.params.id;

  console.log('condition', condition);

  concerts.update({ attendees: req.body.userID }, condition, function () {
  });
});

// create a /matches route --  this will serve up matches.hbs after the user clicks on the "show me matches" button
app.get('/matches', function(req, res){
  res.render('matches');
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