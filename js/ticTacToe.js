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

            return gameGrid[x][y] === undefined; 
        };

        /**
         * Places Marker on Game Board
         * @param {TicTacToeMarker} marker 
         * @param {TicTacToeMarker[][]} gameGrid 
         * @param {number} x 
         * @param {number} y 
         */
        const placeMarker = (marker, gameGrid, x, y) => {
            if (!isPositionValid(gameGrid, x, y)) {
                throw new Error("Invalid x and y Co-Ordinates");
            }

            if (isPositionAvailable(gameGrid, x, y)) {
                gameGrid[x][y] = marker;
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

/**
 * Tic Tac Toe Game Controller
 * Need ONE game controller is IIFE
 */
const ticTacToe = (
    () => {
        /**
         * Needs methods like
         * Is marker already in use  Game controller
         * Assign markers   Game controller
         * Is marker valid  Game controller
         * Decide who starts    Game controller
         * Tracks current turn  Game controller
         * Alternate turns   Game controller
         * Determine winner or stalemate    Game controller
         */

        /**
         * @type {TicTacToeMarker[][]}
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
         * @param {TicTacToeMarker[][]} board
         * @returns {boolean}
         */
        const isWinner = (board = gameGrid) => {
            const winningLength = board.length;

            /**
             * @type {TicTacToeMarker}
             */
            let lastMarker = undefined;
            let count = 0;

            // check rows for complete lines
            for (const row of board) {
                lastMarker = row[0];
                if (lastMarker === undefined) {
                    continue;
                }

                if (row.every(element => element === lastMarker)) {
                    return true;
                }
            }

            // check columns for complete lines
            for (let col = 0; col < winningLength; col++) {
                lastMarker = board[0][col];

                if (lastMarker === undefined) {
                    continue;
                }
                for (let row = 0; row < winningLength; row++) {
                    if (board[row][col] !== lastMarker) {
                        continue;
                    }
                    else {
                        count++;
                    }
                }

                if (count === winningLength) {
                    return true;
                }
                count = 0;
            }

            // check top left - bottom right diagonal
            count = 0;
            lastMarker = board[0][0];

            if (lastMarker !== undefined) {
                for (let index = 0; index < winningLength; index++) {
                    if (board[index][index] === lastMarker) {
                        count++;
                    }
                }
                
                if (count === winningLength) {
                    return true;
                }

                count = 0;
            }

            // check top right - bottom left diagonal
            count = 0;
            lastMarker = board[0][winningLength - 1];

            if (lastMarker !== undefined) {
                for (let index = 0; index < winningLength; index++) {
                    if (board[index][winningLength - 1 - index] === lastMarker) {
                        count++;
                    }
                }

                if (count === winningLength) {
                    return true;
                }

                count = 0;
            }

            return false;
        };

        
        /**
         * Is Game a Stalemate
         * Checks boards without undefined values (completed)
         * For non winning setups
         * 
         * @param {TicTacToeMarker[][]} board
         * @returns {boolean}
         */
        const isStalemate = (board = gameGrid) => {
            for (const row of board) {
                if (row.some(element => element === undefined)) {
                    return false;
                }
            }
            
            return !isWinner(board);
        };

        /**
         * Places Marker on Game Board
         * @param {TicTacToeMarker} marker
         * @param {number} x 
         * @param {number} y 
         */
        const placeMarker  = (marker, x, y) => {
            gameboard.placeMarker(marker, gameGrid, x, y);
        };

        return {
            gameInit,
            isWinner,
            isStalemate,
            placeMarker,
        };
    }
)();

module.exports = {
    gameboard,
    createPlayer,
    ticTacToe,
};