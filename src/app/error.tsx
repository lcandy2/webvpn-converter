'use client';

import { useCallback } from 'react';
import Title from '@/app/_libs/components/title';
import Link from 'next/link';
import MdFab from '@/app/_libs/ui/floating-action-buttons';
import HomeIcon from '@mui/icons-material/Home';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleCleanButtonClick = useCallback(() => {
    localStorage.clear();
    router.refresh();
    reset();
  }, [reset]);

  return (
    <div>
      <Title title="Error" subtitle={`错误：${error}`} />
      <MdFab
        label="清除数据（推荐）"
        className="w-[100%] sm:w-36 mb-8 sm:mr-8 sm:mb-0"
        onClick={handleCleanButtonClick}
      >
        <span slot="icon">
          <CleaningServicesIcon />
        </span>
      </MdFab>
      <Link href={'/'}>
        <MdFab
          label="返回首页"
          className="w-[100%] sm:w-36 mb-8 sm:mr-8 sm:mb-0"
        >
          <span slot="icon">
            <HomeIcon />
          </span>
        </MdFab>
      </Link>
    </div>
  );
}
