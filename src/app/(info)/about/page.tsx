import { TitleComponent } from '@/app/_libs/components/title';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Web VPN Converter 是一个面向高校 WebVPN 的链接转换工具，支持按学校生成 WebVPN 访问链接、还原链接和小书签。',
  alternates: {
    canonical: '/about',
  },
};

export default function Page() {
  return (
    <>
      <TitleComponent marginBottom={false}>About</TitleComponent>
    </>
  );
}
