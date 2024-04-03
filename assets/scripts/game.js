function showComputerTurn(array) {
    let thisTurn = [];
    switch (game.currentScore) {
        case 1:
            thisTurn = array.slice(0, 4);
            break;
        case 2:
            thisTurn = array.slice(0, 5);
            break;
        case 3:
            thisTurn = array.slice(0, 7);
            break;
        case 4:
            thisTurn = array.slice(0, 9);
            break;
        case 5:
            thisTurn = array;
    };
};

function updateTurn() {
    game.currentScore += 1;
    $('#current-score').html(game.currentScore);
};