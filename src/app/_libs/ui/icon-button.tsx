'use client';

import { createComponent } from '@lit/react';
import { MdIconButton as MdIconButtonWebComponent } from '@material/web/iconbutton/icon-button';
import React, { ReactNode } from 'react';
import { MdFilledIconButton as MdFilledIconButtonWebComponent } from '@material/web/iconbutton/filled-icon-button';
import { MdFilledTonalIconButton as MdFilledTonalIconButtonWebComponent } from '@material/web/iconbutton/filled-tonal-icon-button';
import MdIcon from '@/app/_libs/ui/icon';

const MdDefaultIconButton = createComponent({
  tagName: 'md-icon-button',
  elementClass: MdIconButtonWebComponent,
  react: React,
});

const MdFilledIconButton = createComponent({
  tagName: 'md-filled-icon-button',
  elementClass: MdFilledIconButtonWebComponent,
  react: React,
});

const MdFilledTonalIconButton = createComponent({
  tagName: 'md-filled-tonal-icon-button',
  elementClass: MdFilledTonalIconButtonWebComponent,
  react: React,
});

type IconButtonVariant = 'default' | 'filled' | 'filled-tonal' | 'outlined';

interface MdIconButtonProps {
  variant?: IconButtonVariant;
  icon: string;
  selected?: boolean;
  children?: ReactNode;
}

export default function MdIconButton({
  variant,
  icon,
  selected,
  children,
  ...props
}: MdIconButtonProps) {
  switch (variant) {
    case 'filled':
      return (
        <MdFilledIconButton {...props}>
          <MdIcon slot={selected ? 'selected' : ''}>{icon}</MdIcon>
          {children}
        </MdFilledIconButton>
      );
    case 'filled-tonal':
      return (
        <MdFilledTonalIconButton {...props}>
          <MdIcon slot={selected ? 'selected' : ''}>{icon}</MdIcon>
          {children}
        </MdFilledTonalIconButton>
      );
    default:
      return (
        <MdDefaultIconButton {...props}>
          <MdIcon slot={selected ? 'selected' : ''}>{icon}</MdIcon>
          {children}
        </MdDefaultIconButton>
      );
  }
}
