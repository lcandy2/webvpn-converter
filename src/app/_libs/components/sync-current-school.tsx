'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import type { School } from '@/app/_libs/types';

export default function SyncCurrentSchool({ school }: { school: School }) {
  const setSelectedSchool = useSetAtom(selectedSchoolAtom);

  useEffect(() => {
    setSelectedSchool(school);
  }, [school, setSelectedSchool]);

  return null;
}
