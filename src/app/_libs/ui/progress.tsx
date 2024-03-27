import { createComponent } from '@lit/react';
import { MdCircularProgress as MdCircularProgressWC } from '@material/web/all';
import React from 'react';

export const MdCircularProgress = createComponent({
  tagName: 'md-circular-progress',
  elementClass: MdCircularProgressWC,
  react: React,
});
