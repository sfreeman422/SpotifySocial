var models = require('../models');
var express = require('express');
var router = express.Router();
var request = require('request');

//Steps to get this working:
//1. Hit the '/' route. Status: WORKING
//2. Initiate getInfo() function to search the database (array currently) for the users top artists Status: WORKING
//3. For each artist in the database, pass the queryURL to getID() Status: WORKING
//4. Inside of getID, submit the request to the API Status: WORKING
//5. Search the body for the performer ID STATUS: WORKING
//6. Add the performer ID to the database. Status: BROKEN
//7. Pass the ID to the makeRequest function to get the concerts. 

//WE NEED PROMISES HERE! Without the promises, we are unable to avoid the asynchronicity of JS. When you pick this up again FOCUS ON THE ASYNCRHONICITY. 

//Route upon hitting hte seatgeek route. 
router.get('/', function(req, res){

//STEP ONE:
//This function is to query the shows based on artist ID. This is not yet using artistID, instead it is using artistName and is not fully functional. 
//This is where it all starts. We grab the data here, pass it to the getID function and then return the full URL to beb used by makeRequest. 
function getInfo(){
		getID
}


//STEP TWO: (CALLED VIA GETINFO)
//This function delcaration is to grab the ID for the artist by searching by artist name. 
var getID = new Promise(function (resolve, reject){
	//This will eventually be data pulled from the users top 20 artists. 
	var performers = ['against-me', 'bad-religion', 'grouplove', 'young-thug', 'taylor-swift', 'justin-beiber'];
	var performerQuery = [];
	var clientID = 'NjIzMjUyMXwxNDc5NDI2Nzkz';
	var clientSecret = 'zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC';

	for(var i = 0; i < performers.length; i++){
		var artist = performers[i];
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
//This function declaration will be used to actually query the seatgeek api using all of our top artists by ID. Not yet functional using IDs. Relies on getInfo();
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
    		var concertName = concert.events[0].title;
    		var concertDate = concert.events[0].datetime_local;
    		var concertPerformers = concert.events[0].performers;
    		var concertVenue = concert.events[0].venue;
    		for(var i = 0; i<concertLength; i++){
	    		console.log("Concert"+i+" is: ");
	    		console.log("===========================");
	    		console.log("Concert Name: "+concert.events[i].title);
	    		console.log("Concert Date: "+concert.events[i].datetime_local);
	    		console.log("Performers: "+concert.events[i].performers);
	    		console.log("Venue: "+concert.events[i].venue);
    		}
  		}
  		else{
  			console.log(err);
  			console.log(queryURL);
  		}
	});
}

//Once we have getInfo figured out, we will be able to call the makeRequest to actualy grab the concerts. 
getInfo();

});

module.exports = router;  