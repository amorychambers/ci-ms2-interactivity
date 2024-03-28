const {api, steamID} = require('./key.js');

const game = {
    steamLibrary: [],
    randomGames: [],
    newSequence: [],
    playerMoves: [],
    currentScore: 0,
};

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState = 4 && this.status == 200) {
        game.steamLibrary = [xhttp.responseText];
    };
    // Check Steam API status options for different incorrect data inputs later and account for them with alerts

};

xhttp.open('GET', `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api}&steamid=${steamID}&include_appinfo=true&format=json`);
xhttp.send();

function getSteamLibrary() {
    console.log(typeof(xhttp.responseText));
    console.log(game.steamLibrary);
};

module.exports = { game, getSteamLibrary };