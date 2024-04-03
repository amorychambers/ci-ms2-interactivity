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
            thisTurn = array.slice(0, 6);
    }
}
