const {api, steamID} = require('./key.js');

const game = {
    steamLibrary: [],
    randomGames: [],
    newSequence: [],
    playerMoves: [],
    currentScore: 0,
};

const xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState = 4 && this.status == 200) {
        game.steamLibrary = [xhttp.responseText];
    };
    // Check Steam API status options for different incorrect data inputs later and account for them with alerts
    
};

function getSteamLibrary() {

};

module.exports = { game, getSteamLibrary };