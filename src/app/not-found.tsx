import Title from '@/app/_libs/components/title';
import MdFab from '@/app/_libs/ui/floating-action-buttons';
import MdIcon from '@/app/_libs/ui/icon';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Title title="404 Not Found" subtitle="页面无法找到" />
      <Link href={'/'}>
        <MdFab
          label="返回首页"
          className="w-[100%] sm:w-36 mb-8 sm:mr-8 sm:mb-0"
        >
          <MdIcon slot="icon">home</MdIcon>
        </MdFab>
      </Link>
    </>
  );
}
