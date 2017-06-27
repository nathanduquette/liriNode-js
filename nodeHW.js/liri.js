// keys
var Twitter = require("twitter");
var spotify = require("node-spotify-api");
// var omdb    = require("omdb");
var keys 	= require("./keys.js");
var fs 		= require("fs");

//constructors
var accountTweets = new Twitter(keys.twitterKeys);
var spotify       = new spotify(keys.spotifyKeys);
// var omdb          = new omdb(keys.ombdKeys);


var request = require("request");



var limitTweets = 20;

var command = process.argv[2];
var value 	= process.argv[3];

// my-tweets

function myTweets(){
	var params = {screen_name: "gypsynarwhal", count: limitTweets};
	accountTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
  	if (error)
  	{
    	console.log(error);
  	}
  	else if (!error)
  	{
  		console.log("\nThis is your last" + (tweets.length) + "tweets: \n");
  		for (var i = 0; i < tweets.length; i++){
  			console.log(tweets[i].text);
  			console.log("\nCreated on: " + tweets[i].created_at + "\n ");
  			}
  		}
	});
	return;
}

if (command === "my-tweets") {
		myTweets();
}



// spotify-this-song

function mySpotify(){

	spotify.search({ type: "track", query: value, limit: "1" }, function (error, data) {
        
	    if ( error ) {
	        console.log('Error occurred: ' + error);
	        return;
	    }
	 	else if (!error){
	 		console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n ");
	 		console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n ");
	 		console.log("Album: " +JSON.stringify(data.tracks.items[0].album.name) + "\n ");
	 		console.log("Link: " + JSON.stringify(data.tracks.items[0].album.external_urls));
	 		
	 		 
	 	}
	     
	});
}

if (command === "spotify-this-song") {
	mySpotify();
}



// movie-this

var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + value + "&y=&plot=short&r=json";
request(queryUrl, function(error, response, body) {
    if (!error && response.statusCode == 200 && command === "movie-this") {  
    	body = JSON.parse(body);
        console.log("\nMovie Title: " + body.Title + "\n ");
        console.log("Year Released: " + body.Released + "\n ");
        console.log("Rating: " + body.Rated + "\n ");
        console.log("Production Country: " + body.Country + "\n ");
        console.log("Language: " + body.Language + "\n ");
        console.log("Plot: " + body.Plot + "\n ");
        console.log("Actors: " + body.Actors + "\n ");
        console.log("Rotten Tomatoes Rating: " + body.tomatoUserRating + "\n ");
        console.log("Rotten Tomatoes URL: " + body.tomatoURL);
        return;
    }

    else

    {
        console.log("ƃuᴉʞɔnɟ error: "+ error);
        return;
    }
});






// function omdb() {

	
 
// 	omdb.search(value, function(error, movies) {
//     	if(error) {
//     	    return console.error(error);
//     	}
 
//     	if(movies.length < 1) {
//         	return console.log("No movies were found!");
//     	} 
//     	movies.forEach(function(movie) {
//         	console.log('%s (%d)', movie.title, movie.year);
//     	}); 
// 	});
 
// 	omdb.get({ title: 'Saw', year: 2004 }, true, function(error, movie) {
//     	if(error) {
//         	return console.error(error);
//     	}
 
//     	if(!movie) {
//         	return console.log("Movie not found! ya BOZO!");
//     	}
//     	else if (movie){
//     		// * Title of the movie.
//     		console.log("Movie Title: " + movie.title);
// 		  	// * Year the movie came out.
// 		  	console.log("Year Released: " + movie.year);
// 		  	// * IMDB Rating of the movie.
// 		  	console.log("IMDB Rating: " + movie.imdb.rating);
// 		  	// * Country where the movie was produced.
// 		  	console.log("Origin: " );
// 		  	// * Language of the movie.
// 		  	console.log("Language: " );
// 		  	// * Plot of the movie.
// 		  	console.log("Plot: " );
// 		  	// * Actors in the movie.
// 		  	console.log("Actors/Actresses: " );
// 		  	// * Rotten Tomatoes URL.
// 		  	console.log("Rotten Tomatoes URL: " );
// 		  	return
//     	}
// 	});
// }
// if (command === "movie-this"){
// 	omdb();
// }



// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json&apikey=40e9cece";
  

// do-what-it-says
function doSays(){
	fs.readFile("random.txt", "utf8", function(error, data){
		if(error){
			return console.log("sick bro, its broken");
		}
		else
		{
			console.log(data);
		}
	});

}
if (command === "do-what-it-says"){
	doSays();
}
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

