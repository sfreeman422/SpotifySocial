var models = require('../models');
var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function(req, res){
function getInfo(){
	//BEGIN DATA PULL FROM DATABASE AND ADD TO QUERY STRING
	//======================================================================================
	var performers = ['Against-me', 'Bad-Religion', 'Grouplove'];
	var performerQuery = ''; 

	for(var i = 0; i < performers.length; i++){
		//Used to determine when we are at the end of the array. 
		var arrLength = performers.length-1; 
		//For loop to go through the array and add the artists to the performerQuery which we will
		//Then feed to the API.
		for(var j = 0; j < performers[i].length; j++){
			//Sets up a new string that includes the string from the array. 
			var artist = performers[i];
			if(artist.charAt(j) == " "){
				console.log("This string has a space.");
			}
		}
		//Adds the performer and a plus if we are not at the end of the array. 
		if(i != arrLength){
			performerQuery += artist+',';
		}
		//Adds just the artist if we are at the end of the array. 
		else{
			performerQuery += artist; 
		}
	}

	return performerQuery; 
	//END DATA PULL FROM DATABASE. QUERY STRING COMPLETE as PERFORMERQUERY
}
	
	//=======================================================================================
	//=======================================================================================
	//=======================================================================================
	
	//BEGIN API CALL 
	//=======================================================================================

function makeRequest(performerQuery){
	var clientID = 'NjIzMjUyMXwxNDc5NDI2Nzkz';
	var clientSecret = 'zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC'
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

makeRequest(getInfo());

});

module.exports = router; 