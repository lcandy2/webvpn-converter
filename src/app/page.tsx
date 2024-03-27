import InitSelectSchool from '@/app/_libs/components/init-select-school';
import { TitleComponent } from '@/app/_libs/components/title';
import UrlConverter from '@/app/_libs/components/url-converter/url-converter';
import HomeStatus from '@/app/_libs/components/home-status';
import '@/../package.json';
import { getPackageVersion } from 'next/dist/lib/get-package-version';

export default function Home() {
  return (
    <>
      <InitSelectSchool />
      <TitleComponent title="转换" marginBottom={false} />
      <HomeStatus />
      <UrlConverter />
    </>
  );
}
