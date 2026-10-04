import {
  createRunner,
  jumpRunner,
  updateRunner,
  type RunnerState,
} from './runner';

export type GameStatus = 'ready' | 'running' | 'gameover';
export type ObstacleKind = 'cigarette' | 'ashtray';

export type Obstacle = {
  id: number;
  worldX: number;
  kind: ObstacleKind;
};

export type GameState = {
  status: GameStatus;
  runner: RunnerState;
  obstacles: Obstacle[];
  nextSpawnX: number;
  nextId: number;
};

export type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const MIN_OBSTACLE_GAP = 460;
export const MAX_OBSTACLE_GAP = 680;

export function createGame(): GameState {
  return {
    status: 'ready',
    runner: createRunner(),
    obstacles: [{ id: 1, worldX: 1060, kind: 'cigarette' }],
    nextSpawnX: 1060 + MIN_OBSTACLE_GAP,
    nextId: 2,
  };
}

export function startGame(): GameState {
  return { ...createGame(), status: 'running' };
}

export function jumpGame(game: GameState): GameState {
  if (game.status !== 'running') return game;
  return { ...game, runner: jumpRunner(game.runner) };
}

export function rectanglesOverlap(a: Rectangle, b: Rectangle): boolean {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

export function playerBounds(runner: RunnerState): Rectangle {
  return {
    x: 168,
    y: 320 + runner.playerY - 130,
    width: 44,
    height: 128,
  };
}

export function obstacleBounds(
  obstacle: Obstacle,
  distance: number,
): Rectangle {
  const cigarette = obstacle.kind === 'cigarette';

  return {
    x: obstacle.worldX - distance,
    y: cigarette ? 270 : 298,
    width: cigarette ? 22 : 64,
    height: cigarette ? 50 : 22,
  };
}

export function updateGame(
  game: GameState,
  deltaSeconds: number,
  random: () => number = Math.random,
): GameState {
  if (
    game.status !== 'running' ||
    !Number.isFinite(deltaSeconds) ||
    deltaSeconds <= 0
  ) {
    return game;
  }

  const runner = updateRunner(game.runner, deltaSeconds);
  const obstacles = game.obstacles.filter(
    (obstacle) => obstacle.worldX - runner.distance > -100,
  );

  let nextSpawnX = game.nextSpawnX;
  let nextId = game.nextId;

  while (nextSpawnX - runner.distance < 1060) {
    const raw = random();
    const value = Number.isFinite(raw) ? Math.max(0, Math.min(1, raw)) : 0.5;

    obstacles.push({
      id: nextId,
      worldX: nextSpawnX,
      kind: value < 0.5 ? 'cigarette' : 'ashtray',
    });

    nextId += 1;
    nextSpawnX +=
      MIN_OBSTACLE_GAP + value * (MAX_OBSTACLE_GAP - MIN_OBSTACLE_GAP);
  }

  const collision = obstacles.some((obstacle) =>
    rectanglesOverlap(
      playerBounds(runner),
      obstacleBounds(obstacle, runner.distance),
    ),
  );

  return {
    status: collision ? 'gameover' : 'running',
    runner,
    obstacles,
    nextSpawnX,
    nextId,
  };
}
