const game = {
    steamLibrary: [],
    randomGames: [],
    newSequence: [],
    playerMoves: [],
    currentScore: 0,
};


document.getElementById('summon').addEventListener('click', getSteamLibrary);

function getSteamLibrary() {

        var baseURL = 'http://localhost:5500/getlibrary/?';
        var userID = document.getElementById('userID').value;
        var newURL = baseURL + userID;

        var req = new XMLHttpRequest();
        req.open('GET', newURL, true);
        req.addEventListener('load',function () {
            if (this.readyState == 4 && this.status == 200) {
                const steamData = JSON.parse(req.responseText);
                game.steamLibrary = steamData.response.games;
            } else {
                console.log('Error type: ' + this.status)
            }});
            // Check Steam API status options for different incorrect data inputs later and account for them with alerts

            req.send();
        };



console.log('hello');