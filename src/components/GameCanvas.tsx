import { useEffect, useRef } from 'react';
import { drawScene, SCENE_HEIGHT, SCENE_WIDTH } from '../game/drawScene';

export function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function render() {
      if (!canvas || !ctx) return;

      const width = canvas.getBoundingClientRect().width;
      if (width <= 0) return;

      const height = width * (SCENE_HEIGHT / SCENE_WIDTH);
      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      ctx.setTransform(
        canvas.width / SCENE_WIDTH,
        0,
        0,
        canvas.height / SCENE_HEIGHT,
        0,
        0,
      );

      drawScene(ctx);
    }

    const observer = new ResizeObserver(render);
    observer.observe(canvas);
    window.addEventListener('resize', render);
    render();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', render);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="game-canvas"
      width={SCENE_WIDTH}
      height={SCENE_HEIGHT}
      role="img"
      aria-label="Pacheco con sudadera verde persigue una motita sonriente en una ciudad al atardecer. Más adelante hay un cigarro y un cenicero."
    >
      Escenario ilustrado de Corre, Pacheco.
    </canvas>
  );
}
