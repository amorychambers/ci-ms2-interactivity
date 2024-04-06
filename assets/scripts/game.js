// import { game } from './setup.js';

const finalGame = {
    outcome: '',
    appid: 0,
    icon: '',
    title: '',
    playtime: 0,
    newsitems: [],
};

$('#start').one('click', beginNextRound)

//This function calls all the necessary functions to set up and run the next turn
function beginNextRound() {
    updateTurn();
    setComputerTurn();
    runCountdown();
    showComputerTurn();
    setTimeout(() => {
        handleButton();
    }, 1000);
};

function updateTurn() {
    game.currentScore += 1;
    $('#current-score').html(game.currentScore);
};

//This function changes the length of the sequence over the five rounds of the game
function setComputerTurn() {
    let array = game.newSequence;
    switch (game.currentScore) {
        case 1:
            game.thisTurn = array.slice(0, 4);
            break;
        case 2:
            game.thisTurn = array.slice(0, 5);
            break;
        case 3:
            game.thisTurn = array.slice(0, 7);
            break;
        case 4:
            game.thisTurn = array.slice(0, 9);
            break;
        case 5:
            game.thisTurn = array;
    };
};

//This function runs a three second countdown before the round begins
function runCountdown() {
    $('#counter').show()
    $('#counter').html('3')
    setTimeout(() => {
        $('#counter').html('2')
    }, 1000);
    setTimeout(() => {
        $('#counter').html('1')
    }, 2000);
    setTimeout(() => {
        $('#counter').html('GO!')
    }, 3000);
    setTimeout(() => {
        $('#counter').hide()
    }, 3500);
};

//This function waits for the countdown to finish and then loops over each game in the game.thisTurn array to reveal each one in sequence. It displays a message to the user and then moves the screen to the player board
function showComputerTurn() {
    let turnTime = 4500 + ((game.thisTurn.length - 1) * 1500);
    let yourTurn = turnTime + 800;
    let snapToPlayerCards = turnTime + 1500;
    setTimeout(() => {
        for (let i = 0; i < game.thisTurn.length; i++) {
            revealGame(i);
        }
    }, 3000);
    setTimeout(() => {
        game.computerTurn = false;
        createPlayerCards();
    }, turnTime);
    setTimeout(() => {
        $('#counter').html('YOUR TURN!')
        $('#counter').show()
    }, yourTurn);
    setTimeout(() => {
        let playerCards = document.getElementById('card1');
        let rect = playerCards.getBoundingClientRect();
        window.scrollTo(0, rect.y);
        $('#counter').hide()
        $('#counter').html('3')
    }, snapToPlayerCards);
};

//This function uses setTimeout functions to briefly display the game that the player has to remember
function revealGame(index) {
    let showTime = (500 + (1500 * (index)));
    let hideTime = (1000 + (1500 * (index)));
    setTimeout(() => {
        $(`img[data-game-id|=${game.thisTurn[index]}]`).css('opacity', '1');
        $(`img[data-game-id|=${game.thisTurn[index]}]`).parent().addClass('attention');
    }, showTime)
    setTimeout(() => {
        $(`img[data-game-id|=${game.thisTurn[index]}]`).css('opacity', '0');
        $(`img[data-game-id|=${game.thisTurn[index]}]`).parent().removeClass('attention');
    }, hideTime);
};

// This function sets up the player cards to accept input during the player turn
function createPlayerCards() {
    for (let i = 0; i < 4; i++) {
        let cardID = '#card' + (Number(i) + 1);
        if (game.currentScore > 0) {
            $(cardID).on('click', playerSelect)
        }
        $(cardID).hover(function () { $(cardID).children(':first').css('opacity', '0.8') }, function () { $(cardID).children(':first').css('opacity', '1') });
    };
};

//This function removes the player input functionality during the computer turn
function disablePlayerCards() {
    for (let i = 0; i < 4; i++) {
        let cardID = '#card' + (Number(i) + 1);
        $(cardID).off('click', playerSelect)
    };
};

//This function disables the start/next round button so that it cannot be used during the computer turn or player turn, only in between rounds
function handleButton() {
    if ($('#start').attr('data-disabled') == 'false') {
        $('#start').addClass('disabled').attr('data-disabled', 'true').html('NEXT ROUND');
        $('#focus').addClass('disabled').attr({ 'aria-disabled': 'true', 'tabindex': '-1' });
    } else {
        $('#start').removeClass('disabled').attr('data-disabled', 'false');
        $('#focus').removeClass('disabled').attr({ 'aria-disabled': 'false', 'tabindex': '1' });
        $('#start').one('click', beginNextRound)
    };
};

//This function provides visual feedback to the player input, and if it is the player's turn, adds the selection to the game.playerMoves array
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

//This function checks if the player input this round matches the sequence that was played at the beginning, and handles success and defeat conditions 
function checkIfCorrect() {
    if (game.thisTurn.toString() == game.playerMoves.toString()) {
        if (game.currentScore < 5) {
            flashCorrectAnimation();
            handleButton();
            game.playerMoves = [];
        } else {
            flashCorrectAnimation();
            finalGame.outcome = 'success';
            playerSuccess();
        }
    } else {
        flashIncorrectAnimation();
        finalGame.outcome = 'defeat';
        playerDefeat();

    }
};

//These functions play a simple animation lighting up the card backgrounds when the player's turn is over. The flashCorrectAnimation also scrolls to the top of the screen and flashes the Next Turn button to communicate it is now active again
function flashCorrectAnimation() {
    for (let i of $('.player-card')) {
        setTimeout(() => {
            $(i).addClass('clicked');
        }, 250);
        setTimeout(() => {
            $(i).removeClass('clicked')
        }, 400);
        setTimeout(() => {
            $(i).addClass('clicked')
        }, 500);
        setTimeout(() => {
            $(i).removeClass('clicked')
        }, 650);
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 800);
        setTimeout(() => {
            $('#start').addClass('active')
        }, 1500);
        setTimeout(() => {
            $('#start').removeClass('active')
        }, 2000);
    }
};

function flashIncorrectAnimation() {
    for (let i of $('.player-card')) {
        $(i).addClass('wrong');
        setTimeout(() => {
            $(i).removeClass('wrong')
        }, 150);
        setTimeout(() => {
            $(i).addClass('wrong')
        }, 250);
        setTimeout(() => {
            $(i).removeClass('wrong')
        }, 400);
    }
};

//This function picks a final game to show the player at the end of the game. If they win it populates the finalGame object with their most played Steam game; if they lose, it populates the finalGame object with the game they should have clicked next
function chooseFinalGame() {
    if (finalGame.outcome == 'success') {
        finalGame.appid = game.mostPlayedGame.appid;
        finalGame.playtime = Math.floor((game.mostPlayedGame.playtime_forever / 60));
        finalGame.title = game.mostPlayedGame.name;
        finalGame.icon = game.mostPlayedGame.img_icon_url
    } else {
        let gameChoices = [];
        for (let i in game.thisTurn){
            if (game.thisTurn[i] != game.playerMoves[i]) {
            gameChoices.push(game.thisTurn[i]);
            };
        };
        finalGame.appid = gameChoices[0];
        let chosenGame = game.randomGames.filter(game => game.appid == finalGame.appid);
        finalGame.playtime = Math.floor((chosenGame[0].playtime_forever / 60));
        finalGame.title = chosenGame[0].name;
        finalGame.icon = chosenGame[0].img_icon_url;
    }
};

// This function will replace the finalGame image with a backup card if box art does not load or isn't available
function replaceWithBackup() {
    if ($('#modal-image').height() < 50) {
        let title = finalGame.title;
        let appID = finalGame.appid;
        let imgURL = finalGame.icon;
        if (finalGame.outcome == 'success') {
            $('#most-played').html(`<img class='card-img-top'
            src='http://media.steampowered.com/steamcommunity/public/images/apps/${appID}/${imgURL}.jpg' data-title=${title} data-appid=${appID} data-icon=${imgURL} data-opacity='1' data-game-id=${gameID} style='opacity: 1;'>
            <div class="card-body">
            <h5 class='card-title' style='opacity: 1;'>${title}</h5>
            </div>`).addClass('clicked');
        } else {
            $('#winning-game').html(`<img class='card-img-top'
            src='http://media.steampowered.com/steamcommunity/public/images/apps/${appID}/${imgURL}.jpg' data-title=${title} data-appid=${appID} data-icon=${imgURL} data-opacity='1' data-game-id=${gameID} style='opacity: 1;'>
            <div class="card-body">
            <h5 class='card-title' style='opacity: 1;'>${title}</h5>
            </div>`).addClass('attention');
        }
    }
};

async function playerSuccess() {
    for (let i of $('.game')) {
        $(i).addClass('attention');
        $(i).children(':first').css('opacity', '1');
    };
    for (let i of $('.player-card')) {
        $(i).addClass('clicked');
    };
    chooseFinalGame();
    const appDataReceived = await fetchAppNews();
    addModal()
};

async function playerDefeat() {
    for (let i of $('.game')) {
        $(i).addClass('wrong');
        $(i).children(':first').css('opacity', '1');
    };
    for (let i of $('.player-card')) {
        $(i).addClass('wrong');
    };
    chooseFinalGame();
    const appDataReceived = await fetchAppNews();
    addModal();
};

// This promise makes use of an Express.js server to make a server-side call to the Steam Web API. The relevant data it provides is the recent news items for the app ID it accepts. Code snippet for the server call from Dan Beyer's guide, noted in README
function fetchAppNews() {

    return new Promise(function (resolve) {

        var baseURL = 'http://localhost:5500/getnews/?';
        var newsAppID = finalGame.appid;
        var newURL = baseURL + newsAppID;

        var req = new XMLHttpRequest();
        req.open('GET', newURL, true);
        req.addEventListener('load', function () {
            if (this.readyState == 4 && this.status == 200) {
                let appData = JSON.parse(req.responseText);
                finalGame.newsitems = appData.appnews.newsitems;
                resolve('Success');
            } else {
                errorMessage = 'Error type: ' + this.status;
                reject('Failure')
            }
        });
        req.send();
    });
};

function addModal() {
    let modal = document.createElement('div');
    let endButtons = document.getElementById('end-buttons');
    if (finalGame.outcome == 'success') {
    modal.innerHTML = `<button id='message-button' type="button" class='btn btn-outline-success my-3' data-bs-toggle="modal" data-bs-target="#playerSuccess">VICTORY MESSAGE</button>
    <div class="modal fade" id="playerSuccess" tabindex="-1" aria-labelledby="playerSuccessLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-header mx-auto pt-2">
                <h5 class="modal-title heading" id="playerSuccessLabel">PLAYER VICTORY!</h5>
            </div>
            <p class="sub-heading m-0 pt-2 dark-bg">You have bested Lost in Library</p>
            <span class='center icons p-3 dark-bg'>&#129395; <i class="fa-solid fa-crown fa-xl" style="color: #FFD43B;"></i>
                &#129395;</span>
            <p class='center px-4 my-4'>Your games slink back to your Steam Library in gracious defeat to await their chance
                on another day.</p>
                <div class='modal-body'>
                <div class='container-fluid g-0'>
            <div class="row dark-bg">
            <div class="col card player-card m-3" id="most-played">
            <img src="https://steamcdn-a.akamaihd.net/steam/apps/${finalGame.appid}/library_600x900_2x.jpg"
                data-title=${finalGame.title} data-appid="${finalGame.appid}"
                data-icon=${game.mostPlayedGame.img_icon_url} data-opacity="1" id='modal-image' onload='replaceWithBackup'>
            </div>
            <div class='col center m-3'>
            <p>Perhaps you would like to revisit an old favourite?</p>
            <p class='sub-heading'>${finalGame.title} - PLAYTIME: ${finalGame.playtime}</p>
            </div>
            </div>
            <div class="row">
                <div class="col m-2 text-start" id='app-info'>
                    <h3>Most Recent News</h3>
                    <a href=${finalGame.newsitems[0].url} target='_blank'>${finalGame.newsitems[0].title}</a>
                    <p>${finalGame.newsitems[0].contents}</p>
                </div>
            </div>
            </div>
            </div>
            </div>
            <div class="modal-footer center">
                <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
        </div>`;
    } else {
        modal.innerHTML = `<button id='message-button' type="button" class='btn btn-outline-danger my-3' data-bs-toggle="modal" data-bs-target="#playerDefeat">DEFEAT MESSAGE</button>
        <div class="modal fade" id="playerDefeat" tabindex="-1" aria-labelledby="playerDefeatLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-header mx-auto pt-2">
                    <h5 class="modal-title heading" id="playerDefeatLabel">PLAYER DEFEAT</h5>
                </div>
                <p class="sub-heading m-0 pt-2 dark-bg">You have been defeated by Lost in Library</p>
                <span class='center icons p-3 dark-bg'>&#128532; <i class="fa-solid fa-person-falling fa-xl" style="color: #c70039;"></i> &#128532;</span>
                <p class='center px-4 my-4'>Your games have rallied in a roguish mutiny and have overthrown you.</p>
                <div class='modal-body'>
                <div class='container-fluid g-0'>
                <div class="row dark-bg">
                <div class="col card player-card m-3" id="winning-game">
                <img src="https://steamcdn-a.akamaihd.net/steam/apps/${finalGame.appid}/library_600x900_2x.jpg"
                    data-title=${finalGame.title} data-appid="${finalGame.appid}"
                    data-icon=${finalGame.icon} data-opacity="1" id='modal-image'>
                </div>
                <div class='col center m-3'>
                <p>Will you accept defeat and give the game that bested you a chance?</p>
                <p class='sub-heading'>${finalGame.title} - PLAYTIME: ${finalGame.playtime}</p>
                </div>
                </div>
                <div class='row'>
                    <div class="col m-2 text-start" id='app-info'>
                        <h3>Most Recent News</h3>
                        <a href=${finalGame.newsitems[0].url} target='_blank'>${finalGame.newsitems[0].title}</a>
                        <p>${finalGame.newsitems[0].contents}</p>
                    </div>
                 </div>   
                </div>
                </div>
                </div>
                <div class="modal-footer center">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>`;
    }
    endButtons.insertAdjacentElement('beforeend', modal);
    $('#message-button').click();
    $('#new-game').show();
    // $('#new-game').click(startNewGame);
};