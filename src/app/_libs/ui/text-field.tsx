'use client';
import { createComponent } from '@lit/react';
import React, { ReactNode } from 'react';
import {
  MdFilledTextField as MdFilledTextFieldWebComponent,
  MdOutlinedTextField as MdOutlinedTextFieldWebComponent,
} from '@material/web/all';

const MdFilledTextField = createComponent({
  tagName: 'md-filled-text-field',
  elementClass: MdFilledTextFieldWebComponent,
  react: React,
});

export const MdOutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: MdOutlinedTextFieldWebComponent,
  react: React,
  events: {
    onChange: 'change',
    onFocus: 'focus',
    onBlur: 'blur',
    onMouseDown: 'mousedown',
  },
});

type TextFieldVariant = 'filled' | 'outlined';

interface MdTextFieldProps {
  variant?: TextFieldVariant;
  children?: ReactNode;
  [x: string]: any; // 其他任意属性
}

export default function MdTextField({
  variant,
  children,
  ...props
}: MdTextFieldProps) {
  switch (variant) {
    case 'filled':
      if (children) {
        return <MdFilledTextField {...props}>{children}</MdFilledTextField>;
      } else {
        return <MdFilledTextField {...props} />;
      }
    default:
      if (children) {
        return <MdOutlinedTextField {...props}>{children}</MdOutlinedTextField>;
      } else {
        return <MdOutlinedTextField {...props} />;
      }
  }
}
