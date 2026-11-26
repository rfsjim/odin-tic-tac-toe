const { gameboard } = require('../js/ticTacToe.js');

const gameGrid = gameboard.createGrid();

test('default grid contains three rows', () => {
    expect(gameGrid).toHaveLength(3);
});

test('each row contains three cells', () => {
    gameGrid.forEach(row => {
        expect(row).toHaveLength(3);
    });
});

test('each cell is undefined', () => {
    gameGrid.forEach(row => {
        row.forEach(element => {
            expect(element).toBe(undefined);
        });
    });
});

test('rows are independent array references', () => {
    const independentRowReferences = new Set(gameGrid);
    expect(independentRowReferences.size).toBe(gameGrid.length);
});

test('invalid dimensions throw an error', () => {
    expect(() => {
        gameboard.createGrid('3');
    }).toThrow("Invalid Dimensions");

    expect(() => {
        gameboard.createGrid(-1);
    }).toThrow("Invalid Dimensions");

    expect(() => {
        gameboard.createGrid("2026/12/25");
    }).toThrow("Invalid Dimensions");

    expect(() => {
        gameboard.createGrid(5/2);
    }).toThrow("Invalid Dimensions");
});