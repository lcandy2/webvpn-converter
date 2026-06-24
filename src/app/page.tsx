import '@/../package.json';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSchoolByCookieValue, getSchoolRoute } from '@/app/_libs/schools';

export default async function Home() {
  const cookieStore = await cookies();
  const selectedSchool = getSchoolByCookieValue(
    cookieStore.get('selectedSchool')?.value,
    cookieStore.get('customSchool')?.value,
  );

  if (!selectedSchool) {
    redirect('/settings/setup');
  }

  redirect(getSchoolRoute(selectedSchool, 'encrypt'));
}
