export enum RecordType {
  HEADER = 0x0002,
  /** Marks beginning of library */
  BGNLIB = 0x0102,
  /** Contains a string which is the library name */
  LIBNAME = 0x0206,
  UNITS = 0x0305,
  /** Marks the end of a library */
  ENDLIB = 0x0400,
  /** Marks the beginning of a structure */
  BGNSTR = 0x0502,
  /** Contains a string which is the structure name */
  STRNAME = 0x0606,
  /** Marks the end of a structure */
  ENDSTR = 0x0700,
  /** Marks the beginning of a boundary element */
  BOUNDARY = 0x0800,
  /** Marks the beginning of a path element */
  PATH = 0x0900,
  /** Marks the beginning of a SREF (structure reference) element */
  SREF = 0x0a00,
  /** Marks the beginning of a AREF (array reference) element */
  AREF = 0x0b00,
  /** Marks the beginning of a text element. */
  TEXT = 0x0c00,
  /** Contains 2 bytes which specify the layer. The value of the layer must be in the range of a to 63.  */
  LAYER = 0x0d02,
  /** Contains 2 bytes which specify datatype. The value of the datatype must be in the range of a to 63. */
  DATATYPE = 0x0e02,
  /** Contains four bytes which specify the width of a
   * path or text lines in data base units. A negative
   * value for width means that the width is absolute,
   * i.e., it is not affected by the magnification factor of
   * any parent reference. If omitted, zero is assumed.
   */
  WIDTH = 0x0f03,
  /** Contains an array of XY coordinates in database units. Each X or Y coordinate is four bytes long. */
  XY = 0x1003,
  /** Marks the end of an element */
  ENDEL = 0x1100,
  /** Contains the name of a referenced structure.  */
  SNAME = 0x1206,
  /**
   * Contains 4 bytes. The first 2 bytes contain the number of columns in the array.
   * The third and fourth bytes contain the number of rows.
   */
  COLROW = 0x1302,
  /** Marks the beginning of a text node. */
  TEXTNODE = 0x1400,
  /** Marks the beginning of a node. */
  NODE = 0x1500,
  /** Contains 2 bytes representing texttype. The value of the texttype must be in the range 0 to 63. */
  TEXTTYPE = 0x1602,
  /**
   * Contains 1 word (2 bytes) of bit flags for text presentation.
   * Bits 10 and 11, taken together as a binary number,
   * specify the font (00 means font 0, 01 means font 1, 10 means font 2,
   * and 11 means font 3). Bits 12 and 13 specify the vertical
   * presentation (00 means top, 01 means middle, and 10 means bottom).
   * Bits 14 and 15 specify the horizontal presentation (00 means left,
   * 01 means center, and 10 means right).
   * Bits 0 through 9 are reserved for future use and must be cleared.
   * If this record is omitted, then top-left justification and font 0 are assumed
   */
  PRESENTATION = 0x1701,
  /** @deprecated */ SPACING = 0x1800,
  /** Contains a character string for text presentation, up to 512 characters long. */
  STRING = 0x1906,
  /**
   * Contains two bytes of bit flags for SREF, AREF,
   * and text transformation. Bit 0 (the leftmost bit)
   * specifies reflection. If it is set, then reflection about
   * the X-axis is applied before angular rotation. For
   * AREFs, the entire array lattice is reflected, with the
   * individual array elements rigidly attached. Bit 13
   * flags absolute magnification. Bit 14 flags absolute
   * angle. Bit 15 (the rightmost bit) and all remaining bits are reserved for future use and must be
   * cleared. If this record is omitted, then the element
   * is assumed to have no reflection and its magnification and angle are assumed to be non-absolute.
   */
  STRANS = 0x1a01,
  /**
   * Contains a double-precision real number (8 bytes)
   * which is the magnification factor.
   * If omitted, amagnification of 1 is assumed.
   */
  MAG = 0x1b05,
  /**
   * Contains a double-precision real number (8 bytes)
   * which is the angular rotation factor, measured in
   * degrees and in counterclockwise direction.
   * For an AREF, the ANGLE rotates the entire array
   * lattice (with the individual array elements rigidly
   * attached) about the array reference point. If this
   * record is omitted, an angle of zero degrees is assumed.
   */
  ANGLE = 0x1c05,
  /** @deprecated */ UINTEGER = 0x1d00,
  /** @deprecated */ USTRING = 0x1e00,
  /**
   * Contains the names of the reference libraries. This
   * record must be present if there are any reference
   * libraries bound to the current library.
   * The name for the first reference library starts at
   * byte 0 and the name of the second library starts at
   * byte 45 (decimal). The reference library names may
   * include directory specifiers (separated with ":") and
   * an extension (separated with "."). If either library
   * is not named, its place is filled with nulls.
   */
  REFLIBS = 0x1f06,
  /**
   * Contains names of textfont definition files. This
   * record must be present if any of the 4 fonts have a
   * corresponding textfont definition file. This record
   * must not be present if none of the fonts have a textfont definition file. The name of font 0 starts the
   * record, followed by the remaining 3 fonts. Each
   * name is 44 bytes long and is null if there is no corresponding textfont definition. Each name is padded
   * with nulls if it is shorter than 44 bytes. The textfont
   * definition file names may include directory specifiers
   * (separated with ":") and an extension (separated
   * with ".").
   */
  FONTS = 0x2006,
  /**
   * This record contains a value of 0 for square-ended
   * paths that end flush with their endpoints, 1 for
   * round-ended paths, and 2 for square-ended paths
   * that extend a half-width beyond their endpoints.
   * Pathtype 4 (for the CustomPlus product only) signifies a path with variable square-end extensions
   * (see records 48 and 49). If not specified, a Pathtype
   * of 0 is assumed.
   */
  PATHTYPE = 0x2102,
  /**
   * This record contains a positive count of the number
   * of copies of deleted or backed-up structures to retain. This number must be at least 2 and not more
   * than 99. If the GENERATIONS record is not present,
   * a value of 3 is assumed.
   */
  GENERATIONS = 0x2202,
  /**
   * Contains the name of the attribute definition file.
   * This record is present only if there is an attribute
   * definition file bound to the library. The attribute
   * definition file name may include directory specifiers
   * (separated with ":") and an extension (separated
   * with "."). Maximum size is 44 bytes.
   */
  ATTRTABLE = 0x2306,
  /** @deprecated */ STYPTABLE = 0x2406,
  /** @deprecated */ STRTYPE = 0x2502,
  /**
   * Contains 2 bytes of bit flags. Bit 15 (the rightmost bit) specifies Template data. Bit 14 specifies
   * External data (also referred to as Exterior data).
   * All other bits are currently unused and must be
   * cleared to o. If this record is omitted, then all bits
   * are assumed to be o.
   */
  ELFLAGS = 0x2601,
  /** @deprecated */ ELKEY = 0x2703,
  /** @deprecated */ LINKTYPE = 0x2802,
  /** @deprecated */ LINKKEYS = 0x2902,
  /**
   * Contains 2 bytes which specify nodetype. The value
   * of the nodetype must be in the range of 0 to 63.
   */
  NODETYPE = 0x2a02,
  /**
   * Contains 2 bytes which specify the attribute number. The attribute number is an integer from 1 to
   * 127. Attribute numbers 126 and 127 are reserved
   * for the user integer and user string (CSD) properties, which existed prior to Release 3.0. (User string
   * and user integer data from previous releases is converted to property data having attribute number
   * 127 and 126 by the Stream format input program
   * INFORM.)
   */
  PROPATTR = 0x2b02,
  /**
   * Contains the string value associated with the attribute named in the preceding PROP ATTR record.
   * Maximum length is 126 characters. The attributevalue pairs associated with anyone element must
   * all have distinct attribute numbers. Also, there is
   * a limit on the total amount of property data that
   * may be associated with anyone element: the total
   * length of all the strings, plus twice the number of
   * attribute-value pairs, must not exceed 128 (or 512
   * if the element is an SREF, AREF, or node).
   * For example, if a boundary element used property
   * attribute 2 with property value "metal", and property attribute 10 with property value "property",
   * then the total amount of property data would be
   * 18 bytes. This is 6 bytes for "metal" (odd-length
   * strings must be padded with a null) + 8 for "property" + 2 times the 2 attributes (4) = 18.
   */
  PROPVALUE = 0x2c06,
  /** Marks the beginning of a box element. */
  BOX = 0x2d00,
  /**
   * Contains 2 bytes which specify boxtype. The value
   * of the boxtype must be in the range of 0 to 63.
   */
  BOXTYPE = 0x2e02,
  /**
   * A unique positive number which is common to all
   * elements of the plex to which this element belongs.
   * The head of the plex is flagged by setting the seventh bit; therefore, plex numbers should be small
   * enough to occupy only the rightmost 24 bits. If
   * this record is omitted, then the element is not a
   * plex member.
   */
  PLEX = 0x2f03,
  /** @deprecated */ BGNEXTN = 0x3003,
  /** @deprecated */ ENDEXTN = 0x3103,
  /** @deprecated */ TAPENUM = 0x3202,
  /** @deprecated */ TAPECODE = 0x3302,
  /** Only for Calma internal use with CustomPlus structures. */
  STRCLASS = 0x3401,
  /** @deprecated */ RESERVED = 0x3503,
  /** @deprecated */ FORMAT = 0x3602,
  /** @deprecated */ MASK = 0x3706,
  /** @deprecated */ ENDMASKS = 0x3800,
  /** @deprecated */ LIBDIRSIZE = 0x3902,
  /** @deprecated */ SRFNAME = 0x3a06,
  /**
   * Contains an array of Access Control List (ACL)
   * data. There may be from 1 to 32 ACL entries, each
   * consisting of:
   * • A group number
   * • A user number
   * • Access rights
   * This information is used only if INFORM is reading
   * the data into a new library. If this record is present,
   * it should occur between the BGNLIB record and the
   * LIBNAME record.
   */
  LIBSECUR = 0x3b02,
}
