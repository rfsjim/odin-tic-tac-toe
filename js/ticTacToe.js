/**
 * @fileoverview Tic Tac Toe App
 * @author James
 * @version 0.0.1
 * @since 2026-11-22
 * @updated 2026-11-25
 */

/**
 * Mental Modelling 
 * Real World Activity  Proposed Owner
 * Draw the grid    Gameboard (x)
 * Check position availability  Gameboard (x)
 * Place marker Gameboard (x)
 * Knows current turn   Players
 * Increment score  Player from instruction by game controller
 * Is marker already in use  Game controller
 * Assign markers   Game controller
 * Is marker valid  Game controller
 * Decide who starts    Game controller
 * Tracks current turn  Game controller
 * Alternate turns   Game controller
 * Determine winner or stalemate    Game controller
 */

/**
 * @typedef {'X' | 'O' | undefined} TicTacToeMarker
 */

/**
 * Gameboard to play Tic Tac Toe on
 * Object contains an array
 * Only needs ONE - candidate for IIFE
 * @param {number} dimension 
 */
const gameboard = (
    () => {
        /**
         * Creates a dense 2d square grid from given dimension
         * All elements will initalise with undefined.
         * @param {number} dimension 
         */
        const createGrid = (dimension = 3) => {
            if (!isNumberValid(dimension)) {
                throw new Error("Invalid Dimensions");
            }
            
            return Array.from({ length: dimension }, ()  =>
                Array.from({ length: dimension })
            );
        };

        /**
         * Is Position Available
         * @param {Array} gameGrid 
         * @param {number} x 
         * @param {number} y 
         * @returns {boolean}
         */
        const isPositionAvailable = (gameGrid, x, y) => {
            if (!isPositionValid(gameGrid, x, y,)) {
                throw new Error("Invalid x and y Co-Ordinates");
            }

            return gameGrid[y][x] === undefined; 
        };

        /**
         * Places Marker on Game Board
         * @param {TicTacToeMarker} marker 
         * @param {Array} gameGrid 
         * @param {number} x 
         * @param {number} y 
         */
        const placeMarker = (marker, gameGrid, x, y) => {
            if (!isPositionValid(gameGrid, x, y)) {
                throw new Error("Invalid x and y Co-Ordinates");
            }

            if (isPositionAvailable(gameGrid, x, y)) {
                gameGrid[y][x] = marker;
            }
            else {
                throw new Error("Move not valid, possible already taken.");
            }
        };
        
        /**
         * Is Number a Valid Number?
         * @param {number} number 
         * @returns {boolean}
         */
        const isNumberValid = (number) => {
            if (
                    typeof number !== "number" ||
                    !Number.isInteger(number) ||
                    !Number.isFinite(number) ||
                    number <= 0
                ) {
                    return false;
                }
            
            return true;
        };

        /**
         * Is Position a Valid Position?
         * @param {Array} gameGrid 
         * @param {number} x 
         * @param {number} y 
         * @returns {boolean}
         */
        const isPositionValid = (gameGrid, x, y) => {
            if (
                    typeof x !== 'number' ||
                    typeof y !== 'number' ||
                    !Number.isInteger(x) ||
                    !Number.isInteger(y) ||
                    !Number.isFinite(x) ||
                    !Number.isFinite(y) ||
                    x >= gameGrid.length ||
                    y >= gameGrid.length ||
                    x < 0 ||
                    y < 0
                ) {
                    return false;
                }

            return true;
        };

        return {
            createGrid,
            placeMarker,
        };
    }
)();

/**
 * Tic Tac Toe Player
 * Is not ideal to change marker type at runtime
 * Should be private property
 * Better suited to a Player Factory?
 * @param {string} name 
 * @param {TicTacToeMarker} marker 
 */
function createPlayer(name, marker) {
    let score = 0;

    const getScore = () => score;
    const increaseScore = () => { score++; };

    const getMarker = () => marker;

    return {
        name,
        getScore,
        increaseScore,
        getMarker,
    };
}

// And An object to control the flow of the game itself.

/**
 * Tic Tac Toe Game Controller
 * Need ONE game controller is IIFE
 */
const ticTacToe = (
    () => {
        /**
         * Needs methods like
         * gameInit
         * isWinner,
         * isStalemate,
         * Is marker already in use  Game controller
         * Assign markers   Game controller
         * Is marker valid  Game controller
         * Decide who starts    Game controller
         * Tracks current turn  Game controller
         * Alternate turns   Game controller
         * Determine winner or stalemate    Game controller
         */

        /**
         * @type TicTacToeMarker[][]
         */
        let gameGrid;

        /**
         * Creates new gameboard
         * @returns {void}
         */
        const gameInit = () => {
            gameGrid = gameboard.createGrid();
        };

        /**
         * Is there a winner
         * @returns {boolean}
         */
        const isWinner = () => {
            const winningLength = gameGrid.length;

            let lastMarker = undefined;

            // check rows for complete lines
            for (const row of gameGrid) {
                lastMarker = row[0];
                if (lastMarker === undefined) {
                    continue;
                }

                if (row.every(element => element === lastMarker)) {
                    return true;
                }
            }

            // check columns for complete lines
            let count = 0;
            for (let index = 0; index < winningLength; index++) {
                lastMarker = gameGrid[0][index];
                if (lastMarker === undefined) {
                    continue;
                }

                for (let j = 0; j < winningLength; j++) {
                    if (gameGrid[j][index] !== lastMarker) {
                        continue;
                    }
                    else {
                        count++;
                    }
                }
            }

            if (count === winningLength) {
                return true;
            }

            // check top left - bottom right diagonal
            lastMarker = gameGrid[0][0];
            count = 0;

            if (lastMarker !== undefined) {
                for (let index = 1; index < winningLength; index++) {
                    if (gameGrid[index][index] === lastMarker) {
                        count++;
                    }
                }
                
                if (count === winningLength) {
                    return true;
                }
            }

            // check top right - bottom left diagonal
            lastMarker = gameGrid[0][winningLength - 1];
            count = 0;

            if (lastMarker !== undefined) {
                for (let index = 1; index < winningLength; index++) {
                    for (let j = winningLength - 2; j >= 0; j--) {
                        if (gameGrid[index][j] === lastMarker) {
                            count++;
                        }
                    }
                }
            }

            if (count === winningLength) {
                return true;
            }


            return false;
        };

        /**
         * Places Marker on Game Board
         * @param {TicTacToeMarker} marker 
         * @param {Array} gameGrid 
         * @param {number} x 
         * @param {number} y 
         */
        const placeMarker  = (marker, x, y, board = gameGrid) => {
            gameboard.placeMarker(marker, board, x, y);
        };

        return {
            gameInit,
            isWinner,
            placeMarker,
        };
    }
)();

module.exports = {
    gameboard,
    createPlayer,
    ticTacToe,
};