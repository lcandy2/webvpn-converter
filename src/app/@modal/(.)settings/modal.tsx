'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Dialog, DialogActions } from '@mui/material';
import { MdTextButton } from '@/app/_libs/ui/button';
import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { getSchoolByHost, getSchoolRoute } from '@/app/_libs/schools';
import type { SchoolService } from '@/app/_libs/types';

export function Modal({
  children,
  service = 'encrypt',
}: {
  children: React.ReactNode;
  service?: SchoolService;
}) {
  const router = useRouter();
  const selectedSchool = useAtomValue(selectedSchoolAtom);
  const [open, setOpen] = useState(false);

  const initDialog = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  useEffect(() => {
    initDialog();
  }, [initDialog]);

  const handleClose = useCallback(() => {
    router.back();
  }, [router]);

  const handleDoneButtonClick = useCallback(() => {
    const knownSchool =
      selectedSchool?.code && selectedSchool.code !== 'custom'
        ? selectedSchool
        : selectedSchool?.host
          ? getSchoolByHost(selectedSchool.host)
          : undefined;

    setOpen(false);
    if (knownSchool) {
      router.push(getSchoolRoute(knownSchool, service));
    } else {
      handleClose();
    }
  }, [router, selectedSchool, service, setOpen, handleClose]);
  if (open) {
    return createPortal(
      <Dialog onClose={handleClose} open={open} className="rounded-shape-xl">
        {children}
        <DialogActions className="p-6 pt-4">
          <MdTextButton onClick={handleDoneButtonClick}>确认</MdTextButton>
        </DialogActions>
      </Dialog>,
      document.getElementById('modal-root')!,
    );
  } else {
    return null;
  }
}
