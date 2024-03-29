const game = {
    steamLibrary: [],
    randomGames: [],
    newSequence: [],
    playerMoves: [],
    currentScore: 0,
};


// document.getElementById('summon').addEventListener('click', getSteamLibrary);

function getSteamLibrary() {

        var baseURL = 'http://127.0.0.1:5500/getlibrary/?';
        var userID = document.getElementById('userID').value;
        var newURL = baseURL + userID;

        var req = new XMLHttpRequest();
        req.open('GET', newURL, true);
        req.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                game.steamLibrary = xhttp.responseText;
                console.log('Success!')
            } else {
                console.log('Error in request: ' + req.statusText)
            };
            // Check Steam API status options for different incorrect data inputs later and account for them with alerts

        };
        req.send();
};

getSteamLibrary();

console.log('hello');

