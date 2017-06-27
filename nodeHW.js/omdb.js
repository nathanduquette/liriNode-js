var keys    = require("./keys.js");
var request = require("request");

var movieName = process.argv[3];
    //creat query URL w/ API key
    var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + movieName + "&y=&plot=short&r=json";
    request(queryUrl, function(error, response, body) {
       if (!error && response.statusCode == 200) {
           //parse body to make it pretty
            body = JSON.parse(body);
            console.log('Movie Title: ' + body.Title);
            console.log('Year Released: ' + body.Released);
            console.log('Rating: ' + body.Rated);
            console.log('Production Country: ' + body.Country);
            console.log('Language: ' + body.Language);
            console.log('Plot: ' + body.Plot);
            console.log('Actors: ' + body.Actors);
            console.log('Rotten Tomatoes Rating: ' + body.tomatoUserRating);
            console.log('Rotten Tomatoes URL: ' + body.tomatoURL);
            return;
        } else {
            console.log('Error occurred: ' + error);
            return;
        }
    });