export const SCENE_WIDTH = 960;
export const SCENE_HEIGHT = 400;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: string,
) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
}

function drawCity(ctx: CanvasRenderingContext2D) {
  const buildings = [
    [0, 190, 85, 140],
    [100, 215, 60, 115],
    [180, 170, 100, 160],
    [310, 205, 75, 125],
    [410, 150, 90, 180],
    [530, 195, 110, 135],
    [675, 175, 70, 155],
    [780, 205, 100, 125],
    [900, 160, 60, 170],
  ];

  for (const [x, y, width, height] of buildings) {
    roundedRect(ctx, x, y, width, height, 5, '#30214b');

    ctx.fillStyle = '#ffcd7b';
    ctx.globalAlpha = 0.25;

    for (let row = 0; row < 3; row += 1) {
      for (let column = 0; column < 2; column += 1) {
        ctx.fillRect(x + 18 + column * 25, y + 24 + row * 28, 8, 11);
      }
    }

    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = '#20182f';
  ctx.beginPath();
  ctx.moveTo(0, 290);
  ctx.lineTo(120, 265);
  ctx.lineTo(240, 290);
  ctx.lineTo(350, 250);
  ctx.lineTo(460, 282);
  ctx.lineTo(590, 260);
  ctx.lineTo(720, 285);
  ctx.lineTo(850, 252);
  ctx.lineTo(960, 280);
  ctx.lineTo(960, 340);
  ctx.lineTo(0, 340);
  ctx.closePath();
  ctx.fill();
}

function drawPacheco(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(190, 320);

  ctx.fillStyle = '#00000040';
  ctx.beginPath();
  ctx.ellipse(0, 6, 48, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  // Piernas y tenis.
  ctx.strokeStyle = '#8d74df';
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.moveTo(-12, -39);
  ctx.lineTo(-22, -18);
  ctx.lineTo(-35, -6);
  ctx.moveTo(12, -39);
  ctx.lineTo(28, -25);
  ctx.lineTo(24, -5);
  ctx.stroke();

  roundedRect(ctx, -49, -10, 30, 12, 5, '#f9e8bf');
  roundedRect(ctx, 17, -9, 31, 12, 5, '#f9e8bf');

  // Sudadera.
  roundedRect(ctx, -29, -89, 58, 56, 17, '#b9ef70');

  ctx.fillStyle = '#729d43';
  ctx.beginPath();
  ctx.moveTo(-4, -62);
  ctx.lineTo(6, -62);
  ctx.lineTo(12, -47);
  ctx.lineTo(-10, -47);
  ctx.closePath();
  ctx.fill();

  // Brazos.
  ctx.strokeStyle = '#b9ef70';
  ctx.lineWidth = 13;
  ctx.beginPath();
  ctx.moveTo(-23, -77);
  ctx.lineTo(-41, -60);
  ctx.lineTo(-31, -47);
  ctx.moveTo(23, -77);
  ctx.lineTo(39, -86);
  ctx.lineTo(51, -76);
  ctx.stroke();

  ctx.fillStyle = '#eeb784';
  for (const [x, y] of [
    [-30, -45],
    [52, -75],
  ]) {
    ctx.beginPath();
    ctx.arc(x, y, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Cuello, cara y orejas.
  roundedRect(ctx, -8, -103, 16, 20, 5, '#d99769');
  roundedRect(ctx, -29, -143, 58, 48, 18, '#efb885');

  ctx.fillStyle = '#efb885';
  ctx.beginPath();
  ctx.arc(-29, -118, 7, 0, Math.PI * 2);
  ctx.arc(29, -118, 7, 0, Math.PI * 2);
  ctx.fill();

  // Gorro.
  roundedRect(ctx, -32, -157, 64, 29, 16, '#a185e8');
  roundedRect(ctx, -35, -139, 70, 13, 5, '#7654b7');
  roundedRect(ctx, -8, -139, 16, 13, 2, '#f8d17e');

  // Expresión.
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
  ctx.arc(-12, -114, 2.5, 0, Math.PI * 2);
  ctx.arc(12, -114, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#a85849';
  ctx.beginPath();
  ctx.arc(2, -110, 9, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.restore();
}

function drawMotita(ctx: CanvasRenderingContext2D) {
  ctx.save();
  ctx.translate(410, 160);

  const glow = ctx.createRadialGradient(0, 0, 8, 0, 0, 75);
  glow.addColorStop(0, '#b9ef703b');
  glow.addColorStop(1, '#b9ef7000');
  ctx.fillStyle = glow;
  ctx.fillRect(-75, -75, 150, 150);

  const lobes = [
    [-15, 9, 19],
    [15, 9, 19],
    [-22, -10, 18],
    [22, -10, 18],
    [-10, -26, 18],
    [10, -26, 18],
    [0, -40, 15],
    [0, 0, 23],
  ];

  ctx.fillStyle = '#b9ef70';
  for (const [x, y, radius] of lobes) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = '#7ab148';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(-15, -25);
  ctx.lineTo(-8, -15);
  ctx.moveTo(15, -30);
  ctx.lineTo(8, -20);
  ctx.stroke();

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

function drawObstacles(ctx: CanvasRenderingContext2D) {
  // Cigarro.
  ctx.save();
  ctx.translate(615, 320);
  ctx.rotate(-0.15);
  roundedRect(ctx, -10, -50, 20, 50, 3, '#f1e6d4');
  roundedRect(ctx, -10, -16, 20, 16, 2, '#d8a36b');
  roundedRect(ctx, -10, -53, 20, 7, 2, '#f58365');
  ctx.restore();

  // Cenicero.
  ctx.fillStyle = '#7c6c93';
  ctx.beginPath();
  ctx.ellipse(805, 314, 33, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#45374f';
  ctx.beginPath();
  ctx.ellipse(805, 310, 24, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  roundedRect(ctx, 794, 303, 17, 4, 1, '#e8c293');
}

export function drawScene(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, SCENE_WIDTH, SCENE_HEIGHT);

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
    const x = (index * 137 + 41) % SCENE_WIDTH;
    const y = (index * 43 + 19) % 125;
    ctx.globalAlpha = 0.25 + (index % 3) * 0.15;
    ctx.fillRect(x, y, 2, 2);
  }
  ctx.globalAlpha = 1;

  drawCity(ctx);

  ctx.fillStyle = '#171322';
  ctx.fillRect(0, 320, SCENE_WIDTH, 80);
  ctx.fillStyle = '#b9ef70';
  ctx.fillRect(0, 320, SCENE_WIDTH, 3);

  ctx.fillStyle = '#3c304d';
  for (let index = 0; index < 16; index += 1) {
    ctx.fillRect(index * 70 + 15, 357, 30, 3);
  }

  drawPacheco(ctx);
  drawMotita(ctx);
  drawObstacles(ctx);

  ctx.fillStyle = '#f7eaff';
  ctx.font = '700 11px system-ui, sans-serif';
  ctx.fillText('PACHECO', 159, 382);
  ctx.fillStyle = '#b9ef70';
  ctx.fillText('LA MOTITA', 378, 222);
}
