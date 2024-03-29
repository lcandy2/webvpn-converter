import { ReactNode } from 'react';
// import { lxgwNeoZhiSong } from '@/app/_libs/fonts/fonts';

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
  const marginBottomClass = marginBottom ? 'my-10' : 'mt-10 mb-4';
  return (
    <h1
      className={`transition-all duration-md ease-md ${marginBottomClass} box-border overflow-x-auto block text-display-xl-sm sm:text-display-xl text-on-surface`}
    >
      {children}
    </h1>
  );
};

interface SubtitleComponentProps {
  children?: ReactNode;
}

export const SubtitleComponent = ({ children }: SubtitleComponentProps) => {
  return (
    <h2 className="transition-all duration-md ease-md text-title-l sm:text-2xl mb-4 font-normal text-on-surface">
      {children}
    </h2>
  );
};
