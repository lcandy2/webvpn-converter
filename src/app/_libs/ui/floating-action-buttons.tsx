/*
 * Source: react-material-web
 * https://github.com/anthonyleung-dev/react-material-web
 */

'use client';

import { createComponent } from '@lit/react';
import React, { ComponentProps } from 'react';
import { MdFab as _MdFab } from '@material/web/all';

/**
 * Props for the `MdFab` component.
 * This interface is used to provide the props for the `MdFab` component.
 *
 */
export type MdFabProps = ComponentProps<typeof MdFab>;

/**
 * Props for the `MdBrandedFab` component.
 * This interface is used to provide the props for the `MdBrandedFab` component.
 *
 */
export type MdFabElement = _MdFab;

export type MdFabVariant = 'surface' | 'primary' | 'secondary' | 'tertiary';

/**
 * Material Design Floating Action Button component.
 * This component is a React wrapper around the `md-fab` custom element.
 * FABs should have an icon, such as a font md-icon, an svg, or an img.
 *
 * @component
 * @param {MdFabVariant} variant - The FAB color variant to render. It can be set to "surface" (default), "primary", "secondary", or "tertiary".
 * @param {FabSize} size - The size of the FAB. NOTE: Branded FABs cannot be sized to small, and Extended FABs do not have different sizes. It can be set to "small", "medium" (default), or "large".
 * @param {string} label - The text to display on the FAB.
 * @param {boolean} lowered - Lowers the FAB's elevation.
 *
 * @example
 * ``` tsx
 * import React from 'react'
 * import { MdFab } from '@material/react'
 * import { MdIcon } from '@material/react/icon'
 *
 * export const Detault = () => (
 *    <MdFab label="FAB">
 *       <MdIcon slot="icon">add</MdIcon>
 *   </MdFab>
 * )
 * ```
 */
const MdFab = createComponent({
  react: React,
  tagName: 'md-fab',
  elementClass: _MdFab,
});

export default MdFab;
