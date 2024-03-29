import Title from '@/app/_libs/components/title';
import MdFab from '@/app/_libs/ui/floating-action-buttons';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
};

export default function NotFound() {
  return (
    <>
      <Title title="404 Not Found" subtitle="页面无法找到" />
      <Link href={'/'}>
        <MdFab
          label="返回首页"
          className="w-[100%] sm:w-36 mb-8 sm:mr-8 sm:mb-0"
        >
          {/*<MdIcon slot="icon">home</MdIcon>*/}
          <HomeIcon />
        </MdFab>
      </Link>
    </>
  );
}
