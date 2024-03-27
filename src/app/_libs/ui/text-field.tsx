'use client';

/**
 * temporary comment for better performance
 *

import { createComponent } from '@lit/react';
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import {
  MdFilledTextField as MdFilledTextFieldWebComponent,
  MdOutlinedTextField as MdOutlinedTextFieldWebComponent,
} from '@material/web/all';
import type { ReactWebComponent } from '@lit/react';

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
  },
});

interface MdTextFieldProps extends ReactWebComponent<HTMLElement> {
  variant?: 'filled' | 'outlined';
  children?: ReactNode;
}

// export default function MdTextField({
//   variant,
//   children,
//   ...props
// }: MdTextFieldProps) {
//   switch (variant) {
//     case 'filled':
//       if (children) {
//         return <MdFilledTextField {...props}>{children}</MdFilledTextField>;
//       } else {
//         return <MdFilledTextField {...props} />;
//       }
//     default:
//       if (children) {
//         return <MdOutlinedTextField {...props}>{children}</MdOutlinedTextField>;
//       } else {
//         return <MdOutlinedTextField {...props} />;
//       }
//   }
// }

export default function MdTextField({
  variant = 'outlined',
  children,
  ...props
}: MdTextFieldProps) {
  const Component =
    variant === 'filled' ? MdFilledTextField : MdOutlinedTextField;

  return <Component {...props}>{children}</Component>;
}

 */
