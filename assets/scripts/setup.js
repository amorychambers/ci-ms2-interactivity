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


// This promise makes use of an express server to make a server-side call to the Steam Web API. The relevant data it provides is the Steam games library of the user whose ID it accepts
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
    game.steamLibrary = [];
}

function throwError() {
    console.log(errorMessage);
    // Fix JSDOM reference
}

fetchLibrary.then(addNewLibrary, throwError);

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

function newGameBoard() {
    document.getElementById('new-player').remove();
    const board = document.createElement('main');
    board.innerHTML = `
    <main id='gameboard'>
    <div class="container">
        <div class="row center">
            <h2 id='smello' class='heading my-4'>Board</h2>
            <div class="col card card1"></div>
            <div class="col card card2"></div>
        </div>
        <div class="row">
            <div class="col card card3"></div>
            <div class="col card card4"></div>
        </div>
    </div>
    <hr>
    <div class="container">
        <div class="row center">
            <h2 class='heading mb-4'>Player Cards</h2>
            <div class="col card card1"></div>
            <div class="col card card2"></div>
        </div>
        <div class="row">
            <div class="col card card3"></div>
            <div class="col card card4"></div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col center m-4">
                <h3 class='heading'>Current Score</h3>
                <h4 class='sub-heading'><span id='current-score'>0</span>/10</h4>
                <button class='btn btn-outline-warning my-3'>NEW GAME</button>
            </div>
        </div>
    </div>
</main>`;
document.getElementById('intro').insertAdjacentElement('afterend', board);
};


module.exports = { game, fetchLibrary, newLibrary, getGamesList, randomSequence };
