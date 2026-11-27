const { ticTacToe } = require('../js/ticTacToe');

test('empty board has no winner', () => {
    ticTacToe.gameInit();
    
    expect(ticTacToe.isWinner()).toBe(false);
});

test('each of the three rows can win', () => {
    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('O', 0, 1);
    ticTacToe.placeMarker('O', 0, 2);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 1, 0);
    ticTacToe.placeMarker('X', 1, 1);
    ticTacToe.placeMarker('X', 1, 2);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 2, 0);
    ticTacToe.placeMarker('X', 2, 1);
    ticTacToe.placeMarker('X', 2, 2);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('O', 0, 1);
    ticTacToe.placeMarker('X', 2, 0);
    ticTacToe.placeMarker('X', 2, 1);
    ticTacToe.placeMarker('X', 2, 2);

    expect(ticTacToe.isWinner()).toBe(true);
});

test('each of the three cols can win', () => {
    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('O', 1, 0);
    ticTacToe.placeMarker('O', 2, 0);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 0, 1);
    ticTacToe.placeMarker('X', 1, 1);
    ticTacToe.placeMarker('X', 2, 1);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 0, 2);
    ticTacToe.placeMarker('X', 1, 2);
    ticTacToe.placeMarker('X', 2, 2);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 1);
    ticTacToe.placeMarker('O', 1, 1);
    ticTacToe.placeMarker('X', 0, 2);
    ticTacToe.placeMarker('X', 1, 2);
    ticTacToe.placeMarker('X', 2, 2);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('X', 0, 1);
    ticTacToe.placeMarker('X', 1, 2);
    ticTacToe.placeMarker('O', 1, 0);
    ticTacToe.placeMarker('O', 2, 0);

    expect(ticTacToe.isWinner()).toBe(true);
});
 
test('diagonal directions can win', () => {
    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('O', 1, 1);
    ticTacToe.placeMarker('O', 2, 2);

    expect(ticTacToe.isWinner()).toBe(true);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 0, 2);
    ticTacToe.placeMarker('X', 1, 1);
    ticTacToe.placeMarker('X', 2, 0);

    expect(ticTacToe.isWinner()).toBe(true);
});

test('incomplete lines do not consitute a win', () => {
    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('O', 1, 1);
    ticTacToe.placeMarker('X', 2, 2);

    expect(ticTacToe.isWinner()).toBe(false);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 0, 2);
    ticTacToe.placeMarker('X', 1, 1);
    ticTacToe.placeMarker('O', 2, 0);

    expect(ticTacToe.isWinner()).toBe(false);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 2);
    ticTacToe.placeMarker('X', 1, 2);
    ticTacToe.placeMarker('X', 2, 2);

    expect(ticTacToe.isWinner()).toBe(false);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('X', 0, 1);
    ticTacToe.placeMarker('O', 0, 2);

    expect(ticTacToe.isWinner()).toBe(false);
});

test('markers scattered across different lines do not consitute a win', () => {
    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 1, 1);
    ticTacToe.placeMarker('X', 0, 0);
    ticTacToe.placeMarker('X', 0, 2);

    expect(ticTacToe.isWinner()).toBe(false);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('O', 1, 1);
    ticTacToe.placeMarker('O', 0, 0);
    ticTacToe.placeMarker('O', 2, 0);

    expect(ticTacToe.isWinner()).toBe(false);
});

test('a completed draw does not consitute a win', () => {
    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 0, 0);
    ticTacToe.placeMarker('O', 0, 1);
    ticTacToe.placeMarker('O', 0, 2);
    ticTacToe.placeMarker('O', 1, 0);
    ticTacToe.placeMarker('X', 1, 1);
    ticTacToe.placeMarker('X', 1, 2);
    ticTacToe.placeMarker('X', 2, 0);
    ticTacToe.placeMarker('X', 2, 1);
    ticTacToe.placeMarker('O', 2, 2);

    expect(ticTacToe.isWinner()).toBe(false);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 0, 0);
    ticTacToe.placeMarker('X', 0, 1);
    ticTacToe.placeMarker('O', 0, 2);
    ticTacToe.placeMarker('O', 1, 0);
    ticTacToe.placeMarker('O', 1, 1);
    ticTacToe.placeMarker('X', 1, 2);
    ticTacToe.placeMarker('X', 2, 0);
    ticTacToe.placeMarker('O', 2, 1);
    ticTacToe.placeMarker('X', 2, 2);

    expect(ticTacToe.isWinner()).toBe(false);

    ticTacToe.gameInit();

    ticTacToe.placeMarker('X', 0, 0);
    ticTacToe.placeMarker('X', 0, 1);
    ticTacToe.placeMarker('O', 0, 2);
    ticTacToe.placeMarker('O', 1, 0);
    ticTacToe.placeMarker('O', 1, 1);
    ticTacToe.placeMarker('X', 1, 2);
    ticTacToe.placeMarker('X', 2, 0);
    ticTacToe.placeMarker('X', 2, 1);
    ticTacToe.placeMarker('O', 2, 2);

    expect(ticTacToe.isWinner()).toBe(false);
});