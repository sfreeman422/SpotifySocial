$(document).ready(function() {

var performer = 'grouplove';

function gatherConcertInfo(){

  var queryURL = 'https://api.seatgeek.com/2/events?performers.slug='+performer+'&client_id=NjIzMjUyMXwxNDc5NDI2Nzkz&client_secret=zcNRKxkuP2Nej_z4gj1wMZPYU3fA9pAjtCuBZSOC';

  $.ajax({
    url:queryURL,
    method:'GET'
    })
    .done(function(response){

      console.log(response);

      for (i=0; i < response.events.length; i++) {

        var concertDiv = $('<div class="concertInfo">');


        var img = $('<img>');

        img.attr("src", response.events[i].performers[0].image);

        img.addClass('eventImg');

        concertDiv.append(img);


        var performer = response.events[i].performers[0].name;

        var p = $('<p>').text("Performer: " + performer);

        p.addClass('performer');

        concertDiv.append(p);


        var venue = response.events[i].venue.name;

        var v = $('<p>').text("Venue: " + venue);

        v.addClass('venue');

        concertDiv.append(v);


        var link = response.events[i].url

        var urlLink = $('<a>').text('Buy Tickets');

        urlLink.attr('href', link);

        concertDiv.append(urlLink);


        $('#eventsView').prepend(concertDiv);

    }

    });
  };

  gatherConcertInfo();
});
