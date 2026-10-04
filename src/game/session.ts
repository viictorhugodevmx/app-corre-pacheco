import {
  createGame,
  jumpGame,
  startGame,
  updateGame,
  type GameState,
} from './game';

export type Session = {
  game: GameState;
  paused: boolean;
};

export function createSession(): Session {
  return { game: createGame(), paused: false };
}

export function startSession(): Session {
  return { game: startGame(), paused: false };
}

export function pauseSession(session: Session): Session {
  if (session.game.status !== 'running' || session.paused) return session;
  return { ...session, paused: true };
}

export function resumeSession(session: Session): Session {
  if (!session.paused || session.game.status !== 'running') return session;
  return { ...session, paused: false };
}

export function jumpSession(session: Session): Session {
  if (session.paused) return session;
  return { ...session, game: jumpGame(session.game) };
}

export function updateSession(
  session: Session,
  deltaSeconds: number,
  random: () => number = Math.random,
): Session {
  if (session.paused) return session;

  return {
    ...session,
    game: updateGame(session.game, deltaSeconds, random),
  };
}
