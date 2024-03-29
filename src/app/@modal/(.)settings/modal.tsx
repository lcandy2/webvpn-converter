'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { Dialog, DialogActions } from '@mui/material';
import { MdTextButton } from '@/app/_libs/ui/button';

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
    setOpen(false);
    handleClose();
  }, [setOpen, handleClose]);

  return createPortal(
    <Dialog onClose={handleClose} open={open} className="rounded-shape-xl">
      {children}
      <DialogActions className="p-6 pt-4">
        <MdTextButton onClick={handleDoneButtonClick}>确认</MdTextButton>
      </DialogActions>
    </Dialog>,
    document.getElementById('modal-root')!,
  );
}
