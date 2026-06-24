import '@/../package.json';
import type { Metadata } from 'next';
import SchoolConverterPage from '@/app/_libs/components/school-converter-page';
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

  return school ? buildSchoolServiceMetadata(school, 'decrypt') : {};
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

  return <SchoolConverterPage school={school} mode="decrypt" />;
}
