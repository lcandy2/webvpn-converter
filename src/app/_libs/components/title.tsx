export default function Title({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      {subtitle ? (
        <>
          <TitleComponent title={title} marginBottom={false} />
          <SubtitleComponent subtitle={subtitle} />
        </>
      ) : (
        <>
          <TitleComponent title={title} marginBottom={true} />
        </>
      )}
    </>
  );
}

interface TitleComponentProps {
  title: string;
  marginBottom?: boolean;
}

export const TitleComponent = ({
  title,
  marginBottom = false,
}: TitleComponentProps) => {
  return marginBottom ? (
    <h1 className="my-14 text-7xl">{title}</h1>
  ) : (
    <h1 className="mt-14 mb-4 text-7xl">{title}</h1>
  );
};

interface SubtitleComponentProps {
  subtitle: string;
}

export const SubtitleComponent = ({ subtitle }: SubtitleComponentProps) => {
  return <p className="text-3xl mb-14">{subtitle}</p>;
};
