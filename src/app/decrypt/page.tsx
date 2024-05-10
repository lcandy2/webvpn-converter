import { TitleComponent } from '@/app/_libs/components/title';
import UrlConverter from '@/app/_libs/components/url-converter/url-converter';
import HomeStatus from '@/app/_libs/components/home-status';
import '@/../package.json';
import ToggleConvertButton from '@/app/_libs/components/toggle-convert-button';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '还原链接',
};

export default function Home() {
  const cookieStore = cookies();
  const selectedSchool = cookieStore.get('selectedSchool');

  if (!selectedSchool) {
    redirect('/settings/setup');
  }

  return (
    <>
      {/*<InitSelectSchool />*/}
      <TitleComponent marginBottom={false}>
        还原
        <ToggleConvertButton />
      </TitleComponent>
      <HomeStatus />
      <UrlConverter mode={'decrypt'} />
    </>
  );
}
