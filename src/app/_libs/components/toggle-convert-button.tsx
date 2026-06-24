import Link from 'next/link';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import type { UrlConvertMode } from '@/app/_libs/types';
import { getSchoolCodeRoute } from '@/app/_libs/schools';

export default function ToggleConvertButton({
  mode = 'encrypt',
  schoolCode,
}: {
  mode?: UrlConvertMode;
  schoolCode: string;
}) {
  const isDecrypt = mode === 'decrypt';
  const href = getSchoolCodeRoute(
    schoolCode,
    isDecrypt ? 'encrypt' : 'decrypt',
  );

  return (
    <Link href={href} className="inline-flex" prefetch={true}>
      <span className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors">
        <SwapHorizIcon />
        {!isDecrypt ? '还原' : '转换'}
      </span>
    </Link>
  );
}
