# gdsii

GDSII file format parser for JavaScript.

Copyright (C) 2024, Tiny Tapeout LTD.

## Usage

Install the package using npm:

```bash
npm install gdsii
```

Then you can use the parser in your code. Here's a minimal Node.js example 
that parses a GDS file and prints all records:

```javascript
import { parseGDS, RecordType } from 'gdsii';
import fs from 'fs';

const gds = fs.readFileSync('path/to/your/file.gds');

for (const { tag, data } of parseGDS(gds)) {
  console.log(`${RecordType[tag]}:`, data);
}
```

## Minimal SVG renderer example

The [example](example) directory contains a minimal SVG renderer that runs in the browser. You can run it by cloning the repository and running:

```bash
npm install
npm start
```

## Running the tests

```bash
npm test
```

## License

This project is licensed under either the MIT or Apache 2.0 license, at your option.

