const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const fileContents = fs.readFileSync('index.html', 'utf-8');
const document = new JSDOM(fileContents).window.document;

const game = {
    steamLibrary: [],
    randomGames: [],
    newSequence: [],
    playerMoves: [],
    currentScore: 0,
    allGamesMode: false,
};

var newLibrary = '';
var errorMessage = '';

// This function makes use of an express server to make a server-side call to the Steam Web API. The relevant data it provides is the Steam games library of the user whose ID it accepts
let fetchLibrary = new Promise(function (resolve, reject) {

    var baseURL = 'http://localhost:5500/getlibrary/?';
    // var userID = document.getElementById('userID').value;
    // Using static ID for testing
    var userID = '76561198033224422'
    var newURL = baseURL + userID;

    var req = new XMLHttpRequest();
    req.open('GET', newURL, true);
    // This function isolates the games array from the Steam Web API response and assigns it to the newLibrary global variable 
    req.addEventListener('load', function () {
        if (this.readyState == 4 && this.status == 200) {
            steamData = JSON.parse(req.responseText);
            newLibrary = steamData.response.games;
            resolve('Success');
        } else {
            errorMessage = 'Error type: ' + this.status;
            reject('Failure')
        }
    });
    // AMORY: Check Steam API status options for different incorrect data inputs later and account for them with alerts
    req.send();
});

function addNewLibrary() {
    game.steamLibrary = newLibrary;
}

function throwError(errorMessage) {
    console.log(errorMessage);
    // Fix JSDOM reference
}

fetchLibrary.then(addNewLibrary, throwError);

function getGamesList(array) {
    if (game.allGamesMode == false) {
        let unplayedGames = array.filter(game => game.playtime_forever == 0);
        game.steamLibrary = unplayedGames;
    } else {
        return;
    }
};


module.exports = { game, fetchLibrary, getGamesList };
