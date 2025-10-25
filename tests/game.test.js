import { expect, test, describe } from 'vitest';

// Mock the DOM environment
global.document = {
    getElementById: () => ({
        getContext: () => ({
            fillStyle: '',
            fillRect: () => {},
            strokeStyle: '',
            setLineDash: () => {},
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            stroke: () => {},
            arc: () => {},
            fill: () => {}
        }),
        width: 800,
        height: 400
    }),
    addEventListener: () => {}
};

global.window = {
    requestAnimationFrame: () => {},
    onload: () => {}
};

// Import game logic (we'll need to modify game.js to export the class)
import { TennisGame } from '../public/game.js';

describe('TennisGame', () => {
    test('initializes with correct default values', () => {
        const game = new TennisGame();
        expect(game.ball.x).toBe(400); // canvas.width / 2
        expect(game.ball.y).toBe(200); // canvas.height / 2
        expect(game.player.score).toBe(0);
        expect(game.ai.score).toBe(0);
    });

    test('paddle movement stays within canvas bounds', () => {
        const game = new TennisGame();
        
        // Try moving paddle above canvas
        game.player.y = 0;
        game.keys.up = true;
        game.update();
        expect(game.player.y).toBe(0);

        // Try moving paddle below canvas
        game.player.y = game.canvas.height;
        game.keys.down = true;
        game.update();
        expect(game.player.y).toBeLessThanOrEqual(game.canvas.height - game.paddleHeight);
    });

    test('ball bounces off paddles', () => {
        const game = new TennisGame();
        
        // Test player paddle collision
        game.ball.x = game.paddleWidth + 1;
        game.ball.y = game.player.y + game.paddleHeight / 2;
        game.ball.dx = -5; // Moving towards player paddle
        const originalDx = game.ball.dx;
        
        game.update();
        expect(game.ball.dx).toBe(-originalDx); // Should reverse direction
    });

    test('scoring works correctly', () => {
        const game = new TennisGame();
        const originalPlayerScore = game.player.score;
        const originalAiScore = game.ai.score;

        // Ball goes past AI paddle
        game.ball.x = game.canvas.width + 1;
        game.update();
        expect(game.player.score).toBe(originalPlayerScore + 1);

        // Ball goes past player paddle
        game.ball.x = -1;
        game.update();
        expect(game.ai.score).toBe(originalAiScore + 1);
    });
});