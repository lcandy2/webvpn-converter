'use client';
import { createComponent } from '@lit/react';
import React from // ButtonHTMLAttributes,
// DetailedHTMLProps,
// ReactNode,
'react';
import {
  // MdElevatedButton as MdElevatedButtonWebComponent,
  // MdFilledButton as MdFilledButtonWebComponent,
  // MdFilledTonalButton as MdFilledTonalButtonWebComponent,
  // MdOutlinedButton as MdOutlinedButtonWebComponent,
  MdTextButton as MdTextButtonWebComponent,
} from '@material/web/all';

export const MdTextButton = createComponent({
  tagName: 'md-text-button',
  elementClass: MdTextButtonWebComponent,
  react: React,
});

/**
 * temporary comment for better performance
 *
 *
const buttonComponents = {
  elevated: createComponent({
    tagName: 'md-elevated-button',
    elementClass: MdElevatedButtonWebComponent,
    react: React,
  }),
  filled: createComponent({
    tagName: 'md-filled-button',
    elementClass: MdFilledButtonWebComponent,
    react: React,
  }),
  'filled-tonal': createComponent({
    tagName: 'md-filled-tonal-button',
    elementClass: MdFilledTonalButtonWebComponent,
    react: React,
  }),
  outlined: createComponent({
    tagName: 'md-outlined-button',
    elementClass: MdOutlinedButtonWebComponent,
    react: React,
  }),
  text: createComponent({
    tagName: 'md-text-button',
    elementClass: MdTextButtonWebComponent,
    react: React,
  }),
};

type ButtonVariant =
  | 'elevated'
  | 'filled'
  | 'filled-tonal'
  | 'outlined'
  | 'text';

interface MdButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant?: ButtonVariant;
  children?: ReactNode;
}

export default function MdButton({
  variant = 'elevated',
  children,
  ...props
}: MdButtonProps) {
  const ButtonComponent =
    buttonComponents[variant] || buttonComponents['elevated'];

  // @ts-expect-error can't find a way to type this
  return <ButtonComponent {...props}>{children}</ButtonComponent>;
}

 */
