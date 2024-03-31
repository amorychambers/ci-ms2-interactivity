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
    steamConnect: false,
};

let steamData;

let fetchLibrary = new Promise(function (resolve, reject) {

    var baseURL = 'http://localhost:5500/getlibrary/?';
    // var userID = document.getElementById('userID').value;
    // Using static ID for testing
    var userID = '76561198033224422'
    var newURL = baseURL + userID;

    var req = new XMLHttpRequest();
    req.open('GET', newURL, true);
    // This function isolates the games array from the Steam Web API response and assigns it to the steamLibrary key 
    req.addEventListener('load', function () {
        if (this.readyState == 4 && this.status == 200) {
            steamData = JSON.parse(req.responseText);
            game.steamConnect = true;
            resolve('Success');
        } else {
            console.log('Error type: ' + this.status);
            resolve('Failure')
        }
    });
    // AMORY: Check Steam API status options for different incorrect data inputs later and account for them with alerts
    req.send();
});

function addNewLibrary() {
    console.log('W');
}

function throwError() {
    console.log('L');
}

fetchLibrary.then(addNewLibrary, throwError);




module.exports = { game, fetchLibrary };
