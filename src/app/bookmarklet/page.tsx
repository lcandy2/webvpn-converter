import InitSelectSchool from '@/app/_libs/components/init-select-school';
import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import UrlConverter from '@/app/_libs/components/url-converter/url-converter';
import HomeStatus from '@/app/_libs/components/home-status';
import '@/../package.json';
import ToggleConvertButton from '@/app/_libs/components/toggle-convert-button';
import type { Metadata } from 'next';
import BookmarkletClient from '@/app/bookmarklet/_lib/components/bookmarklet-client';

export const metadata: Metadata = {
  title: '小书签插件 Bookmarklet',
};

export default function Home() {
  return (
    <>
      <InitSelectSchool />
      <TitleComponent marginBottom={false}>Bookmarklet</TitleComponent>
      <SubtitleComponent>
        借助小书签插件，您可以在收藏栏中快速访问 Web VPN 内网地址。
      </SubtitleComponent>
      <BookmarkletClient />
    </>
  );
}
