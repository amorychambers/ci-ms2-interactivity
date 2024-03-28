/**
 * @jest-environment jsdom
 */

const { game } = require('../setup.js');

describe('game object is ready for new game data', () => {
    test('steamLibrary key is empty', () => {
        expect(game.steamLibrary.length).toBe(0);
    });
    test('randomGames key is empty', () => {
        expect(game.randomGames.length).toBe(0);
    });
    test('newSequence key is empty', () => {
        expect(game.newSequence.length).toBe(0);
    });
    test('playerMoves key is empty', () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test('currentScore key is set to 0', () => {
        expect(game.currentScore).toBe(0);
    });
});