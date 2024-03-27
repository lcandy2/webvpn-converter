'use client';

import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Title from '@/app/_libs/components/title';

export default function InitSelectSchool() {
  const selectedSchool = useAtomValue(selectedSchoolAtom);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      console.log(selectedSchool);
      if (!selectedSchool) {
        redirect('/settings/setup');
      }
    }
  }, [hasMounted, selectedSchool]);

  if (!hasMounted || selectedSchool) {
    return null;
  }

  return (
    <>
      {!selectedSchool && (
        <div className="flex flex-col">
          <Title title={'欢迎使用'} subtitle={'请选择学校以继续。'} />
          <p className="mb-96">
            页面将会自动跳转，如果没有跳转，请点击
            <Link href="/settings/setup" className="text-blue-600">
              这里
            </Link>
            。
          </p>
        </div>
      )}
    </>
  );
}
