'use client';

import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getSchoolByHost, getSchoolRoute } from '@/app/_libs/schools';

interface SyncLocalStorageWithCookieProps {
  withRedirect?: boolean;
}

export function SyncLocalStorageWithCookie({
  withRedirect = false,
}: SyncLocalStorageWithCookieProps) {
  const [selectedSchool] = useAtom(selectedSchoolAtom);
  const router = useRouter();
  useEffect(() => {
    if (selectedSchool?.host) {
      const knownSchool =
        selectedSchool.code && selectedSchool.code !== 'custom'
          ? selectedSchool
          : getSchoolByHost(selectedSchool.host);
      const schoolToStore = knownSchool || {
        ...selectedSchool,
        code: 'custom',
        name: selectedSchool.name || '自定义',
      };

      Cookies.set('selectedSchool', schoolToStore.code, {
        sameSite: 'lax',
        expires: 365,
      });
      if (schoolToStore.code === 'custom') {
        Cookies.set('customSchool', JSON.stringify(schoolToStore), {
          sameSite: 'lax',
          expires: 365,
        });
      } else {
        Cookies.remove('customSchool');
      }
      if (withRedirect) {
        router.replace(getSchoolRoute(schoolToStore, 'encrypt'));
      }
    } else {
      Cookies.remove('selectedSchool');
      Cookies.remove('customSchool');
    }
  }, [router, selectedSchool, withRedirect]);

  return <></>;
}
