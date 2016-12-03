var models = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');
// var concerts = require('../models')["Concerts"];


//Steps to get this working:
//1. Hit the '/' route. Status: WORKING
//2. Initiate getInfo() function to search the database (array currently) for the users top artists Status: WORKING
//3. For each artist in the database, pass the queryURL to getID() Status: WORKING
//4. Inside of getID, submit the request to the API Status: WORKING
//5. Search the body for the performer ID STATUS: WORKING
//6. Add the performer ID to the database. Status: CONCEPTUALLY WORKING. NEED DB COMMANDS
//7. Pass the ID to the makeRequest function to get the concerts: WORKING. 
//8. Store relevant info in the DB: NEED DB COMMANDS

//Route upon hitting hte seatgeek route. 
router.get('/getconcerts/:id', function(req, res){
	var useID = req.params.id
console.log("SpotifyID is : "+req.params.id);

//STEP ONE:
//This function is to query the shows based on artist ID.
//This is where it all starts. 
//GetInfo is called in this program, which calls the getID promise to get it all started. 
function getInfo(){
		getID
}


//STEP TWO: (CALLED VIA GETINFO)
//This function delcaration is to grab the ID for the artist by searching by artist name. 
var getID = new Promise(function (resolve, reject){
	//This will eventually be data pulled from the users top 20 artists. 
	var performers = ['coldplay', 'bon iver','radiohead','justin beiber','band of horses'];
	var nospace = [];
	//This should resolve the spaces vs dashes issue. 
	for(var d = 0; d < performers.length; d++){
		var string = performers[d];
		string = string.replace(/\s+/g, "-");
		nospace.push(string);
	}

	var performerQuery = [];
	var clientID = 'NjIzMjUyMXwxNDc5NDI2Nzkz';
	var clientSecret = 'zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC';

	for(var i = 0; i < nospace.length; i++){
		var artist = nospace[i];
		var queryURL = 'https://api.seatgeek.com/2/performers?slug='+artist+'&client_id='+clientID+'&client_secret='+clientSecret;

		request(queryURL, function(err, resp, body){
			if(!err && resp.statusCode == 200){
				var response = JSON.parse(body)
				var id = response.performers[0].id;
				console.log("ID IS: "+id);
				performerQuery.push(id);
				//Resolves the promise only if we have as many IDs in the ID array as we do in the performers array.
				if(performerQuery.length == performers.length){
					resolve(makeRequest(performerQuery));
				}
			}
			else{
				reject(console.log("API request failed."));
			}
		})
	}
});

//STEP THREE: CALLED VIA GETINFO (EVENTUALLY)
//This function declaration will be used to actually query the seatgeek api using all of our top artists by ID.
function makeRequest(performerQuery){
	var clientID = 'NjIzMjUyMXwxNDc5NDI2Nzkz';
	var clientSecret = 'zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC';
	var concerts = {};

	var queryURL = 'https://api.seatgeek.com/2/events?performers.id='+performerQuery+'&geoip=true&range=100mi&client_id='+clientID+'&client_secret='+clientSecret
	console.log(queryURL);
	request(queryURL, function(err, resp, body){
		if (!err && resp.statusCode == 200) {
    		var concert = JSON.parse(body);
    		var concertLength = concert.events.length;

    		for(var i = 0; i<concertLength; i++){

    		models.Concerts
            .create({ user_id: useID,
            		  eventName: concert.events[i].title, 
                      concert_id: concert.events[i].id,
                      eventDate: concert.events[i].datetime_local,
                      venueName: concert.events[i].venue.name,
                      venueAddress: concert.events[i].venue.extended_address,
                      artists: concert.events[i].performers[0].short_name,
                      ticketURL: concert.events[i].url
                      })
            .then(function() {
              models.Concerts
                .findOrCreate({where: {eventName: concerts.events[i].title}, defaults: {concert_id: concerts.events[i].id}})
                .spread(function(concert, created) {
                  console.log(concert.get({
                    plain: true
                  }))
                  console.log(created);
                })
            })


	    		// console.log("Concert"+i+" is: ");
	    		// console.log("===========================");
	    		// //Accounted for in DB. 
	    		// console.log("Concert Name: "+concert.events[i].title);

	    		// //Accounted for in DB. 
	    		// console.log("Concert Date: "+concert.events[i].datetime_local);
	    		// //Accounted for in DB. NEEDS TO BE A STRING SEPRATED BY COMMAS
	    		// console.log("Performers are: ");
	    		// for(var j = 0; j< concert.events[i].performers.length; j++){
	    		// 	console.log(concert.events[i].performers[j].short_name);
	    		// }
	    		// console.log("Venue Information: ");
	    		// //Accounted for in DB.
	    		// console.log("Venue Name: "+concert.events[i].venue.name);
	    		// //Accounted for in DB. NEED TO BE SEPARATED BY COMMAS
	    		// console.log("Venue Address: "+concert.events[i].venue.address);
	    		// console.log("Venue City/State: "+concert.events[i].venue.extended_address);
	    		// //Account for in DB. 
	    		// console.log("Buy Tickets: "+concert.events[i].url)
    		}
  		}
  		else{
  			console.log(err);
  			console.log(queryURL);
  		}
	});

	res.render("concerts");
}

//Kicks it all off. 
getInfo();

});

router.get("/matches", function(req, res){
	res.render("matches");
})

module.exports = router;  