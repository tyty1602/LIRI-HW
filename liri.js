require("dotenv").config();
var moment = require('moment');
moment().format();
var request = require("request");
var fs = require('fs');
var songName = process.argv.slice(3).join(' ');
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: '22dedf1bc5474532b883ddf284eb3aff',
  secret: '38a3838ad2af4964bf8286ca357d62c9'
});

//Bandsintown

if (process.argv[2] === 'concert-this') {
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

else if (process.argv[2] === 'movie-this') {
  var movieName = process.argv.slice(3).join(' ');


  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {

    var result = JSON.parse(body);
    // console.log(result);

    console.log('Title: ', result.Title);
    console.log('Released Date: ', moment(result.Released).format('MM / DD / YYYY'));
    console.log('IMDB rating: ', result.imbdRating);
    console.log('Rotten tomatoes', result.Ratings[1]);
    console.log('Countries: ', result.Country);
    console.log('Language: ', result.Language);
    console.log('Plot: ', result.Plot);
    console.log('Actors: ', result.Actors);

  });

}

//Spotify
else if (process.argv[2] === 'spotify-this-song') {



  spotify.search({ type: 'track', query: songName }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    // console.log(data);
    // console.log(data.tracks.items[0])
    var track = data.tracks.items[0];
    var artists = track.artists;
    artists.forEach(function (artist) {
      console.log("Artist Name: ", artist.name)
    })
    console.log('Song Name: ', track.name);
    console.log('Preview URL ', track.preview_url);
    console.log("Album Preview URL", track.album.name)
  });

}

//Liri do what it says

else if (process.argv[2] === 'do-what-it-says') {

  fs.readFile('./random.txt', "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);

    var str = data;
    var res = str.split(",");
    console.log(res)
    var songNameL = data[1];

    spotify.search({ type: 'track', query: songNameL }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      //console.log(data);
      console.log(data.tracks.items[0])
      var artists = tracks.artists;
      artists.forEach(function (artist) {
        console.log("Artist Name: ", artist.name)
      })
      console.log('Song Name: ', tracks.name);
      console.log('Preview URL ', tracks.preview_url);
      console.log("Album Preview URL", tracks.album.name)
    });

  });
}