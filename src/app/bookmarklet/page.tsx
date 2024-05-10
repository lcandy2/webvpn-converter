import InitSelectSchool from '@/app/_libs/components/init-select-school';
import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import '@/../package.json';
import type { Metadata } from 'next';
import BookmarkletClient from '@/app/bookmarklet/_lib/components/bookmarklet-client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '小书签插件 Bookmarklet',
};

export default async function Home() {
  const cookieStore = cookies();
  const selectedSchool = cookieStore.get('selectedSchool');

  if (!selectedSchool) {
    redirect('/settings/setup');
  }

  return (
    <>
      {/*<InitSelectSchool />*/}
      <TitleComponent marginBottom={false}>Bookmarklet</TitleComponent>
      <SubtitleComponent>
        借助小书签插件，您可以在收藏栏中快速访问 Web VPN 内网地址。
      </SubtitleComponent>
      <BookmarkletClient />
    </>
  );
}
