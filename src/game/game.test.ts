import { describe, expect, it } from 'vitest';
import {
  createGame,
  jumpGame,
  MAX_OBSTACLE_GAP,
  MIN_OBSTACLE_GAP,
  rectanglesOverlap,
  startGame,
  updateGame,
} from './game';

describe('game rules', () => {
  it('mantiene inmóvil la pantalla de inicio', () => {
    const ready = createGame();

    expect(updateGame(ready, 1)).toEqual(ready);
    expect(jumpGame(ready)).toEqual(ready);
  });

  it('distingue solapamiento de contacto exacto entre bordes', () => {
    const a = { x: 0, y: 0, width: 10, height: 10 };

    expect(rectanglesOverlap(a, { x: 9, y: 2, width: 10, height: 10 })).toBe(
      true,
    );

    expect(rectanglesOverlap(a, { x: 10, y: 0, width: 10, height: 10 })).toBe(
      false,
    );

    expect(rectanglesOverlap(a, { x: 2, y: 11, width: 10, height: 10 })).toBe(
      false,
    );
  });

  it('termina la partida al chocar con un cigarro', () => {
    const game = startGame();
    game.obstacles = [{ id: 1, worldX: 185, kind: 'cigarette' }];

    const result = updateGame(game, 0.01, () => 0);

    expect(result.status).toBe('gameover');
    expect(updateGame(result, 1)).toEqual(result);
    expect(jumpGame(result)).toEqual(result);
  });

  it('permite pasar por encima de un cigarro', () => {
    const game = startGame();
    game.runner = {
      ...game.runner,
      playerY: -100,
      velocityY: 0,
      grounded: false,
    };
    game.obstacles = [{ id: 1, worldX: 185, kind: 'cigarette' }];

    expect(updateGame(game, 0.01, () => 0).status).toBe('running');
  });

  it('termina la partida al chocar con un cenicero', () => {
    const game = startGame();
    game.obstacles = [{ id: 1, worldX: 185, kind: 'ashtray' }];

    expect(updateGame(game, 0.01, () => 1).status).toBe('gameover');
  });

  it('genera ambos tipos con separación dentro de los límites', () => {
    for (const value of [0, 1]) {
      const game = startGame();
      const spawnPosition = game.nextSpawnX;

      // Adelantamos el mundo y quitamos el primer obstáculo para
      // comprobar exclusivamente la regla de generación.
      game.runner.distance = 600;
      game.obstacles = [];

      const result = updateGame(game, 0.01, () => value);
      const generated = result.obstacles[0];

      expect(generated.worldX).toBe(spawnPosition);
      expect(generated.kind).toBe(value === 0 ? 'cigarette' : 'ashtray');

      const gap = result.nextSpawnX - generated.worldX;
      expect(gap).toBeGreaterThanOrEqual(MIN_OBSTACLE_GAP);
      expect(gap).toBeLessThanOrEqual(MAX_OBSTACLE_GAP);
    }
  });

  it('inicia una partida limpia tras una derrota', () => {
    const game = startGame();
    game.obstacles = [{ id: 1, worldX: 185, kind: 'cigarette' }];
    const defeated = updateGame(game, 0.01);

    expect(defeated.status).toBe('gameover');

    const restarted = startGame();

    expect(restarted.status).toBe('running');
    expect(restarted.runner.distance).toBe(0);
    expect(restarted.runner.playerY).toBe(0);
    expect(restarted.runner.grounded).toBe(true);
    expect(restarted.obstacles[0].worldX).toBe(1060);
  });
});
