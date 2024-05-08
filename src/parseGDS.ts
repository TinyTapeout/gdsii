// SPDX-License-Identifier: MIT OR Apache-2.0
// Copyright (C) 2024, Tiny Tapeout LTD
// Author: Uri Shaked

import { GDSRecord } from './GDSRecord.js';
import { RecordType } from './RecordType.js';
import { parsers } from './parsers.js';

export class GDSParseError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function* parseGDS(bytes: Uint8Array) {
  let offset = 0;
  const dataView = new DataView(bytes.buffer);
  while (offset < bytes.length) {
    const len = dataView.getUint16(offset, false);
    const tag = dataView.getUint16(offset + 2, false);
    offset += 4;
    if (len < 4 || len % 2 !== 0) {
      throw new GDSParseError(`Invalid record length: ${len}`);
    }
    if (tag in parsers) {
      const parser = parsers[tag as keyof typeof parsers];
      const data = parser(dataView, offset, len - 4);
      yield { tag, data } as GDSRecord;
    } else {
      throw new GDSParseError(`Unknown record type: ${RecordType[tag]}`);
    }
    offset += len - 4;
  }
}
