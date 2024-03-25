'use client';
import { createComponent } from '@lit/react';
import React from 'react';
import { MdFab as MdFabWebComponent } from '@material/web/all';

export type { FabSize, FabVariant } from '@material/web/fab/fab.js';

const MdFab = createComponent({
  tagName: 'md-fab',
  elementClass: MdFabWebComponent,
  react: React,
});

export default MdFab;
