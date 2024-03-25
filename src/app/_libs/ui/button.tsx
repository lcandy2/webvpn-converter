'use client';
import { createComponent } from '@lit/react';
import React, { ReactNode } from 'react';
import {
  MdElevatedButton as MdElevatedButtonWebComponent,
  MdFilledButton as MdFilledButtonWebComponent,
  MdFilledTonalButton as MdFilledTonalButtonWebComponent,
  MdOutlinedButton as MdOutlinedButtonWebComponent,
  MdTextButton as MdTextButtonWebComponent,
} from '@material/web/all';

const MdElevatedButton = createComponent({
  tagName: 'md-elevated-button',
  elementClass: MdElevatedButtonWebComponent,
  react: React,
});

const MdFilledButton = createComponent({
  tagName: 'md-filled-button',
  elementClass: MdFilledButtonWebComponent,
  react: React,
});

const MdFilledTonalButton = createComponent({
  tagName: 'md-filled-tonal-button',
  elementClass: MdFilledTonalButtonWebComponent,
  react: React,
});

const MdOutlinedButton = createComponent({
  tagName: 'md-outlined-button',
  elementClass: MdOutlinedButtonWebComponent,
  react: React,
});

const MdTextButton = createComponent({
  tagName: 'md-text-button',
  elementClass: MdTextButtonWebComponent,
  react: React,
});

type ButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filled-tonal'
  | 'outlined'
  | 'text';

interface MdButtonProps {
  variant?: ButtonVariant;
  children?: ReactNode;
  [x: string]: any; // 其他任意属性
}

export default function MdButton({
  variant,
  children,
  ...props
}: MdButtonProps) {
  switch (variant) {
    case 'elevated':
      return <MdElevatedButton {...props}>{children}</MdElevatedButton>;
    case 'filled':
      return <MdFilledButton {...props}>{children}</MdFilledButton>;
    case 'filled-tonal':
      return <MdFilledTonalButton {...props}>{children}</MdFilledTonalButton>;
    case 'outlined':
      return <MdOutlinedButton {...props}>{children}</MdOutlinedButton>;
    case 'text':
      return <MdTextButton {...props}>{children}</MdTextButton>;
    default:
      return <MdElevatedButton {...props}>{children}</MdElevatedButton>;
  }
}
