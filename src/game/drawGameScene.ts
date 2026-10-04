import { drawRunnerScene } from './drawRunnerScene';
import { obstacleBounds, type GameState } from './game';

export function drawGameScene(
  ctx: CanvasRenderingContext2D,
  game: GameState,
  reducedMotion: boolean,
) {
  drawRunnerScene(ctx, game.runner, reducedMotion);

  for (const obstacle of game.obstacles) {
    const bounds = obstacleBounds(obstacle, game.runner.distance);
    if (bounds.x > 980 || bounds.x + bounds.width < 0) continue;

    ctx.save();

    if (obstacle.kind === 'cigarette') {
      ctx.fillStyle = '#f1e6d4';
      ctx.beginPath();
      ctx.roundRect(bounds.x, bounds.y, 22, 50, 3);
      ctx.fill();

      ctx.fillStyle = '#d8a36b';
      ctx.fillRect(bounds.x, bounds.y + 34, 22, 16);
      ctx.fillStyle = '#f58365';
      ctx.fillRect(bounds.x, bounds.y, 22, 6);

      ctx.strokeStyle = '#fff2d530';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bounds.x + 11, bounds.y - 5);
      ctx.quadraticCurveTo(
        bounds.x + 25,
        bounds.y - 18,
        bounds.x + 10,
        bounds.y - 30,
      );
      ctx.stroke();
    } else {
      ctx.fillStyle = '#7c6c93';
      ctx.beginPath();
      ctx.ellipse(bounds.x + 32, 309, 32, 11, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#45374f';
      ctx.beginPath();
      ctx.ellipse(bounds.x + 32, 305, 24, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e8c293';
      ctx.fillRect(bounds.x + 22, 301, 18, 4);
    }

    ctx.restore();
  }
}
