import { createComponent } from '@lit/react';
import { MdOutlinedCard as MdOutlinedCardWC } from '@material/web/labs/card/outlined-card';
import React from 'react';

export const MdOutlinedCard = createComponent({
  tagName: 'md-outlined-card',
  elementClass: MdOutlinedCardWC,
  react: React,
});
