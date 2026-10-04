import { describe, expect, it } from 'vitest';
import { burst, createEffects, rewardEffects, updateEffects } from './effects';

describe('visual effects lifecycle', () => {
  it('elimina partículas y bonus al terminar su tiempo de vida', () => {
    const effects = rewardEffects(createEffects(), 190, 150, 50);

    expect(effects.particles.length).toBeGreaterThan(0);
    expect(effects.bonus?.value).toBe(50);

    const expired = updateEffects(effects, 1);

    expect(expired.particles).toHaveLength(0);
    expect(expired.bonus).toBeNull();
  });

  it('limita partículas acumuladas', () => {
    let effects = createEffects();

    for (let index = 0; index < 20; index += 1) {
      effects = burst(effects, 190, 320, '#b9ef70');
    }

    expect(effects.particles.length).toBeLessThanOrEqual(64);
  });
});
