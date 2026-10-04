import { useCallback, useEffect, useRef, useState } from 'react';
import { SCENE_HEIGHT, SCENE_WIDTH } from '../game/drawScene';
import { drawGameScene } from '../game/drawGameScene';
import { getScore, getSpeed, LEAF_BONUS } from '../game/game';
import {
  burst,
  createEffects,
  drawEffects,
  rewardEffects,
  updateEffects,
} from '../game/effects';
import { readRecord, saveRecord } from '../game/record';
import {
  createSession,
  jumpSession,
  pauseSession,
  resumeSession,
  startSession,
  updateSession,
  type Session,
} from '../game/session';

function getHud(session: Session, record: number) {
  const game = session.game;

  return {
    status: game.status,
    paused: session.paused,
    score: getScore(game),
    leaves: game.collectedLeaves,
    speed: Math.round(getSpeed(game.runner.distance)),
    record,
  };
}

export function useRunnerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sessionRef = useRef(createSession());
  const effectsRef = useRef(createEffects());
  const resetClockRef = useRef(true);
  const [hud, setHud] = useState(() => getHud(createSession(), readRecord()));
  const recordRef = useRef(hud.record);

  const start = useCallback(() => {
    sessionRef.current = startSession();
    effectsRef.current = createEffects();
    resetClockRef.current = true;
    setHud(getHud(sessionRef.current, recordRef.current));
  }, []);

  const togglePause = useCallback(() => {
    const session = sessionRef.current;
    sessionRef.current = session.paused
      ? resumeSession(session)
      : pauseSession(session);

    resetClockRef.current = true;
    setHud(getHud(sessionRef.current, recordRef.current));
  }, []);

  const jump = useCallback(() => {
    const before = sessionRef.current;
    const next = jumpSession(before);
    sessionRef.current = next;

    if (before.game.runner.grounded && !next.game.runner.grounded) {
      effectsRef.current = burst(effectsRef.current, 190, 320, '#f8d17e');
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;
    let previousTime: number | null = null;
    let lastPublished = 0;
    let disposed = false;

    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    function draw() {
      if (!canvas || !ctx) return;

      ctx.setTransform(
        canvas.width / SCENE_WIDTH,
        0,
        0,
        canvas.height / SCENE_HEIGHT,
        0,
        0,
      );

      const game = sessionRef.current.game;
      drawGameScene(ctx, game, motionPreference.matches);
      drawEffects(ctx, effectsRef.current, game, motionPreference.matches);
    }

    function resize() {
      if (!canvas) return;

      const width = canvas.getBoundingClientRect().width;
      if (width <= 0) return;

      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(
        width * (SCENE_HEIGHT / SCENE_WIDTH) * pixelRatio,
      );
      draw();
    }

    function frame(time: number) {
      if (disposed) return;

      if (resetClockRef.current) {
        previousTime = null;
        resetClockRef.current = false;
      }

      if (document.hidden) {
        previousTime = null;
      } else {
        const before = sessionRef.current;
        const delta =
          previousTime === null
            ? 0
            : Math.min((time - previousTime) / 1000, 0.05);

        sessionRef.current = updateSession(before, delta);

        const session = sessionRef.current;
        const game = session.game;

        if (!session.paused) {
          effectsRef.current = updateEffects(effectsRef.current, delta);
        }

        const ended =
          before.game.status === 'running' && game.status === 'gameover';

        const landed =
          !before.game.runner.grounded &&
          game.runner.grounded &&
          game.status === 'running';

        if (landed) {
          effectsRef.current = burst(effectsRef.current, 190, 320, '#b7a9c4');
        }

        const collected = game.collectedLeaves - before.game.collectedLeaves;

        if (collected > 0) {
          effectsRef.current = rewardEffects(
            effectsRef.current,
            220,
            320 + game.runner.playerY - 100,
            collected * LEAF_BONUS,
          );
        }

        if (ended) {
          effectsRef.current = burst(
            effectsRef.current,
            190,
            320 + game.runner.playerY - 80,
            '#f58365',
          );

          const score = getScore(game);

          if (score > recordRef.current) {
            recordRef.current = score;
            saveRecord(score);
          }
        }

        if (
          ended ||
          (game.status === 'running' &&
            !session.paused &&
            time - lastPublished >= 100)
        ) {
          setHud(getHud(session, recordRef.current));
          lastPublished = time;
        }

        previousTime = time;
        draw();
      }

      frameId = window.requestAnimationFrame(frame);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target;
      const editable =
        target instanceof HTMLElement &&
        (target.isContentEditable || target.closest('input, textarea, select'));

      if (editable) return;

      if (event.code === 'KeyP' || event.code === 'Escape') {
        if (sessionRef.current.game.status === 'running') {
          event.preventDefault();
          if (!event.repeat) togglePause();
        }
        return;
      }

      if (event.code !== 'Space' && event.code !== 'ArrowUp') return;

      if (target instanceof HTMLElement && target.closest('button, a')) {
        return;
      }

      event.preventDefault();

      if (!event.repeat) jump();
    }

    function onVisibilityChange() {
      previousTime = null;
      resetClockRef.current = true;

      if (document.hidden) {
        sessionRef.current = pauseSession(sessionRef.current);
        setHud(getHud(sessionRef.current, recordRef.current));
      }
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('resize', resize);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', onVisibilityChange);

    resize();
    frameId = window.requestAnimationFrame(frame);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [jump, togglePause]);

  return { canvasRef, hud, start, jump, togglePause };
}
