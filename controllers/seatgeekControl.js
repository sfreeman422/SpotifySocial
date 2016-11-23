var models = require('../models');
var express = require('express');
var router = express.Router();

var request = require('request');


//Route upon hitting hte seatgeek route. 
router.get('/', function(req, res){

//This function delcaration is to grab the ID for the artist by searching by artist name. 
function getID(queryURL){
		request(queryURL, function(err, resp, body){
			if(!err && resp.statusCode == 200){
				console.log(body.performers[0].id);
				//console.log("Artist ID for "+body.performers.name+" is :"+fullBody.id);
			}
			else{
				console.log(err);
			}
		})
}


//This function is to query the shows based on artist ID. This is not yet using artistID, instead it is using artistName and is not fully functional. 
//This is where it all starts. We grab the data here, pass it to the getID function and then return the full URL to beb used by makeRequest. 
function getInfo(){
	//This will eventually be data pulled from the users top 20 artists. 
	var performers = ['against-me', 'bad-religion', 'grouplove'];
	var performerQuery = ''; 

	var clientID = 'NjIzMjUyMXwxNDc5NDI2Nzkz';
	var clientSecret = 'zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC';

	for(var i = 0; i < performers.length; i++){
		var artist = performers[i];
		console.log("Artist being tested is: "+artist);
		var queryURL = 'https://api.seatgeek.com/2/performers?slug='+artist+'&client_id='+clientID+'&client_secret='+clientSecret
		console.log("QueryURL is "+queryURL);
		getID(queryURL);
	}

	return performerQuery; 
}
	
//This function declaration will be used to actually query the seatgeek api using all of our top artists by ID. Not yet functional using IDs. Relies on getInfo();
function makeRequest(performerQuery){
	var clientID = 'NjIzMjUyMXwxNDc5NDI2Nzkz';
	var clientSecret = 'zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC';
	console.log(performerQuery);
	var queryURL = 'https://api.seatgeek.com/2/events?performers.id='+performerQuery+'&client_id='+clientID+'&client_secret='+clientSecret
	request(queryURL, function(err, resp, body){
		if (!err && resp.statusCode == 200) {
    		console.log(body)
  		}
  		else{
  			console.log(err);
  			console.log(queryURL);
  		}
	});
}

getInfo();
//makeRequest(getInfo());

});

module.exports = router; 