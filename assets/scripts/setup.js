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
        // req.onreadystatechange = function () {
        //     if (this.readyState == 4 && this.status == 200) {
        //         game.steamLibrary = xhttp.responseText;
        //         console.log('Success!')
        //     } else {
        //         console.log('Error in request')
        //     };
        req.addEventListener('load', function(){
            if(req.status>= 200 && req.status<400){
            var response = JSON.parse(req.responseText);
            console.log(JSON.parse(req.responseText));
            }
            else {
                console.log("Error in network request: " + req.statusText);
            }
        });
            // Check Steam API status options for different incorrect data inputs later and account for them with alerts

            req.send();
        };



console.log('hello');