'use client';
import { createComponent } from '@lit-labs/react';
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

const MdOutlinedTextField = createComponent({
  tagName: 'md-outlined-text-field',
  elementClass: MdOutlinedTextFieldWebComponent,
  react: React,
});

type TextFieldType = 'filled' | 'outlined';

interface MdTextFieldProps {
  varient?: TextFieldType;
  children?: ReactNode;
  [x: string]: any; // 其他任意属性
}

export default function MdTextField({
  varient,
  children,
  ...props
}: MdTextFieldProps) {
  switch (varient) {
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
