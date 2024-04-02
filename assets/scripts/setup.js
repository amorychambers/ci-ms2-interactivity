// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const fs = require('fs');
// const fileContents = fs.readFileSync('index.html', 'utf-8');
// const document = new JSDOM(fileContents).window.document;

const game = {
    steamLibrary: [],
    randomGames: [],
    newSequence: [],
    playerMoves: [],
    currentScore: 0,
    allGamesMode: false,
};

let newLibrary = [];
let errorMessage = '';


// This promise makes use of an Express.js server to make a server-side call to the Steam Web API. The relevant data it provides is the Steam games library of the user whose ID it accepts
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

// This ensures the steamLibrary property is empty before all allGamesModeToggle function determines whether it will select from all games or only unplayed ones
function addNewLibrary() {
    game.steamLibrary = [];
}

function throwError() {
    console.log(errorMessage);
}

fetchLibrary.then(addNewLibrary, throwError);

// This creates a list of four random games from the user's library to be used in the game
function getGamesList() {
    allGamesModeToggle();
    let count = game.steamLibrary.length;
    let randomNums = [];
    for (let i = 0; i < 4; i++) {
        randomNums.push(Math.floor(Math.random() * count));
    }
    //Creates a list of random games to play with 
    for (let i of randomNums) {
        game.randomGames.push(game.steamLibrary[i]);
    };
};

// This determined whether or not the user has selected All Games Mode, and filters for unplayed games only if not
function allGamesModeToggle() {
    if (game.allGamesMode == true) {
        game.steamLibrary = newLibrary;
    } else if (game.allGamesMode == false) {
        let unplayedGames = newLibrary.filter(game => game.playtime_forever == 0);
        game.steamLibrary = unplayedGames;
    };
};

function randomSequence(array) {
    for (let i = 0; i < 10; i++) {
        let randomIndex = Math.floor(Math.random() * 4)
        game.newSequence.push(array[randomIndex]);
    };
    console.log(game.newSequence);
};

// At this point I decided to start using jQuery to manipulate the DOM, as all of my tests for the API call and data manipulation are passing, and it will be used to run the game later

function newGameBoard() {
    $('#new-player').fadeOut(1500);
    $('#intro').fadeOut(1500);
    $('#requirements').fadeOut(1500);
    $('#gameboard').delay(1490).fadeIn(1500);
};

function createCardImages(array) {
    for (let i in array) {
        debugger;
        let gameID = '#game' + (Number(i) + 1);
        let gameDiv = document.getElementById(`${gameID}`);
        let imageURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${array[i].appid}/${array[i].img_icon_url}.jpg`
        console.log(imageURL);
    }
};



module.exports = { game, fetchLibrary, newLibrary, getGamesList, randomSequence, newGameBoard, createCardImages };
