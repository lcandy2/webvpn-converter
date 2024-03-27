'use client';

import { SubtitleComponent } from '@/app/_libs/components/title';
import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { CircularProgress, Skeleton } from '@mui/material';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useEffect, useState } from 'react';

export default function HomeStatus() {
  const selectedSchool = useAtomValue(selectedSchoolAtom);
  const subtitleText =
    selectedSchool && `${selectedSchool.name} (${selectedSchool.host})`;
  const [editButtonClicked, setEditButtonClicked] = useState(false);

  const handleEditButtonClicked = useCallback(() => {
    setEditButtonClicked(true);
  }, [setEditButtonClicked]);

  useEffect(() => {
    setEditButtonClicked(false);
  }, []);

  return (
    <>
      <SubtitleComponent>
        {subtitleText ? (
          <>
            {subtitleText}
            <Link href="/settings/setup" onClick={handleEditButtonClicked}>
              <MdIconButton>
                {editButtonClicked ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <EditIcon />
                )}
              </MdIconButton>
            </Link>
          </>
        ) : (
          <Skeleton variant="rounded" height={40} />
        )}
      </SubtitleComponent>
    </>
  );
}
