import type { GameState } from './game';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

type Bonus = {
  x: number;
  y: number;
  value: number;
  life: number;
};

export type Effects = {
  particles: Particle[];
  bonus: Bonus | null;
};

export function createEffects(): Effects {
  return { particles: [], bonus: null };
}

export function burst(
  effects: Effects,
  x: number,
  y: number,
  color: string,
): Effects {
  const particles = Array.from({ length: 8 }, (_, index) => {
    const angle = (index / 8) * Math.PI * 2;

    return {
      x,
      y,
      vx: Math.cos(angle) * 65,
      vy: Math.sin(angle) * 60 - 60,
      life: 0.55,
      color,
    };
  });

  return {
    ...effects,
    particles: [...effects.particles, ...particles].slice(-64),
  };
}

export function rewardEffects(
  effects: Effects,
  x: number,
  y: number,
  value: number,
): Effects {
  return {
    ...burst(effects, x, y, '#b9ef70'),
    bonus: { x, y, value, life: 0.8 },
  };
}

export function updateEffects(effects: Effects, delta: number): Effects {
  if (!Number.isFinite(delta) || delta <= 0) return effects;

  const particles = effects.particles
    .map((particle) => ({
      ...particle,
      x: particle.x + particle.vx * delta,
      y: particle.y + particle.vy * delta,
      vy: particle.vy + 180 * delta,
      life: particle.life - delta,
    }))
    .filter((particle) => particle.life > 0);

  const bonus = effects.bonus
    ? {
        ...effects.bonus,
        y: effects.bonus.y - 35 * delta,
        life: effects.bonus.life - delta,
      }
    : null;

  return {
    particles,
    bonus: bonus && bonus.life > 0 ? bonus : null,
  };
}

export function drawEffects(
  ctx: CanvasRenderingContext2D,
  effects: Effects,
  game: GameState,
  reducedMotion: boolean,
) {
  ctx.save();

  if (!reducedMotion) {
    for (const particle of effects.particles) {
      ctx.globalAlpha = Math.max(0, particle.life / 0.55);
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;

  if (effects.bonus) {
    ctx.fillStyle = '#b9ef70';
    ctx.strokeStyle = '#201629';
    ctx.lineWidth = 4;
    ctx.font = '900 23px system-ui, sans-serif';

    const y = reducedMotion ? 120 : effects.bonus.y;
    const text = `+${effects.bonus.value}`;

    ctx.strokeText(text, effects.bonus.x, y);
    ctx.fillText(text, effects.bonus.x, y);
  }

  // Reacción del personaje: ojos en cruz al terminar.
  if (game.status === 'gameover') {
    ctx.translate(190, 320 + game.runner.playerY);
    ctx.strokeStyle = '#4b2c38';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';

    for (const x of [-12, 12]) {
      ctx.beginPath();
      ctx.moveTo(x - 4, -118);
      ctx.lineTo(x + 4, -110);
      ctx.moveTo(x + 4, -118);
      ctx.lineTo(x - 4, -110);
      ctx.stroke();
    }
  }

  ctx.restore();
}
