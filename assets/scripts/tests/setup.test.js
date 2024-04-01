/**
 * @jest-environment jsdom
 */


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const fileContents = fs.readFileSync('index.html', 'utf-8');
const document = new JSDOM(fileContents).window.document;

const { game, fetchLibrary, getGamesList } = require('../setup.js');


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

describe('setup.js successfully calls to Steam Web API', () => {
    // afterEach(() => {
    //     game.steamLibrary = [];
    // });
    test('getSteamLibrary connects to the Steam Web API', () => {
        return expect(fetchLibrary).resolves.toBe('Success');
    });
    test('getSteamLibrary populates game.steamLibrary', () => {
        return fetchLibrary.then(() => {
            expect(game.steamLibrary.length).toBeGreaterThan(0);
        });
    });
});

describe('setup.js creates a new selection of random games', () => {
    beforeEach(() => {
        game.steamLibrary = [];
        game.randomGames = [];
        game.allGamesMode = false;
    });
    test('getGamesList filters for games with no recorded playtime', () => {
        return fetchLibrary.then(() => {
            getGamesList(game.steamLibrary);
            for (i in game.steamLibrary) {
                expect(game.steamLibrary[i].playtime_forever).toBe(0);
            };
        });
    });
    test('getGamesList does not remove played games in All Games Mode', () => {
        game.allGamesMode = true;
        return fetchLibrary.then(() => {
            const length = game.steamLibrary.length;
            getGamesList(game.steamLibrary);
            expect(game.steamLibrary.length).toBe(length);
        });
    });
    test('getGamesList creates a list of four unplayed games to play with', () => {
        return fetchLibrary.then(() => {
            getGamesList(game.steamLibrary);
            expect(game.randomGames.length).toBe(4);
        });
    });
    test('getGamesList creates a list of four games to play with in All Games Mode', () => {
        game.allGamesMode = true;
        return fetchLibrary.then(() => {
            getGamesList(game.steamLibrary);
            expect(game.randomGames.length).toBe(4);
        });
    });
});