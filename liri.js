require("dotenv").config();
var moment = require('moment');
moment().format();
var request = require("request");


//Bandsintown

if (process.argv[2] = 'concert-this')

{
  var artist = process.argv.slice(3).join('');
  //console.log(artist);

  var queryURL = 'https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp';
  console.log(queryURL);

  request(queryURL, function (error, response, body) {
    if (error) {
      console.log(error);
      //console.log(response)
    }

    var result = JSON.parse(body);
    //console.log(result)

    for (i = 0; i < result.length; i++) {
      //console.log(i);
      console.log('Venue name: ', result[i].venue.name);
      console.log('Venue city, state: ', result[i].venue.city, result[i].venue.region);
      console.log('Date of event', moment(result[i].datetime).format('MM / DD / YYYY'));
    }
  });
}


// OMBD:
// --------------------------------------------------------------------------------------------------------
var request = require("request");
// Store all of the arguments in an array
if (process.argv[2] = 'movie-this') {
  var movieName = process.argv.slice(3).join(' ');

  // // Create an empty variable for holding the movie name
  // var movieName = "";


  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    // If the request is successful
    // if (!error && response.statusCode === 200) {

    //   // Parse the body of the site and recover just the imdbRating
    //   // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).

    // }
    var result = JSON.parse(body);
    // console.log(result.length);

      console.log('Title: ', result.Title);
      // console.log('Released Date', moment(result.Released).format('MM / DD / YYYY'));
      console.log('IMDB rating: ', result.imbdRating);
      console.log('Rotten tomatoes', result.Ratings[1]);
      console.log('Countries', + result.Country);
      console.log('Language: ', + result.Language)
      console.log('Plot: ', + result.Plot)
      console.log('Actors: ' + result.Actors)
    

  });

}

//Spotify

// var spotify = new Spotify(keys.spotify);