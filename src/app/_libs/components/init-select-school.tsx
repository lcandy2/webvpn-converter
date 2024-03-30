'use client';

import { useAtomValue, useSetAtom } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import {
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
      // console.log(selectedSchool);
      if (!selectedSchool) {
        /** Support for old version config
         *  for testing: localStorage.setItem('selectedSchool',{"province":"","name":"","url":"","key":"","iv":""})
         */
        const oldSchool = JSON.parse(
          localStorage.getItem('selectedSchool')?.toString() || '{}',
        );
        if (
          Object.prototype.hasOwnProperty.call(oldSchool, 'url') ||
          Object.prototype.hasOwnProperty.call(oldSchool, 'key') ||
          Object.prototype.hasOwnProperty.call(oldSchool, 'iv')
        ) {
          localStorage.setItem(
            'selectedSchool',
            JSON.stringify({
              province: oldSchool.province,
              name: oldSchool.name,
              host: oldSchool.url,
              crypto_key: oldSchool.key,
              crypto_iv: oldSchool.iv,
            }),
          );
          console.log(oldSchool);
        } else {
          redirect('/settings/setup');
        }
      }
    }
  }, [hasMounted, selectedSchool]);

  const handleComponentVisible = !hasMounted || selectedSchool;

  return (
    <>
      {!selectedSchool && hasMounted && (
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
      )}
    </>
  );
}
