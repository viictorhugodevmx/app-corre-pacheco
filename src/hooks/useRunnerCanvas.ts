import { useCallback, useEffect, useRef, useState } from 'react';
import { SCENE_HEIGHT, SCENE_WIDTH } from '../game/drawScene';
import { drawGameScene } from '../game/drawGameScene';
import {
  createGame,
  jumpGame,
  startGame,
  updateGame,
  type GameStatus,
} from '../game/game';

export function useRunnerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef(createGame());
  const [status, setStatus] = useState<GameStatus>('ready');

  const start = useCallback(() => {
    gameRef.current = startGame();
    setStatus('running');
  }, []);

  const jump = useCallback(() => {
    gameRef.current = jumpGame(gameRef.current);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frameId = 0;
    let previousTime: number | null = null;
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

      drawGameScene(ctx, gameRef.current, motionPreference.matches);
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

      if (document.hidden) {
        previousTime = null;
      } else {
        if (previousTime !== null) {
          const before = gameRef.current.status;
          const delta = Math.min((time - previousTime) / 1000, 0.05);
          gameRef.current = updateGame(gameRef.current, delta);

          if (gameRef.current.status !== before) {
            setStatus(gameRef.current.status);
          }
        }

        previousTime = time;
        draw();
      }

      frameId = window.requestAnimationFrame(frame);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.code !== 'Space' && event.code !== 'ArrowUp') return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.closest('input, textarea, select, button, a'))
      ) {
        return;
      }

      event.preventDefault();
      if (event.repeat) return;

      if (gameRef.current.status === 'running') {
        jump();
      }
    }

    function resetClock() {
      previousTime = null;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    window.addEventListener('resize', resize);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('visibilitychange', resetClock);

    resize();
    frameId = window.requestAnimationFrame(frame);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('visibilitychange', resetClock);
    };
  }, [jump]);

  return { canvasRef, status, start, jump };
}
