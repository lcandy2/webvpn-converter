import { ReactNode } from 'react';

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
  marginBottom = false,
}: TitleComponentProps) => {
  const marginBottomClass = marginBottom ? 'my-14' : 'mt-14 mb-4';
  return <h1 className={`${marginBottomClass} text-7xl`}>{children}</h1>;
};

interface SubtitleComponentProps {
  children?: ReactNode;
}

export const SubtitleComponent = ({ children }: SubtitleComponentProps) => {
  return <p className="text-3xl mb-14">{children}</p>;
};
