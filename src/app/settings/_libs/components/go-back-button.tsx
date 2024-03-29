'use client';

import { CircularProgress } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdTextButton } from '@/app/_libs/ui/button';
import ReplyIcon from '@mui/icons-material/Reply';
import { useRouter } from 'next/navigation';

export default function GoBackButton() {
  const [buttonClicked, setButtonClicked] = useState(false);
  const router = useRouter();

  const loading = useMemo(() => buttonClicked, [buttonClicked]);

  const handleButtonClicked = useCallback(() => {
    setButtonClicked(true);
    router.back();
  }, [setButtonClicked]);

  const handleInit = useCallback(() => {
    setButtonClicked(false);
  }, [setButtonClicked]);

  useEffect(() => {
    handleInit();
  }, [handleInit]);

  return (
    <span onClick={handleButtonClicked} className="inline-flex">
      <MdTextButton disabled={loading}>
        {loading ? (
          <CircularProgress color="inherit" size={20} className="mx-2" />
        ) : (
          <>
            <ReplyIcon />
            储存并返回
          </>
        )}
      </MdTextButton>
    </span>
  );
}
