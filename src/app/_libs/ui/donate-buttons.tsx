'use client';

import MdFab, { MdFabProps } from '@/app/_libs/ui/floating-action-buttons';
import { useState } from 'react';
import { MdTextButton, MdTextButtonProps } from '@/app/_libs/ui/button';

type MdFabDonateProps = MdFabProps extends { children: React.ReactNode }
  ? MdFabProps
  : MdFabProps & { children: React.ReactNode };

export const MdFabDonate = (props: MdFabDonateProps) => {
  const [currentLabel, setCurrentLabel] = useState(props.label);

  const handleClick = () => {
    setCurrentLabel('谢谢您的支持');
    setTimeout(() => {
      setCurrentLabel(props.label);
    }, 3000);
  };

  return (
    <MdFab {...props} label={currentLabel} onClick={handleClick}>
      {props.children}
    </MdFab>
  );
};

type MdTextButtonDonateProps = MdTextButtonProps extends { label: string }
  ? MdTextButtonProps
  : MdTextButtonProps & { label: string };

export const MdTextButtonDonate = (props: MdTextButtonDonateProps) => {
  const [currentLabel, setCurrentLabel] = useState(props.label);

  const handleClick = () => {
    setCurrentLabel('谢谢您的支持');
    setTimeout(() => {
      setCurrentLabel(props.label);
    }, 3000);
  };

  return (
    <MdTextButton {...props} onClick={handleClick}>
      {props.children}
      {currentLabel}
    </MdTextButton>
  );
};
