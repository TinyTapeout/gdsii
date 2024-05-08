import { type RecordType } from './RecordType';

export namespace GDSRecord {
  export interface Header {
    tag: RecordType.HEADER;
    data: {
      version: number;
    };
  }

  export interface BgnLib {
    tag: RecordType.BGNLIB;
    data: {
      modTime: Date;
      accessTime: Date;
    };
  }

  export interface LibName {
    tag: RecordType.LIBNAME;
    data: string;
  }

  export interface Units {
    tag: RecordType.UNITS;
    data: {
      userUnit: number;
      metersPerUnit: number;
    };
  }

  export interface EndLib {
    tag: RecordType.ENDLIB;
    data: null;
  }

  export interface BgnStr {
    tag: RecordType.BGNSTR;
    data: {
      creationTime: Date;
      accessTime: Date;
    };
  }

  export interface StrName {
    tag: RecordType.STRNAME;
    data: string;
  }

  export interface EndStr {
    tag: RecordType.ENDSTR;
    data: null;
  }

  export interface Boundary {
    tag: RecordType.BOUNDARY;
    data: null;
  }

  export interface Path {
    tag: RecordType.PATH;
    data: null;
  }

  export interface SRef {
    tag: RecordType.SREF;
    data: null;
  }

  export interface ARef {
    tag: RecordType.AREF;
    data: null;
  }

  export interface Text {
    tag: RecordType.TEXT;
    data: null;
  }

  export interface Layer {
    tag: RecordType.LAYER;
    data: number;
  }

  export interface DataType {
    tag: RecordType.DATATYPE;
    data: number;
  }

  export interface Width {
    tag: RecordType.WIDTH;
    data: number;
  }

  export interface XY {
    tag: RecordType.XY;

    /** Array of [x, y] values - point coordinates */
    data: Array<[number, number]>;
  }

  export interface EndEl {
    tag: RecordType.ENDEL;
    data: null;
  }

  export interface SName {
    tag: RecordType.SNAME;
    data: string;
  }

  export interface ColRow {
    tag: RecordType.COLROW;
    data: {
      columns: number;
      rows: number;
    };
  }

  export interface TextNode {
    tag: RecordType.TEXTNODE;
    data: null;
  }

  export interface Node {
    tag: RecordType.NODE;
    data: null;
  }

  export interface TextType {
    tag: RecordType.TEXTTYPE;
    data: number;
  }

  export interface Presentation {
    tag: RecordType.PRESENTATION;
    data: number;
  }

  export interface String {
    tag: RecordType.STRING;
    data: string;
  }

  export interface STrans {
    tag: RecordType.STRANS;
    data: number;
  }

  export interface Mag {
    tag: RecordType.MAG;
    data: number;
  }

  export interface Angle {
    tag: RecordType.ANGLE;
    data: number;
  }

  // TODO: parse multiple strings
  export interface RefLibs {
    tag: RecordType.REFLIBS;
    data: string;
  }

  // TODO: parse multiple strings
  export interface Fonts {
    tag: RecordType.FONTS;
    data: string;
  }

  export interface Pathtype {
    tag: RecordType.PATHTYPE;
    data: number;
  }

  export interface Generations {
    tag: RecordType.GENERATIONS;
    data: number;
  }

  export interface AttrTable {
    tag: RecordType.ATTRTABLE;
    data: string;
  }

  export interface ELFlags {
    tag: RecordType.ELFLAGS;
    data: number;
  }

  export interface NodeType {
    tag: RecordType.NODETYPE;
    data: number;
  }

  export interface PropAttr {
    tag: RecordType.PROPATTR;
    data: number;
  }

  export interface PropValue {
    tag: RecordType.PROPVALUE;
    data: string;
  }

  export interface Box {
    tag: RecordType.BOX;
    data: null;
  }

  export interface BoxType {
    tag: RecordType.BOXTYPE;
    data: number;
  }

  export interface Plex {
    tag: RecordType.PLEX;
    data: number;
  }

  export interface StrClass {
    tag: RecordType.STRCLASS;
    data: number;
  }
}

export type GDSRecord =
  | GDSRecord.Header
  | GDSRecord.BgnLib
  | GDSRecord.LibName
  | GDSRecord.Units
  | GDSRecord.EndLib
  | GDSRecord.BgnStr
  | GDSRecord.StrName
  | GDSRecord.EndStr
  | GDSRecord.Boundary
  | GDSRecord.Path
  | GDSRecord.SRef
  | GDSRecord.ARef
  | GDSRecord.Text
  | GDSRecord.Layer
  | GDSRecord.DataType
  | GDSRecord.Width
  | GDSRecord.XY
  | GDSRecord.EndEl
  | GDSRecord.SName
  | GDSRecord.ColRow
  | GDSRecord.TextNode
  | GDSRecord.Node
  | GDSRecord.TextType
  | GDSRecord.Presentation
  | GDSRecord.String
  | GDSRecord.STrans
  | GDSRecord.Mag
  | GDSRecord.Angle
  | GDSRecord.RefLibs
  | GDSRecord.Fonts
  | GDSRecord.Pathtype
  | GDSRecord.Generations
  | GDSRecord.AttrTable
  | GDSRecord.ELFlags
  | GDSRecord.NodeType
  | GDSRecord.PropAttr
  | GDSRecord.PropValue
  | GDSRecord.Box
  | GDSRecord.BoxType
  | GDSRecord.Plex
  | GDSRecord.StrClass;
