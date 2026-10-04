import { describe, expect, it } from 'vitest';
import {
  createSession,
  jumpSession,
  pauseSession,
  resumeSession,
  startSession,
  updateSession,
} from './session';

describe('pause and resume', () => {
  it('congela partida, distancia y salto durante la pausa', () => {
    const moving = updateSession(jumpSession(startSession()), 0.1);
    const paused = pauseSession(moving);

    expect(paused.paused).toBe(true);
    expect(updateSession(paused, 10)).toEqual(paused);
    expect(jumpSession(paused)).toEqual(paused);
  });

  it('reanuda desde la misma posición sin reiniciar', () => {
    const moving = updateSession(startSession(), 0.1);
    const resumed = resumeSession(pauseSession(moving));

    expect(resumed.paused).toBe(false);
    expect(resumed.game).toEqual(moving.game);
    expect(updateSession(resumed, 0.1).game.runner.distance).toBeGreaterThan(
      moving.game.runner.distance,
    );
  });

  it('no pausa inicio ni reanuda una partida terminada', () => {
    const ready = createSession();
    expect(pauseSession(ready)).toEqual(ready);

    const gameover = startSession();
    gameover.game.status = 'gameover';

    expect(pauseSession(gameover)).toEqual(gameover);
    expect(resumeSession(gameover)).toEqual(gameover);
  });

  it('una nueva partida limpia también la pausa', () => {
    const paused = pauseSession(updateSession(startSession(), 0.1));
    expect(paused.paused).toBe(true);

    const restarted = startSession();
    expect(restarted.paused).toBe(false);
    expect(restarted.game.runner.distance).toBe(0);
  });
});
