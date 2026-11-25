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
    
});