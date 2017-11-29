//Global Variables
var request = require("request");
var keys = require("./keys.js");

//Twitter Specific Global Variables
var Twitter = require("twitter");
var myTweets = "my-tweets";
var input = process.argv[2];
var count = 0;

var twitterKeys = new Twitter({
    consumer_key: keys.consumer_key,
    consumer_secret: keys.consumer_secret,
    access_token_key: keys.access_token_key,
    access_token_secret: keys.access_token_secret,
});
// console.log(twitterKeys);

//Twitter My-Tweet Function
function getTweets() {
    twitterKeys.get("statuses/user_timeline", function(err, tweets, body) {
        // If the request was successful...
        if (!err) {
            // Then log the body from the site!
            console.log("HEY");
        }

        if (err) {
            console.log(err);
        }
        if (input === myTweets) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
                count++;
                if (count === 20) {
                    break;
                }
            }
        }
    });
}
// getTweets();

// // Spotify Specific Global Variables
var Spotify = require('node-spotify-api');
var spotifyKey = new Spotify({
    id: keys.id,
    secret: keys.secret,
});

console.log(spotifyKey);

var userSong = process.argv[3];
var songNameSearch = "spotify-this-song";

//Spotify Function
spotifyKey.search({ type: "track", query: userSong }, function(err, spotify) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    console.log(userSong);
    if (input === songNameSearch) {
        console.log("SONG NAME: " + spotify.tracks.items[0].name);
        console.log("ARTIST NAME: " + spotify.tracks.items[0].album.artists[0].name);
        console.log("ALBUM: " + spotify.tracks.items[0].album.name);
        console.log("URL: " + spotify.tracks.items[0].album.artists[0].external_urls.spotify);
    }
});
//Figure out a more efficient way to call twitter functions
