'use client';
import { createComponent } from '@lit/react';
import React, { ReactNode } from 'react';
import { MdIcon as MdIconWebComponent } from '@material/web/all';
import 'material-symbols/outlined.css';

const MdIcon = createComponent({
  tagName: 'md-icon',
  elementClass: MdIconWebComponent,
  react: React,
});

export default MdIcon;
