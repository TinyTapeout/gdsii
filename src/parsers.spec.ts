import { describe, expect, test } from 'vitest';
import { RecordType } from './RecordType';
import { parseReal8, parsers } from './parsers';

describe('parsers', () => {
  test('BGNLIB', () => {
    const input = new Uint8Array([
      // Last Modification Time: 2024, March 2nd, 20:35:10
      0, 124, 0, 3, 0, 2, 0, 20, 0, 35, 0, 10,
      // Last Access Time: 2024, August 14th, 21:10:35
      0, 124, 0, 8, 0, 14, 0, 21, 0, 10, 0, 35,
    ]);

    expect(parsers[RecordType.BGNLIB](new DataView(input.buffer), 0, input.length)).toEqual({
      modTime: new Date('2024-03-02T20:35:10Z'),
      accessTime: new Date('2024-08-14T21:10:35Z'),
    });
  });

  test('parseReal8', () => {
    const be64 = (v: number) => {
      const result = new DataView(new Uint32Array(2).buffer);
      result.setUint32(0, v, false);
      return result;
    };

    expect(parseReal8(be64(0b01000001_00010000_00000000_00000000), 0)).toBeCloseTo(1);
    expect(parseReal8(be64(0b01000001_00100000_00000000_00000000), 0)).toBeCloseTo(2);
    expect(parseReal8(be64(0b01000001_00110000_00000000_00000000), 0)).toBeCloseTo(3);
    expect(parseReal8(be64(0b11000001_00010000_00000000_00000000), 0)).toBeCloseTo(-1);
    expect(parseReal8(be64(0b11000001_00100000_00000000_00000000), 0)).toBeCloseTo(-2);
    expect(parseReal8(be64(0b11000001_00110000_00000000_00000000), 0)).toBeCloseTo(-3);
    expect(parseReal8(be64(0b01000000_10000000_00000000_00000000), 0)).toBeCloseTo(0.5);
    expect(parseReal8(be64(0b1000000_10011001_10011001_10011001), 0)).toBeCloseTo(0.6);
    expect(parseReal8(be64(0b01000000_10110011_00110011_00110011), 0)).toBeCloseTo(0.7);
    expect(parseReal8(be64(0b01000001_00011000_00000000_00000000), 0)).toBeCloseTo(1.5);
    expect(parseReal8(be64(0b01000001_00011001_10011001_10011001), 0)).toBeCloseTo(1.6);
    expect(parseReal8(be64(0b01000001_00011011_00110011_00110011), 0)).toBeCloseTo(1.7);
    expect(parseReal8(be64(0b00000000_00000000_00000000_00000000), 0)).toBeCloseTo(0);
    expect(parseReal8(be64(0b01000001_00010000_00000000_00000000), 0)).toBeCloseTo(1);
    expect(parseReal8(be64(0b01000001_10100000_00000000_00000000), 0)).toBeCloseTo(10);
    expect(parseReal8(be64(0b01000010_01100100_00000000_00000000), 0)).toBeCloseTo(100);
    expect(parseReal8(be64(0b01000011_00111110_10000000_00000000), 0)).toBeCloseTo(1000);
    expect(parseReal8(be64(0b01000100_00100111_00010000_00000000), 0)).toBeCloseTo(10000);
    expect(parseReal8(be64(0b01000101_00011000_01101010_00000000), 0)).toBeCloseTo(100000);
  });
});
