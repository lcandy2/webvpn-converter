import '@/../package.json';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSchoolByCookieValue, getSchoolRoute } from '@/app/_libs/schools';
import { noIndexMetadata } from '@/app/_libs/seo';

export const metadata: Metadata = {
  title: '还原链接',
  ...noIndexMetadata,
};

export default async function Home() {
  const cookieStore = await cookies();
  const selectedSchool = getSchoolByCookieValue(
    cookieStore.get('selectedSchool')?.value,
    cookieStore.get('customSchool')?.value,
  );

  if (!selectedSchool) {
    redirect('/settings/setup');
  }

  redirect(getSchoolRoute(selectedSchool, 'decrypt'));
}
