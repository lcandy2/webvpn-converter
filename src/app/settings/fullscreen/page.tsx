import type { Metadata } from 'next';
import Page from '@/app/settings/page';
import { noIndexMetadata } from '@/app/_libs/seo';

export const metadata: Metadata = {
  title: '设置',
  ...noIndexMetadata,
};

export default Page;
