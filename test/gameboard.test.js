const { gameboard } = require('../js/ticTacToe.js');

// Gameboard Creation Tests

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

// Gameboard Marker Placement Tests

test('marker at 0 0 can be placed', () => {
    const zeroZeroGrid = gameboard.createGrid();
    gameboard.placeMarker('X', zeroZeroGrid, 0, 0);

    expect(zeroZeroGrid[0][0]).toBe('X');
});

test('marker at 2 2 can be placed', () => {
    const twoTwoGrid = gameboard.createGrid();
    gameboard.placeMarker('O', twoTwoGrid, 2, 2);

    expect(twoTwoGrid[2][2]).toBe('O');
});

test('can not place marker at 3 3', () => {
    const threeThreeGrid = gameboard.createGrid();

    expect(() => {
        gameboard.placeMarker('X', threeThreeGrid, 3, 3);
    }).toThrow("Invalid x and y Co-Ordinates");

    threeThreeGrid.forEach(row => {
        row.forEach(element => {
            expect(element).toBe(undefined);
        });
    });
});

test('can not place marker at negative co-ords', () => {
    const negativeGrid = gameboard.createGrid();

    expect(() => {
        gameboard.placeMarker('O', negativeGrid, -1, 2);
    }).toThrow("Invalid x and y Co-Ordinates");

    negativeGrid.forEach(row => {
        row.forEach(element => {
            expect(element).toBe(undefined);
        });
    });
});

test('can not place marker at fractional co-ords', () => {
    const fractionalGrid = gameboard.createGrid();

    expect(() => {
        gameboard.placeMarker('O', fractionalGrid, 0, 2/3);
    }).toThrow("Invalid x and y Co-Ordinates");

    fractionalGrid.forEach(row => {
        row.forEach(element => {
            expect(element).toBe(undefined);
        });
    });
});

test('marker can not over write another marker', () => {
    const twoTwoGrid = gameboard.createGrid();
    gameboard.placeMarker('O', twoTwoGrid, 2, 2);
    
    expect(() => {
        gameboard.placeMarker('X', twoTwoGrid, 2, 2);
    }).toThrow("Move not valid, possible already taken.");

    expect(twoTwoGrid[2][2]).toBe('O');
});