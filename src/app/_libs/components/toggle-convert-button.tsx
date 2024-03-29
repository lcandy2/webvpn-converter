'use client';

import Link from 'next/link';
import { CircularProgress } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdTextButton } from '@/app/_libs/ui/button';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

export default function ToggleConvertButton() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [href, setHref] = useState<string | null>(null);
  const pathname = usePathname();

  const isDecrypt = useMemo(() => pathname.includes('decrypt'), [pathname]);
  const loading = useMemo(() => buttonClicked || !href, [buttonClicked, href]);

  const handleButtonClicked = useCallback(() => {
    setButtonClicked(true);
  }, [setButtonClicked]);

  const handlePathname = useCallback(() => {
    if (isDecrypt) {
      setHref('/');
    } else {
      setHref('/decrypt');
    }
  }, [isDecrypt]);

  const handleInit = useCallback(() => {
    setHref(null);
    handlePathname();
    setButtonClicked(false);
  }, [setHref, handlePathname, setButtonClicked]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  return (
    <Link
      href={(!loading || '') && (href || '')}
      onClick={handleButtonClicked}
      className="inline-flex"
    >
      <MdTextButton disabled={loading}>
        {loading ? (
          <CircularProgress color="inherit" size={20} className="mx-2" />
        ) : (
          <>
            <SwapHorizIcon />
            {!isDecrypt ? '还原' : '转换'}
          </>
        )}
      </MdTextButton>
    </Link>
  );
}
