// SPDX-License-Identifier: MIT OR Apache-2.0
// Copyright (C) 2024, Tiny Tapeout LTD
// Author: Uri Shaked

// Spec: http://bitsavers.informatik.uni-stuttgart.de/pdf/calma/GDS_II_Stream_Format_Manual_6.0_Feb87.pdf

import { RecordType } from './RecordType';

function parseDate(dataView: DataView, offset: number) {
  const year = dataView.getUint16(offset, false);
  return new Date(
    Date.UTC(
      year < 1900 ? year + 1900 : year,
      dataView.getUint16(offset + 2, false) - 1,
      dataView.getUint16(offset + 4, false),
      dataView.getUint16(offset + 6, false),
      dataView.getUint16(offset + 8, false),
      dataView.getUint16(offset + 10, false),
    ),
  );
}

export function parseReal8(dataView: DataView, offset: number) {
  if (dataView.getUint32(offset) === 0) {
    return 0;
  }
  const sign = dataView.getUint8(offset) & 0x80 ? -1 : 1;
  const exponent = (dataView.getUint8(offset) & 0x7f) - 64;
  let base = 0;
  for (let i = 1; i < 7; i++) {
    const byte = dataView.getUint8(offset + i);
    for (let bit = 0; bit < 8; bit++) {
      if (byte & (1 << (7 - bit))) {
        base += Math.pow(2, 7 - bit - i * 8);
      }
    }
  }
  return base * sign * Math.pow(16, exponent);
}

const textDecoder = new TextDecoder();

export const emptyParser = (dataView: DataView, offset: number, len: number) => {
  if (len !== 0) {
    throw new Error('Invalid record length');
  }
  return null;
};

export const int16Parser = (dataView: DataView, offset: number, len: number) => {
  if (len !== 2) {
    throw new Error('Invalid record length');
  }
  return dataView.getInt16(offset, false);
};

export const int32Parser = (dataView: DataView, offset: number, len: number) => {
  if (len !== 4) {
    throw new Error('Invalid record length');
  }
  return dataView.getInt32(offset, false);
};

export const stringParser = (dataView: DataView, offset: number, len: number) => {
  if (dataView.getUint8(offset + len - 1) === 0) {
    len--;
  }
  return textDecoder.decode(new Uint8Array(dataView.buffer, offset, len));
};

export const parsers = {
  [RecordType.HEADER]: (dataView: DataView, offset: number, len: number) => {
    if (len !== 2) {
      throw new Error('Invalid record length');
    }
    const version = dataView.getInt16(offset, false);
    return { version };
  },

  [RecordType.BGNLIB]: (dataView: DataView, offset: number, len: number) => {
    if (len !== 24) {
      throw new Error('Invalid record length');
    }
    return {
      modTime: parseDate(dataView, offset),
      accessTime: parseDate(dataView, offset + 12),
    };
  },

  [RecordType.LIBNAME]: stringParser,

  [RecordType.UNITS]: (dataView: DataView, offset: number, len: number) => {
    if (len !== 16) {
      throw new Error('Invalid record length');
    }
    return {
      userUnit: parseReal8(dataView, offset),
      metersPerUnit: parseReal8(dataView, offset + 8),
    };
  },

  [RecordType.ENDLIB]: emptyParser,

  [RecordType.BGNSTR]: (dataView: DataView, offset: number, len: number) => {
    if (len !== 24) {
      throw new Error('Invalid record length');
    }
    return {
      creationTime: parseDate(dataView, offset),
      modTime: parseDate(dataView, offset + 12),
    };
  },

  [RecordType.STRNAME]: stringParser,
  [RecordType.ENDSTR]: emptyParser,
  [RecordType.BOUNDARY]: emptyParser,
  [RecordType.PATH]: emptyParser,
  [RecordType.SREF]: emptyParser,
  [RecordType.AREF]: emptyParser,
  [RecordType.TEXT]: emptyParser,
  [RecordType.LAYER]: int16Parser,
  [RecordType.DATATYPE]: int16Parser,

  [RecordType.WIDTH]: (dataView: DataView, offset: number, len: number) => {
    if (len !== 4) {
      throw new Error('Invalid record length');
    }
    return dataView.getInt32(offset, false);
  },

  [RecordType.XY]: (dataView: DataView, offset: number, len: number) => {
    if (len % 8 !== 0) {
      throw new Error('Invalid record length');
    }
    const xy = new Array(len / 8);
    for (let i = 0; i < len; i += 8) {
      xy[i / 8] = [dataView.getInt32(offset + i, false), dataView.getInt32(offset + i + 4, false)];
    }
    return xy;
  },

  [RecordType.ENDEL]: emptyParser,
  [RecordType.SNAME]: stringParser,

  [RecordType.COLROW]: (dataView: DataView, offset: number, len: number) => {
    if (len !== 4) {
      throw new Error('Invalid record length');
    }
    return {
      columns: dataView.getUint16(offset, false),
      rows: dataView.getUint16(offset + 2, false),
    };
  },

  [RecordType.TEXTNODE]: emptyParser,
  [RecordType.NODE]: emptyParser,
  [RecordType.TEXTTYPE]: int16Parser,
  [RecordType.PRESENTATION]: int16Parser,
  [RecordType.STRING]: stringParser,
  [RecordType.STRANS]: int16Parser,
  [RecordType.MAG]: parseReal8,
  [RecordType.ANGLE]: parseReal8,
  [RecordType.REFLIBS]: stringParser, // TODO: parse multiple strings
  [RecordType.FONTS]: stringParser, // TODO: parse multiple strings
  [RecordType.PATHTYPE]: int16Parser,
  [RecordType.GENERATIONS]: int16Parser,
  [RecordType.ATTRTABLE]: stringParser,
  [RecordType.ELFLAGS]: int16Parser,
  [RecordType.NODETYPE]: int16Parser,
  [RecordType.PROPATTR]: int16Parser,
  [RecordType.PROPVALUE]: stringParser,
  [RecordType.BOX]: emptyParser,
  [RecordType.BOXTYPE]: int16Parser,
  [RecordType.PLEX]: int32Parser,
  [RecordType.STRCLASS]: int16Parser,
};
