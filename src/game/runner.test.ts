import { describe, expect, it } from 'vitest';
import { createRunner, jumpRunner, RUN_SPEED, updateRunner } from './runner';

describe('runner physics', () => {
  it('permite saltar desde el suelo y subir', () => {
    const airborne = updateRunner(jumpRunner(createRunner()), 0.1);

    expect(airborne.grounded).toBe(false);
    expect(airborne.playerY).toBeLessThan(0);
    expect(airborne.velocityY).toBeLessThan(0);
  });

  it('impide un segundo salto mientras está en el aire', () => {
    const airborne = updateRunner(jumpRunner(createRunner()), 0.2);
    const repeatedJump = jumpRunner(airborne);

    expect(repeatedJump.playerY).toBe(airborne.playerY);
    expect(repeatedJump.velocityY).toBe(airborne.velocityY);
  });

  it('aterriza sin atravesar el suelo y permite volver a saltar', () => {
    let state = jumpRunner(createRunner());

    for (let frame = 0; frame < 120; frame += 1) {
      state = updateRunner(state, 1 / 60);
      expect(state.playerY).toBeLessThanOrEqual(0);
    }

    expect(state.grounded).toBe(true);
    expect(state.playerY).toBe(0);
    expect(state.velocityY).toBe(0);
    expect(jumpRunner(state).grounded).toBe(false);
  });

  it('recorre la misma distancia a 60 y 120 actualizaciones por segundo', () => {
    let at60 = createRunner();
    let at120 = createRunner();

    for (let frame = 0; frame < 60; frame += 1) {
      at60 = updateRunner(at60, 1 / 60);
    }

    for (let frame = 0; frame < 120; frame += 1) {
      at120 = updateRunner(at120, 1 / 120);
    }

    expect(at60.distance).toBeCloseTo(RUN_SPEED, 6);
    expect(at120.distance).toBeCloseTo(at60.distance, 6);
  });

  it('mantiene una trayectoria equivalente al cambiar la frecuencia', () => {
    let at60 = jumpRunner(createRunner());
    let at120 = jumpRunner(createRunner());

    for (let frame = 0; frame < 18; frame += 1) {
      at60 = updateRunner(at60, 1 / 60);
    }

    for (let frame = 0; frame < 36; frame += 1) {
      at120 = updateRunner(at120, 1 / 120);
    }

    expect(at60.playerY).toBeCloseTo(at120.playerY, 6);
    expect(at60.velocityY).toBeCloseTo(at120.velocityY, 6);
  });

  it('ignora tiempos negativos o inválidos', () => {
    const initial = createRunner();

    for (const delta of [0, -1, NaN, Infinity]) {
      expect(updateRunner(initial, delta)).toEqual(initial);
    }
  });
});
