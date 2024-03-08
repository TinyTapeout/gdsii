// SPDX-License-Identifier: MIT OR Apache-2.0
// Copyright (C) 2024, Tiny Tapeout LTD
// Author: Uri Shaked

import { RecordType } from './RecordType';
import { parsers } from './parsers';

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
      const result = parsers[tag](dataView, offset, len - 4);
      yield {
        type: tag,
        data: result,
      };
    } else {
      throw new GDSParseError(`Unknown record type: ${RecordType[tag]}`);
    }
    offset += len - 4;
  }
}