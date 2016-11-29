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

//This function delcaration is to grab the ID for the artist by searching by artist name. 
function getID(queryURL){
		request(queryURL, function(err, resp, body){
			if(!err && resp.statusCode == 200){
				var response = JSON.parse(body)
				var id = response.performers[0].id;
				return id;
			}
			else{
				console.log(err);
				return err;
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
		var queryURL = 'https://api.seatgeek.com/2/performers?slug='+artist+'&client_id='+clientID+'&client_secret='+clientSecret;
		console.log("QueryURL is "+queryURL);
		var id = getID(queryURL);
		if(i = performers.length){
			performerQuery += id;
		}
		else{
			performerQuery += id+"+";
		}
	}
	console.log("before sending, performerQuery is "+performerQuery);
	return performerQuery; 
}
	
//This function declaration will be used to actually query the seatgeek api using all of our top artists by ID. Not yet functional using IDs. Relies on getInfo();
function makeRequest(performerQuery){
	var clientID = 'NjIzMjUyMXwxNDc5NDI2Nzkz';
	var clientSecret = 'zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC';
	console.log("performerquery is: "+performerQuery);
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

//Once we have getInfo figured out, we will be able to call the makeRequest to actualy grab the concerts. 
makeRequest(getInfo());

});

module.exports = router;  