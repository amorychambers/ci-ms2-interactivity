import {api, steamID} from './key.js';

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
        document.getElementById('smello').innerHTML = xhttp.responseType;
    };
    // Check Steam API status options for different incorrect data inputs later and account for them with alerts

};

xhttp.open('GET', `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${api}&steamid=${steamID}&include_appinfo=true&format=json`);
xhttp.send();

function getSteamLibrary() {

};
console.log('smello');

export { game, getSteamLibrary };