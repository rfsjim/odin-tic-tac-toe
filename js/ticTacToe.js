/**
 * @fileoverview Tic Tac Toe App
 * @author James
 * @version 0.0.1
 * @since 2026-11-22
 * @updated 2026-11-24
 */

/**
 * Mental Modelling 
 * Real World Activity  Proposed Owner
 * Draw the grid    Gameboard
 * Assign markers   Players
 * Is marker valid  Players
 * Is marker already in use  Game controller
 * Decide who starts    Game controller
 * Tracks current turn  Game controller
 * Knows current turn   Players
 * Alternate turns   Game controller
 * Check position availability  Gameboard
 * Place marker Gameboard
 * Determine winner or stalemate    Game controller
 * Increment score  Player from instruction by game controller
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
        const createGrid = (dimension) => {
            if (
                typeof dimension !== "number" ||
                !Number.isInteger(dimension) ||
                !Number.isFinite(dimension) ||
                dimension <= 0
            ) {
                throw new Error("Invalid Dimensions");
            }
            
            return Array.from({ length: dimension }, ()  =>
                Array.from({ length: dimension })
            );
        };

        return { createGrid };
    }
)();

/**
 * @typedef {'X' | 'O'} TicTacToeMarker
 */

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

function TicTacToe() {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    // Needs methods like
    // isWinner, isStalemate, canWin, isPositionOccupied, 
}