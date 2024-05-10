'use client';

import { SubtitleComponent } from '@/app/_libs/components/title';
import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import {
  CircularProgress,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function HomeStatus() {
  const selectedSchool = useAtomValue(selectedSchoolAtom);
  const subtitleText =
    selectedSchool && `${selectedSchool.name} (${selectedSchool.host})`;
  const [editButtonClicked, setEditButtonClicked] = useState(false);

  const pathname = usePathname();

  const handleEditButtonClicked = useCallback(() => {
    setEditButtonClicked(true);
  }, [setEditButtonClicked]);

  const handleInit = useCallback(() => {
    setEditButtonClicked(false);
  }, [setEditButtonClicked]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  const handleInitialEditButtonClicked = useCallback(() => {
    if (!pathname.includes('settings')) {
      setEditButtonClicked(false);
    }
  }, [pathname, setEditButtonClicked]);

  useEffect(() => {
    handleInitialEditButtonClicked();
  }, [pathname, handleInitialEditButtonClicked]);

  const muiTheme = useTheme();
  const smMediaQuery = useMediaQuery(muiTheme.breakpoints.up('sm'));

  const settingsHref = useMemo(() => {
    return smMediaQuery ? '/settings' : '/settings/fullscreen';
  }, [smMediaQuery]);

  return (
    <>
      <SubtitleComponent>
        {subtitleText ? (
          <>
            {subtitleText}
            <Link
              href={settingsHref}
              onClick={handleEditButtonClicked}
              prefetch={true}
            >
              <MdIconButton title="编辑">
                {editButtonClicked ? (
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  <EditIcon titleAccess="编辑" />
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
