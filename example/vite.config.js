// SPDX-License-Identifier: MIT OR Apache-2.0
// Copyright (C) 2024, Tiny Tapeout LTD
// Author: Uri Shaked

import { join } from 'path';

/**
 * @type {import('vite').UserConfig}
 */
const config = {
  base: '',
  resolve: {
    alias: { gdsii: join(__dirname, '../src') },
  },
  server: {
    open: true,
  },
};

export default config;