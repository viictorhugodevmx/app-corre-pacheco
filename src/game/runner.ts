export const RUN_SPEED = 240;
export const GRAVITY = 1800;
export const JUMP_VELOCITY = -660;

export type RunnerState = {
  distance: number;
  elapsed: number;
  playerY: number;
  velocityY: number;
  grounded: boolean;
};

export function createRunner(): RunnerState {
  return {
    distance: 0,
    elapsed: 0,
    playerY: 0,
    velocityY: 0,
    grounded: true,
  };
}

export function jumpRunner(state: RunnerState): RunnerState {
  if (!state.grounded) return state;

  return {
    ...state,
    grounded: false,
    velocityY: JUMP_VELOCITY,
  };
}

export function updateRunner(
  state: RunnerState,
  deltaSeconds: number,
  speed = RUN_SPEED,
): RunnerState {
  if (!Number.isFinite(deltaSeconds) || deltaSeconds <= 0) return state;

  const next = {
    ...state,
    elapsed: state.elapsed + deltaSeconds,
    distance: state.distance + speed * deltaSeconds,
  };

  if (state.grounded) return next;

  next.playerY =
    state.playerY +
    state.velocityY * deltaSeconds +
    0.5 * GRAVITY * deltaSeconds ** 2;

  next.velocityY = state.velocityY + GRAVITY * deltaSeconds;

  if (next.playerY >= 0) {
    next.playerY = 0;
    next.velocityY = 0;
    next.grounded = true;
  }

  return next;
}
