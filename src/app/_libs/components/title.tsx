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
          <h1 className="mt-14 mb-4 text-7xl">{title}</h1>
          <p className="text-3xl mb-14">{subtitle}</p>
        </>
      ) : (
        <>
          <h1 className="my-14 text-7xl">{title}</h1>
        </>
      )}
    </>
  );
}
