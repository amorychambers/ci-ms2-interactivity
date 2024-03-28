/**
 * @jest-environment jsdom
 */

const { game } = require('../setup.js');

describe('game object is ready for new game data', () => {
    test('steamLibrary key is empty', () => {
        expect(game.steamLibrary.length).toBe(0);
    })
});