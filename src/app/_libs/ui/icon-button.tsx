'use client';

import { createComponent } from '@lit/react';
import { MdIconButton as MdIconButtonWebComponent } from '@material/web/iconbutton/icon-button';
import React from 'react';

export const MdIconButton = createComponent({
  tagName: 'md-icon-button',
  elementClass: MdIconButtonWebComponent,
  react: React,
});

/**
 * temporary comment for better performance
 *
 *
 const iconButtonVariants = {
 default: createComponent({
 tagName: 'md-icon-button',
 elementClass: MdIconButtonWebComponent,
 react: React,
 }),
 filled: createComponent({
 tagName: 'md-filled-icon-button',
 elementClass: MdFilledIconButtonWebComponent,
 react: React,
 }),
 'filled-tonal': createComponent({
 tagName: 'md-filled-tonal-icon-button',
 elementClass: MdFilledTonalIconButtonWebComponent,
 react: React,
 }),
 };

 type IconButtonVariant = 'default' | 'filled' | 'filled-tonal';

 interface MdIconButtonProps
 extends DetailedHTMLProps<
 ButtonHTMLAttributes<HTMLButtonElement>,
 HTMLButtonElement
 > {
 variant?: IconButtonVariant;
 icon: string;
 selected?: boolean;
 children?: ReactNode;
 }

 export default function MdIconButton({
 variant = 'default',
 icon,
 selected,
 ...props
 }: MdIconButtonProps) {
 const IconButtonComponent = iconButtonVariants[variant];
 return (
 // @ts-expect-error can't find a way to type this
 <IconButtonComponent {...props}>
 <MdIcon slot={selected ? 'selected' : ''}>{icon}</MdIcon>
 </IconButtonComponent>
 );
 }

 */
