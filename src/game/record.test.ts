import { describe, expect, it } from 'vitest';
import { readRecord, RECORD_KEY, saveRecord } from './record';

describe('local record', () => {
  it('lee un récord válido', () => {
    expect(
      readRecord(() => ({
        getItem: () => '250',
        setItem: () => {},
      })),
    ).toBe(250);
  });

  it('descarta datos ausentes, negativos, decimales o corruptos', () => {
    for (const raw of [
      null,
      '',
      '-1',
      '2.5',
      'hola',
      'Infinity',
      '9007199254740992',
    ]) {
      expect(
        readRecord(() => ({
          getItem: () => raw,
          setItem: () => {},
        })),
      ).toBe(0);
    }
  });

  it('guarda un entero válido con nuestra clave', () => {
    let writtenKey = '';
    let writtenValue = '';

    expect(
      saveRecord(300, () => ({
        getItem: () => null,
        setItem: (key, value) => {
          writtenKey = key;
          writtenValue = value;
        },
      })),
    ).toBe(true);

    expect(writtenKey).toBe(RECORD_KEY);
    expect(writtenValue).toBe('300');
  });

  it('tolera almacenamiento bloqueado al acceder, leer o escribir', () => {
    const blocked = () => {
      throw new Error('Storage blocked');
    };

    expect(readRecord(blocked)).toBe(0);
    expect(saveRecord(10, blocked)).toBe(false);

    const unavailable = () => ({
      getItem: () => {
        throw new Error('Read blocked');
      },
      setItem: () => {
        throw new Error('Write blocked');
      },
    });

    expect(readRecord(unavailable)).toBe(0);
    expect(saveRecord(10, unavailable)).toBe(false);
  });

  it('rechaza récords inválidos antes de escribir', () => {
    for (const value of [-1, 1.5, NaN, Infinity]) {
      expect(saveRecord(value)).toBe(false);
    }
  });
});
