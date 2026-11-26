const { ticTacToe } = require('../js/ticTacToe');

test('empty board has no winner', () => {
    ticTacToe.gameInit();
    
    expect(ticTacToe.isWinner()).toBe(false);
});