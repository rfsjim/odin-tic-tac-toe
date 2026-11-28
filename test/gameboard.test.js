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

test.each([
    '3',
    -1,
    '2026/12/25',
    5 / 2
])(
    'invalid dimension %p throws an error',
    dimension => {
        expect(() => gameboard.createGrid(dimension))
        .toThrow('Invalid Dimensions')
    }
);

// Gameboard Marker Placement Tests

test.each([
    { x: 0, y: 0, marker: 'X'},
    { x: 2, y: 2, marker: 'O'},
    { x: 1, y: 1, marker: 'X'},
    { x: 1, y: 2, marker: 'X'},
])(
    '$marker marker at $x, $y can be placed and remains $marker',
    ({ x, y, marker }) => {
        const grid = gameboard.createGrid();
        gameboard.placeMarker(marker, grid, x, y);

        expect(grid[x][y]).toBe(marker);
    }
);

test.each([
    { x: 3, y: 3, marker: 'X'},
    { x: -1, y: 2, marker: 'O'},
    { x: 0, y: 2 / 3, marker: 'O'},
])(
    'can not place marker $marker at $x, $y',
    ({ x, y, marker }) => {
        const grid = gameboard.createGrid();
        const originalGrid = grid.map(row => [...row]);

        expect(() => gameboard.placeMarker(marker, grid, x, y))
        .toThrow('Invalid x and y Co-Ordinates');

        expect(grid).toEqual(originalGrid);
    }
);

test('marker can not over write another marker', () => {
    const twoTwoGrid = gameboard.createGrid();
    gameboard.placeMarker('O', twoTwoGrid, 2, 2);
    
    expect(() => {
        gameboard.placeMarker('X', twoTwoGrid, 2, 2);
    }).toThrow("Move not valid, possible already taken.");

    expect(twoTwoGrid[2][2]).toBe('O');
});