import InitSelectSchool from '@/app/_libs/components/init-select-school';
import { TitleComponent } from '@/app/_libs/components/title';
import UrlConverter from '@/app/_libs/components/url-converter/url-converter';
import HomeStatus from '@/app/_libs/components/home-status';
import '@/../package.json';
import ToggleConvertButton from '@/app/_libs/components/toggle-convert-button';

export default function Home() {
  return (
    <>
      <InitSelectSchool />
      <TitleComponent marginBottom={false}>
        转换
        <ToggleConvertButton />
      </TitleComponent>
      <HomeStatus />
      <UrlConverter />
    </>
  );
}
