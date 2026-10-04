import { describe, expect, it } from 'vitest';
import { GRAVITY, JUMP_VELOCITY, RUN_SPEED } from './runner';
import {
  getScore,
  getSpeed,
  LEAF_BONUS,
  MAX_SPEED,
  MIN_OBSTACLE_GAP,
  startGame,
  updateGame,
} from './game';

describe('progression and collectibles', () => {
  it('aumenta la velocidad y respeta el máximo', () => {
    expect(getSpeed(0)).toBe(RUN_SPEED);
    expect(getSpeed(1000)).toBeGreaterThan(RUN_SPEED);
    expect(getSpeed(3000)).toBe(MAX_SPEED);
    expect(getSpeed(100000)).toBe(MAX_SPEED);
  });

  it('deja separación suficiente para aterrizar a velocidad máxima', () => {
    const flightDuration = (-2 * JUMP_VELOCITY) / GRAVITY;
    const travelDuringJump = flightDuration * MAX_SPEED;

    // Incluye ancho del jugador y del obstáculo más ancho.
    expect(MIN_OBSTACLE_GAP).toBeGreaterThan(travelDuringJump + 44 + 64);
  });

  it('recoge una hojita una sola vez', () => {
    const game = startGame();
    game.obstacles = [];
    game.leaves = [{ id: 1, worldX: 190, y: 150 }];
    game.runner = {
      ...game.runner,
      playerY: -70,
      velocityY: 0,
      grounded: false,
    };

    const collected = updateGame(game, 0.01);
    const next = updateGame(collected, 0.01);

    expect(collected.collectedLeaves).toBe(1);
    expect(collected.leaves).toHaveLength(0);
    expect(next.collectedLeaves).toBe(1);
    expect(getScore(collected)).toBe(LEAF_BONUS);
  });

  it('no recoge una hojita elevada caminando por el suelo', () => {
    const game = startGame();
    game.obstacles = [];
    game.leaves = [{ id: 1, worldX: 190, y: 150 }];

    expect(updateGame(game, 0.01).collectedLeaves).toBe(0);
  });

  it('suma distancia y bonus y limpia ambos al reiniciar', () => {
    const game = startGame();
    game.runner.distance = 123;
    game.collectedLeaves = 2;

    expect(getScore(game)).toBe(12 + 2 * LEAF_BONUS);
    expect(getScore(startGame())).toBe(0);
    expect(startGame().collectedLeaves).toBe(0);
  });
});
