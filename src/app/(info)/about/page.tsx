import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function Page() {
  return (
    <>
      <TitleComponent marginBottom={false}>About</TitleComponent>
    </>
  );
}
