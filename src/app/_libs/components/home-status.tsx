'use client';

import { SubtitleComponent } from '@/app/_libs/components/title';
import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { Skeleton } from '@mui/material';
import MdIconButton from '@/app/_libs/ui/icon-button';
import Link from 'next/link';

export default function HomeStatus() {
  const selectedSchool = useAtomValue(selectedSchoolAtom);
  const subtitleText =
    selectedSchool && `${selectedSchool.name} (${selectedSchool.host})`;
  return (
    <>
      <SubtitleComponent>
        {subtitleText ? (
          <>
            {subtitleText}
            <Link href="/settings/setup">
              <MdIconButton icon={'edit'} />
            </Link>
          </>
        ) : (
          <Skeleton variant="rounded" height={40} />
        )}
      </SubtitleComponent>
    </>
  );
}
