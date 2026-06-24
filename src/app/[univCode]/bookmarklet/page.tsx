import '@/../package.json';
import type { Metadata } from 'next';
import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import BookmarkletClient from '@/app/bookmarklet/_lib/components/bookmarklet-client';
import SchoolStatus from '@/app/_libs/components/school-status';
import SyncCurrentSchool from '@/app/_libs/components/sync-current-school';
import { getSchoolByCode, SCHOOL_LIST } from '@/app/_libs/schools';
import { buildSchoolServiceMetadata } from '@/app/_libs/seo';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return SCHOOL_LIST.map((school) => ({ univCode: school.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ univCode: string }>;
}): Promise<Metadata> {
  const { univCode } = await params;
  const school = getSchoolByCode(univCode);

  return school ? buildSchoolServiceMetadata(school, 'bookmarklet') : {};
}

export default async function Page({
  params,
}: {
  params: Promise<{ univCode: string }>;
}) {
  const { univCode } = await params;
  const school = getSchoolByCode(univCode);

  if (!school) {
    notFound();
  }

  return (
    <>
      <SyncCurrentSchool school={school} />
      <TitleComponent marginBottom={false}>Bookmarklet</TitleComponent>
      <SubtitleComponent>
        借助小书签插件，您可以在收藏栏中快速访问 Web VPN 内网地址。
      </SubtitleComponent>
      <SchoolStatus school={school} service="bookmarklet" />
      <BookmarkletClient school={school} />
    </>
  );
}
