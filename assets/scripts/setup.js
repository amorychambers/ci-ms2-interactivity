/* const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const fileContents = fs.readFileSync('index.html', 'utf-8');
const document = new JSDOM(fileContents).window.document; 
*/
// The Node.js modules above are used to run the setup.test.js suite in Jest. In order to run the test suite, it is necessary to remove the comment notation and allow Node to create a virtual DOM to test.
// At the bottom of the file, there is a line of module.exports to pass all the functions to the test suite in Node. The comment notation must be removed there as well for the test suite to run.

// import { createPlayerCards, playerSelect } from './game.js';

const game = {
    steamLibrary: [],
    randomGames: [],
    newSequence: [],
    thisTurn: [],
    playerMoves: [],
    currentScore: 0,
    allGamesMode: false,
    computerTurn: true,
    mostPlayedGame: {},
};

// Main setup function runs when the 'Summon' button is clicked and prepares the page for a new game to start using data from the Steam Web API
async function setupNewGame() {
    newGameBoard();
    checkForResponse();
    const dataReceived = await fetchLibrary();
    getGamesList();
    createCardImages(game.randomGames);
    randomSequence(game.randomGames);
};


$('#summon').click(setupNewGame);
$('#all-games').on('change', checkAllGamesMode);
$('#userID').on('keydown', function(e) {
    if (e.key == 'Enter') {
        setupNewGame();
    };
});

let newLibrary = [];

// This function makes use of a promise to make a server-side call to the Steam Web API. The relevant data it provides is the Steam games library of the user whose ID it accepts. Code snippet for the server call from Dan Beyer's guide, noted in README
function fetchLibrary() {

    return new Promise(function (resolve, reject) {
        
        let userID;
        var userInput = document.getElementById('userID').value;
        if (typeof(Number(userInput)) == 'number' && userInput > 0) {
            userID = userInput;
        } else if (!userInput) {
            userID = '76561198033224422';
        } else {
            userID = '76561198033224422';
            alert("Sorry! That wasn't recognised as a Steam ID, so the game has defaulted to another user's library. Whose library? MINE 😈");
        }
        var newURL = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=0D8BF8A074559485F9D281D0660EBAA6&steamid=${userID}&include_appinfo=true&format=json`;
        
        var req = new XMLHttpRequest();
        req.open('GET', newURL, true);
        // This function isolates the games array from the Steam Web API response and assigns it to the newLibrary global variable after checking the requirements for the game are met
        // Code snippet for the three lines isolating the object for the game with the highest playtime in the games array taken from StackOverflow user Cristian S, linked in README
        req.addEventListener('load', function () {
            if (this.status>= 200 && this.status<400) {
                steamData = JSON.parse(req.responseText);
                if (steamData.response.games.length > 4) {
                    newLibrary = steamData.response.games;
                    let playtimesArray = newLibrary.map(game => game.playtime_forever);
                    let highestPlaytime = Math.max(...playtimesArray);
                    game.mostPlayedGame = newLibrary.filter(game => game.playtime_forever === highestPlaytime)[0];
                    resolve('Success!');
                } else if (steamData.response.games.length == 0) {
                    reject({errorMessage: this.status});
                    alert("Sorry old sport! It looks like there was an error loading your Steam Library. Be sure to check the requirements and the details you entered, or try again later!")
                } else {
                    reject({errorMessage: this.status});
                    alert("Sorry old sport! It looks like there was an error, and Steam couldn't pull enough games from your library to successfully load. Be sure to check the requirements and the details you entered, or try again later!")
                }
            } else {
                reject({errorMessage: this.status});
            };
        });
        req.send();
    });
};

function checkForResponse(){
    setTimeout(() => {
        if (game.steamLibrary.length == 0){
            alert("Sorry old sport! It looks like there was an error loading your Steam Library. Be sure to check the requirements and the details you entered, or try again later!")
        };
    }, 6000);
};

// This creates a list of four random games from the user's library to be used in the game
function getGamesList() {
    allGamesModeToggle();
    let count = game.steamLibrary.length;
    let randomNums = [];
    while (randomNums.length < 4) {
        let randomIndex = Math.floor(Math.random() * count);
        if (!randomNums.includes(randomIndex)) {
            randomNums.push(randomIndex);
        } else {
            return;
        }
    };
    //Creates a list of random games to play with 
    for (let i of randomNums) {
        game.randomGames.push(game.steamLibrary[i]);
    };
}

// This is an event handler to ensure the allGamesMode property of the game object is up to date with user input
function checkAllGamesMode() {
    if (document.getElementById('all-games').checked) {
        game.allGamesMode = true;
    } else {
        game.allGamesMode = false;
    };
}

// This determines whether or not the user has selected All Games Mode, and filters for unplayed games only if not
function allGamesModeToggle() {
    let unplayedGames = newLibrary.filter(game => game.playtime_forever == 0);
    if (game.allGamesMode == true || unplayedGames.length < 4) {
        game.steamLibrary = newLibrary;
    } else if (game.allGamesMode == false) {
        game.steamLibrary = unplayedGames;
    };
};

function randomSequence(array) {
    for (let i = 0; i < 10; i++) {
        let randomIndex = Math.floor(Math.random() * 4)
        game.newSequence.push(array[randomIndex].appid);
    };
};

function newGameBoard() {
    game.computerTurn = true;
    game.currentScore = 0;
    game.newSequence = [];
    game.playerMoves = [];
    game.randomGames = [];
    game.thisTurn = [];
    $('#new-player').fadeOut(1500);
    $('#intro').fadeOut(1500);
    $('#info').fadeOut(1500);
    $('#gameboard').delay(1490).fadeIn(1500);
};

// This function loops through each set of four cards and assigns a src URL to each that should provide Steam's cover art for that game, using the app ID provided by the API. 
// The board images are set to transparent for the game, and I have used a data-type attribute to supply API data to the backupCard function if there is a loading error
function createCardImages(array) {
    for (let i in array) {
        let gameID = '#game' + (Number(i) + 1);
        let cardID = '#card' + (Number(i) + 1);
        let imageURL = `https://steamcdn-a.akamaihd.net/steam/apps/${array[i].appid}/library_600x900_2x.jpg`;
        $(gameID).children(':first').attr({ 'src': imageURL, 'data-title': array[i].name, 'data-appid': array[i].appid, 'data-icon': array[i].img_icon_url, 'data-opacity': 0, 'data-game-id': array[i].appid }).css('opacity', 0).on('error', backupCard);
        $(cardID).children(':first').attr({ 'src': imageURL, 'data-title': array[i].name, 'data-appid': array[i].appid, 'data-icon': array[i].img_icon_url, 'data-opacity': 1 }).on('error', backupCard);
    };
    createPlayerCards()
};

// This function replaces the box cover art with a custom card that displays the game's title and icon from the Steam Web API, when the box art does not exist or fails to load
function backupCard() {
    if ($(this).height() < 50) {
        let title = $(this).attr('data-title');
        let appID = $(this).attr('data-appid');
        let gameID = $(this).attr('data-game-id')
        let imgURL = $(this).attr('data-icon');
        let transparencyToggle = $(this).attr('data-opacity');

        $(this).parent().html(`
        <img class='card-img-top'
        src='http://media.steampowered.com/steamcommunity/public/images/apps/${appID}/${imgURL}.jpg' data-title=${title} data-appid=${appID} data-icon=${imgURL} data-opacity=${transparencyToggle} data-game-id=${gameID} style='opacity: ${transparencyToggle}'>
        <div class="card-body">
        <h5 class='card-title' data-heading-id=${appID} style='opacity: ${transparencyToggle}'>${title}</h5>
        </div>`)
    };
};

function createPlayerCards() {
    for (let i = 0; i < 4; i++) {
        let cardID = '#card' + (Number(i) + 1);
        if (game.currentScore > 0) {
            $(cardID).on('click', playerSelect)
        }
        $(cardID).hover(function () { $(cardID).children(':first').css('opacity', '0.8') }, function () { $(cardID).children(':first').css('opacity', '1') });
    };
};

function playerSelect() {
    $(this).addClass('clicked');
    setTimeout(() => {
        $(this).removeClass('clicked')
    }, 150);
    if (game.computerTurn == false) {
        if (game.playerMoves.length < (game.thisTurn.length - 1)) {
            game.playerMoves.push(Number($(this).children(':first').attr('data-appid')));
        } else if (game.playerMoves.length == (game.thisTurn.length - 1)) {
            game.playerMoves.push(Number($(this).children(':first').attr('data-appid')));
            game.computerTurn = true;
            disablePlayerCards();
            checkIfCorrect();
        };
    };
};

// module.exports = { game, fetchLibrary, newLibrary, getGamesList, randomSequence };
