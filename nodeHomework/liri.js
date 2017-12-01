//Global Variables
var request = require("request");
var keys = require("./keys.js");
var doThis = "do-what-it-says";
var fs = require("fs");

//Twitter Specific Variables
var Twitter = require("twitter");
var myTweets = "my-tweets";
var input = process.argv[2];
var count = 0;

var twitterKeys = new Twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret,
});
// console.log(twitterKeys);

//Twitter My-Tweet Function
if (input === myTweets) {
    console.log("here");
    twitterKeys.get("statuses/user_timeline", function(err, tweets, body) {
        // If the request was successful...
        if (!err) {
            // Then log the body from the site!
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                count++;
                if (count === 20) {
                    break;
                }
            }

            if (err) {
                console.log(err);
            }
        }
    });
}
// // Spotify Specific Variables
var Spotify = require('node-spotify-api');
var spotifyKey = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret,
});
var userSong = process.argv[3];
var songNameSearch = "spotify-this-song";

function spotifySearch(song) {

    spotifyKey.search({ type: "track", query: song }, function(err, spotify) {
        console.log("SONG NAME: " + spotify.tracks.items[0].name);
        console.log("ARTIST NAME: " + spotify.tracks.items[0].album.artists[0].name);
        console.log("ALBUM: " + spotify.tracks.items[0].album.name);
        console.log("URL: " + spotify.tracks.items[0].album.artists[0].external_urls.spotify);
        if (err) {
            return console.log('Error occurred: ' + err);
        }

    });
}
//Spotify Function
function spotify() {
    if (input === songNameSearch) {
        spotifySearch(userSong);
    }

    else if (input === doThis) {
        readFile();
        console.log("here");
    }
}
spotify();

//OMDB
var movieThis = "movie-this";
var userMovie = process.argv[3];

var queryUrl = "http://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=trilogy";
// var queryUrlUndefined = "http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy";

if (input === movieThis) {
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("MOVIE TITLE: " + JSON.parse(body).Title);
            console.log("RELEASE YEAR: " + JSON.parse(body).Year);
            console.log("IMDB RATING: " + JSON.parse(body).imdbRating);
            console.log("ROTTEN TOMATOES RATING: " + JSON.parse(body).Ratings[1].Value);
            console.log("COUNTRY: " + JSON.parse(body).Country);
            console.log("LANGUAGE: " + JSON.parse(body).Language);
            console.log("PLOT: " + JSON.parse(body).Plot);
            console.log("ACTORS: " + JSON.parse(body).Actors);
        }
    });
}
// Function to allow for Mr. Nobody
// if (input === "") {
//     request(queryUrlUndefined, function(error, response, body) {
//         if (!error && response.statusCode === 200) {
//             console.log("MOVIE TITLE: " + JSON.parse(body).Title);
//             console.log("RELEASE YEAR: " + JSON.parse(body).Year);
//             console.log("IMDB RATING: " + JSON.parse(body).imdbRating);
//             console.log("ROTTEN TOMATOES RATING: " + JSON.parse(body).Ratings[1].Value);
//             console.log("COUNTRY: " + JSON.parse(body).Country);
//             console.log("LANGUAGE: " + JSON.parse(body).Language);
//             console.log("PLOT: " + JSON.parse(body).Plot);
//             console.log("ACTORS " + JSON.parse(body).Actors);
//             console.log(body);
//         }
//     });
// }

//FS Function
function readFile() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        if (!err) {
            var nData = data.split(",");
            console.log(nData[0], nData[1]);
            userSong = nData[1];
            console.log(userSong);
            songNameSearch = nData[0];
            spotifySearch(userSong);
        };
    });
};
