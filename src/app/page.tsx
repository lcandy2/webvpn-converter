import InitSelectSchool from '@/app/_libs/hooks/init-select-school';
import Title from '@/app/_libs/components/title';
import UrlConverter from '@/app/_libs/components/url-converter/url-converter';

export default function Home() {
  return (
    <>
      <InitSelectSchool />
      <Title title="转换" />
      <UrlConverter />
    </>
  );
}
