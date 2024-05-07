// SPDX-License-Identifier: MIT OR Apache-2.0
// Copyright (C) 2024, Tiny Tapeout LTD
// Author: Uri Shaked

import { parseGDS, RecordType } from 'gdsii';
import gdsUrl from '../tt_um_factory_test.gds?url';

const gdsBytes = await fetch(gdsUrl).then((res) => res.arrayBuffer());
let rootCell = 'tt_um_factory_test';

const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
svg.setAttribute('viewBox', '-200 -200 300000 160000');
svg.setAttribute('width', '600');
svg.setAttribute('height', '600');
// V flip
svg.setAttribute('transform', 'scale(1, -1)');
document.body.appendChild(svg);

function renderToSVG(rootCell: string, root: SVGElement) {
  let currentLayer = 0;
  let currentDataType = 0;
  let elementType = '';
  let elementText = '';
  let srefName = '';
  let xy: Array<[number, number]> = [];

  let currentGroup: SVGGElement | null = null;

  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  root.appendChild(defs);

  for (const record of parseGDS(new Uint8Array(gdsBytes))) {
    switch (record.type) {
      case RecordType.BGNSTR:
        currentGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        break;
      case RecordType.DATATYPE:
        currentDataType = record.data;
        break;
      case RecordType.LAYER:
        currentLayer = record.data;
        break;
      case RecordType.ENDSTR:
        currentGroup = null;
        break;
    }

    if (!currentGroup) {
      continue;
    }

    switch (record.type) {
      case RecordType.STRNAME: {
        const name = record.data;
        console.log(record.data);
        currentGroup!.setAttribute('id', `cell-${name}`);
        if (name === rootCell) {
          root.appendChild(currentGroup!);
        } else {
          defs.appendChild(currentGroup!);
        }
        break;
      }
      case RecordType.XY:
        xy = record.data;
        break;
      case RecordType.SNAME:
        srefName = record.data;
        break;
      case RecordType.WIDTH:
        console.log('Width:', record.data);
        break;
      case RecordType.BOUNDARY:
        elementType = 'boundary';
        break;
      case RecordType.SREF:
        elementType = 'sref';
        break;
      case RecordType.PATH:
        elementType = 'path';
        break;
      case RecordType.TEXT:
        elementType = 'text';
        break;
      case RecordType.STRING:
        elementText = record.data;
        break;
      case RecordType.ENDEL:
        if (elementType === 'boundary') {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute(
            'd',
            xy.map((p, i) => (i === 0 ? 'M' : 'L') + p.join(' ')).join(' ') + ' Z',
          );
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', 'black');
          path.setAttribute('stroke-width', '100');
          currentGroup.appendChild(path);
        }
        if (elementType === 'path') {
          const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          path.setAttribute('d', xy.map((p, i) => (i === 0 ? 'M' : 'L') + p.join(' ')).join(' '));
          path.setAttribute('fill', 'none');
          path.setAttribute('stroke', 'black');
          currentGroup.appendChild(path);
        }
        if (elementType === 'text') {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', xy[0][0].toString());
          text.setAttribute('y', xy[0][1].toString());
          text.setAttribute('font-size', '50');
          text.textContent = elementText;
          currentGroup.appendChild(text);
        }
        if (elementType === 'sref') {
          const use = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          use.setAttribute('x', xy[0][0].toString());
          use.setAttribute('y', xy[0][1].toString());
          use.setAttribute('href', `#cell-${srefName}`);
          currentGroup.appendChild(use);
        }
        elementType = '';
        srefName = '';
        break;
    }
  }
}

renderToSVG(rootCell, svg);
