'use client';

import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Title, {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import { Skeleton } from '@mui/material';

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

  const handleComponentVisible = !hasMounted || selectedSchool;

  return (
    <>
      <div className="flex flex-col">
        <TitleComponent marginBottom={false}>
          {handleComponentVisible ? (
            <Skeleton variant="rounded" height={78} width={300} />
          ) : (
            '欢迎使用'
          )}
        </TitleComponent>
        <SubtitleComponent>
          {handleComponentVisible ? (
            <Skeleton variant="rounded" height={30} />
          ) : (
            '请选择学校以继续。'
          )}
        </SubtitleComponent>
        <p className="mb-96">
          {handleComponentVisible ? (
            <Skeleton variant="rounded" height={48} />
          ) : (
            <>
              页面将会自动跳转，如果没有跳转，请点击
              <Link href="/settings/setup" className="text-blue-600">
                这里
              </Link>
              。
            </>
          )}
        </p>
      </div>
    </>
  );
}
