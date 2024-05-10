'use client';

import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

interface SyncLocalStorageWithCookieProps {
  withRedirect?: boolean;
}

export function SyncLocalStorageWithCookie({
  withRedirect = false,
}: SyncLocalStorageWithCookieProps) {
  const [selectedSchool] = useAtom(selectedSchoolAtom);
  const { host } = selectedSchool || {};
  useEffect(() => {
    if (host) {
      Cookies.set('selectedSchool', host);
      if (withRedirect) {
        redirect('/');
      }
    } else {
      Cookies.remove('selectedSchool');
    }
  }, [host, withRedirect]);

  return <></>;
}
