/**
 * @jest-environment jsdom
 */


const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const fileContents = fs.readFileSync('index.html', 'utf-8');
const document = new JSDOM(fileContents).window.document;

const { game, fetchLibrary, newLibrary, getGamesList, randomSequence } = require('../setup.js');


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
    test('getSteamLibrary connects to the Steam Web API', () => {
        return expect(fetchLibrary).resolves.toBe('Success');
    });
    test('getSteamLibrary populates newLibrary', async () => {
        return fetchLibrary.then(() => {
            setTimeout(() => {
                expect(newLibrary.length).toBeGreaterThan(0);
            }, 1000);
        });
    });
});

describe('setup.js creates a new selection of random games', () => {
    beforeEach(() => {
        game.randomGames = [];
    });
    test('getGamesList filters for games with no recorded playtime', () => {
        return fetchLibrary.then(() => {
            getGamesList();
            for (i in game.steamLibrary) {
                expect(game.steamLibrary[i].playtime_forever).toBe(0);
            };
        });
    });
    test('getGamesList creates a list of four unplayed games to play with', () => {
        return fetchLibrary.then(() => {
            getGamesList();
            expect(game.randomGames.length).toBe(4);
        });
    });
});

describe('setup.js does not filter for unplayed games only in All Games Mode', () => {
    beforeEach(() => {
        game.randomGames = [];
    });
    test('getGamesList creates a list of any four games to play with in All Games Mode', () => {
        return fetchLibrary.then(async () => {
            game.allGamesMode = true;
            await getGamesList();
            expect(game.randomGames.length).toBe(4);
            //Tests that all four games in the randomGames array do not have a collective playtime of 0. Limited by the random element, but if any game in the list has playtime greater than 0, the test will pass. Multiple tests show that it passes each time the random list provides a played game, working correctly
            let playtimeList = [];
            for (i in game.randomGames) {
                playtimeList.push(game.randomGames[i].playtime_forever);
            };
            expect(playtimeList.reduce((acc, curr) => acc + curr)).toBeGreaterThan(0);
        });
    });
    test('getGamesList does not remove played games in All Games Mode', async () => {
        return fetchLibrary.then(() => {
            const length = game.steamLibrary.length;
            getGamesList();
            expect(game.steamLibrary.length).toBe(length);
            expect(game.steamLibrary.length).toBeGreaterThan(0);
        });
    });
});

describe('setup.js creates a random ten game sequence using the appropriate four games selected', () => {
    beforeEach(() => {
        game.randomGames = [];
        game.newSequence = [];
    });
    test('randomSequence creates a ten game long sequence', () => {
        randomSequence(game.randomGames);
        expect(game.newSequence.length).toBe(10);
    });
    test('randomSequence picks from unplayed games in regular play', () => {
        game.allGamesMode = false;
        getGamesList();
        randomSequence(game.randomGames);
        for (let i in game.newSequence) {
            expect(game.newSequence[i].playtime_forever).toBe(0);
        };
    });
    test('randomSequence picks from all games in All Games Mode', () => {
        game.allGamesMode = true;
        getGamesList();
        randomSequence(game.randomGames);
        setTimeout(() => {
            for (let i in game.newSequence) {
                let sum = 0;
                sum += game.newSequence[i].playtime_forever;
                expect(sum).toBeGreaterThan(0);
            };
        }, 1000);
    });
});