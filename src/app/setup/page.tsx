import SchoolSelector from '@/app/_libs/components/school-selector';
import MdFab from '@/app/_libs/ui/floating-action-buttons';
import MdIcon from '@/app/_libs/ui/icon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '选择学校',
};

export default function Page() {
  // @ts-ignore
  return (
    <div className="flex flex-col">
      <h1 className="my-14 text-7xl">选择学校</h1>
      <SchoolSelector />
      <div className="my-14">
        <MdFab label="确认" className="w-32">
          <MdIcon slot="icon">done</MdIcon>
        </MdFab>
      </div>
    </div>
  );
}
