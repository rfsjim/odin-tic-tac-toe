const { createPlayer } = require('../js/ticTacToe');

test('new player has a score of zero', () => {
    const alice = createPlayer('Alice', 'X');

    expect(alice.getScore()).toBe(0);
});

test('increasing score increments it by one', () => {
    const bob = createPlayer('Bob', 'O');

    expect(bob.getScore()).toBe(0);

    bob.increaseScore();

    expect(bob.getScore()).toBe(1);
});

test('player retains marker', () => {
    const eve = createPlayer('Eve', 'X');

    expect(eve.getMarker()).toBe('X');
});

test('two players maintain independent scores', () => {
    const alice = createPlayer('Alice', 'X');
    const bob = createPlayer('Bob', 'O');

    expect(alice.getScore()).toBe(0);
    expect(bob.getScore()).toBe(0);
    
    alice.increaseScore();
    bob.increaseScore();

    expect(alice.getScore()).toBe(1);
    expect(bob.getScore()).toBe(1);

    bob.increaseScore();
    expect(bob.getScore()).toBe(2);
    expect(alice.getScore()).toBe(1);
});

test('player name is retained', () => {
    const mallory = createPlayer('Mallory', 'O');
    const eve = createPlayer('Eve', 'X');

    expect(mallory.name).toBe('Mallory');
    expect(eve.name).toBe('Eve');
});