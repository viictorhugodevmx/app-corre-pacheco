import { SCENE_HEIGHT, SCENE_WIDTH } from './drawScene';
import type { RunnerState } from './runner';

function box(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  color: string,
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
}

function drawBackground(
  ctx: CanvasRenderingContext2D,
  state: RunnerState,
  reducedMotion: boolean,
) {
  const sky = ctx.createLinearGradient(0, 0, 0, 330);
  sky.addColorStop(0, '#201633');
  sky.addColorStop(0.6, '#6a3f78');
  sky.addColorStop(1, '#dc887b');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);

  ctx.fillStyle = '#ffc991';
  ctx.beginPath();
  ctx.arc(745, 148, 63, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#fff2d5';
  for (let index = 0; index < 25; index += 1) {
    ctx.globalAlpha = 0.25 + (index % 3) * 0.15;
    ctx.fillRect((index * 137 + 41) % 960, (index * 43 + 19) % 125, 2, 2);
  }
  ctx.globalAlpha = 1;

  const cityOffset = reducedMotion ? 0 : (state.distance * 0.15) % 140;
  for (let index = -1; index < 9; index += 1) {
    const x = index * 140 - cityOffset;
    const height = 100 + ((index + 9) % 3) * 25;
    box(ctx, x, 330 - height, 85, height, 5, '#30214b');

    ctx.fillStyle = '#ffcd7b40';
    for (let row = 0; row < 3; row += 1) {
      ctx.fillRect(x + 18, 350 - height + row * 25, 8, 10);
      ctx.fillRect(x + 45, 350 - height + row * 25, 8, 10);
    }
  }

  const nearOffset = reducedMotion ? 0 : (state.distance * 0.35) % 240;
  ctx.fillStyle = '#20182f';
  for (let index = -1; index < 6; index += 1) {
    const x = index * 240 - nearOffset;
    ctx.beginPath();
    ctx.moveTo(x, 320);
    ctx.lineTo(x + 100, 265);
    ctx.lineTo(x + 240, 300);
    ctx.lineTo(x + 240, 330);
    ctx.lineTo(x, 330);
    ctx.closePath();
    ctx.fill();
  }

  ctx.fillStyle = '#171322';
  ctx.fillRect(0, 320, 960, 80);
  ctx.fillStyle = '#b9ef70';
  ctx.fillRect(0, 320, 960, 3);

  ctx.fillStyle = '#3c304d';
  for (let index = -1; index < 16; index += 1) {
    ctx.fillRect(index * 70 - (state.distance % 70), 357, 30, 3);
  }
}

function drawPlayer(ctx: CanvasRenderingContext2D, state: RunnerState) {
  ctx.fillStyle = '#00000040';
  ctx.beginPath();
  const shadowSize = Math.max(20, 45 + state.playerY * 0.15);
  ctx.ellipse(190, 327, shadowSize, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(190, 320 + state.playerY);

  const stride = state.grounded ? Math.sin(state.elapsed * 20) * 15 : 11;

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#8d74df';
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(-12, -39);
  ctx.lineTo(-12 - stride, -20);
  ctx.lineTo(-22 - stride, -6);
  ctx.moveTo(12, -39);
  ctx.lineTo(12 + stride, -20);
  ctx.lineTo(22 + stride, -6);
  ctx.stroke();

  box(ctx, -36 - stride, -10, 29, 12, 5, '#f9e8bf');
  box(ctx, 14 + stride, -10, 29, 12, 5, '#f9e8bf');
  box(ctx, -29, -89, 58, 56, 17, '#b9ef70');
  box(ctx, -10, -60, 20, 14, 5, '#729d43');

  ctx.strokeStyle = '#b9ef70';
  ctx.lineWidth = 13;
  ctx.beginPath();
  ctx.moveTo(-23, -77);
  ctx.lineTo(-40, -60 - stride * 0.3);
  ctx.lineTo(-31, -47 - stride * 0.3);
  ctx.moveTo(23, -77);
  ctx.lineTo(39, -86 + stride * 0.3);
  ctx.lineTo(51, -76 + stride * 0.3);
  ctx.stroke();

  ctx.fillStyle = '#eeb784';
  ctx.beginPath();
  ctx.arc(-31, -47 - stride * 0.3, 7, 0, Math.PI * 2);
  ctx.arc(51, -76 + stride * 0.3, 7, 0, Math.PI * 2);
  ctx.fill();

  box(ctx, -8, -103, 16, 20, 5, '#d99769');
  box(ctx, -29, -143, 58, 48, 18, '#efb885');
  box(ctx, -32, -157, 64, 29, 16, '#a185e8');
  box(ctx, -35, -139, 70, 13, 5, '#7654b7');
  box(ctx, -8, -139, 16, 13, 2, '#f8d17e');

  ctx.strokeStyle = '#4b2c38';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-19, -118);
  ctx.lineTo(-8, -116);
  ctx.moveTo(8, -116);
  ctx.lineTo(19, -118);
  ctx.stroke();

  ctx.fillStyle = '#4b2c38';
  ctx.beginPath();
  ctx.arc(-12, -113, 2.5, 0, Math.PI * 2);
  ctx.arc(12, -113, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#a85849';
  ctx.beginPath();
  ctx.arc(2, -110, 9, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.restore();
}

function drawMotita(
  ctx: CanvasRenderingContext2D,
  state: RunnerState,
  reducedMotion: boolean,
) {
  ctx.save();
  ctx.translate(
    410,
    150 + (reducedMotion ? 0 : Math.sin(state.elapsed * 3) * 8),
  );

  const glow = ctx.createRadialGradient(0, 0, 8, 0, 0, 75);
  glow.addColorStop(0, '#b9ef703b');
  glow.addColorStop(1, '#b9ef7000');
  ctx.fillStyle = glow;
  ctx.fillRect(-75, -75, 150, 150);

  ctx.fillStyle = '#b9ef70';
  for (const [x, y, radius] of [
    [-15, 9, 19],
    [15, 9, 19],
    [-22, -10, 18],
    [22, -10, 18],
    [-10, -26, 18],
    [10, -26, 18],
    [0, -40, 15],
    [0, 0, 23],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#263c2a';
  ctx.beginPath();
  ctx.ellipse(-9, -3, 3, 5, 0, 0, Math.PI * 2);
  ctx.ellipse(9, -3, 3, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#263c2a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(0, 6, 7, 0, Math.PI);
  ctx.stroke();
  ctx.restore();
}

export function drawRunnerScene(
  ctx: CanvasRenderingContext2D,
  state: RunnerState,
  reducedMotion: boolean,
) {
  ctx.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);
  drawBackground(ctx, state, reducedMotion);
  drawMotita(ctx, state, reducedMotion);
  drawPlayer(ctx, state);
}
