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
};


function getSteamLibrary() {
    
    document.getElementById('summon').addEventListener('click', async () => {

        var baseURL = 'http://localhost:5500/getlibrary/?';
        // var userID = document.getElementById('userID').value;
        // Using static ID for testing
        var userID = '76561198033224422'
        var newURL = baseURL + userID;
        
        var req = new XMLHttpRequest();
        req.open('GET', newURL, true);
        // This function isolates the games array from the Steam Web API response and assigns it to the steamLibrary key 
        const data = await req.addEventListener('load', function () {
            if (this.readyState == 4 && this.status == 200) {
                const steamData = JSON.parse(req.responseText);
                game.steamLibrary = steamData.response.games;
            } else {
                console.log('Error type: ' + this.status)
            }
            return game.steamLibrary;
        });
        // AMORY: Check Steam API status options for different incorrect data inputs later and account for them with alerts
        
        req.send();
        return data;
    });
};

module.exports = { game, getSteamLibrary };
