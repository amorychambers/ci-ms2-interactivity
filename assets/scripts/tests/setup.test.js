/**
 * @jest-environment jsdom
 */

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const fileContents = fs.readFileSync('index.html', 'utf-8');
const document = new JSDOM(fileContents).window.document;

const { game, getSteamLibrary } = require('../setup.js');


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

describe('setup successfully calls to Steam Web API', () => {
    // afterEach(() => {
    //     game.steamLibrary = [];
    //     game.steamConnect = false;
    // });
    test('getSteamLibrary connects to the Steam Web API', async () => {
        const data = await getSteamLibrary();
        expect(data).toBe('Connect');
    });
    test('getSteamLibrary populates game.steamLibrary', async () => {
        const data = await getSteamLibrary();
        expect(data.length).toBeGreaterThan(0);
    });
});