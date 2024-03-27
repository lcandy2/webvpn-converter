import { ReactNode } from 'react';
import { lxgwNeoZhiSong } from '@/app/_libs/fonts/fonts';

export default function Title({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <TitleComponent marginBottom={!subtitle}>{title}</TitleComponent>
      {subtitle && <SubtitleComponent> {subtitle} </SubtitleComponent>}
    </>
  );
}

interface TitleComponentProps {
  children?: ReactNode;
  marginBottom?: boolean;
}

export const TitleComponent = ({
  children,
  marginBottom = true,
}: TitleComponentProps) => {
  const marginBottomClass = marginBottom ? 'my-14' : 'mt-14 mb-6';
  return (
    <h1 className={`${marginBottomClass} text-7xl font-normal`}>{children}</h1>
  );
};

interface SubtitleComponentProps {
  children?: ReactNode;
}

export const SubtitleComponent = ({ children }: SubtitleComponentProps) => {
  return <p className="text-3xl mb-14 font-normal">{children}</p>;
};
