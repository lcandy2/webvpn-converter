import SchoolSelector from '@/app/setup/_libs/components/school-selector';
import MdFab from '@/app/_libs/ui/floating-action-buttons';
import MdIcon from '@/app/_libs/ui/icon';
import type { Metadata } from 'next';
import MdButton from '@/app/_libs/ui/button';
import SchoolAction from '@/app/setup/_libs/components/school-action';
import Title from '@/app/_libs/components/title';

export const metadata: Metadata = {
  title: '选择学校',
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <Title
        title={'选择学校'}
        subtitle={'欢迎使用，你需要配置学校信息以继续。'}
      />
      <SchoolSelector />
      <div className="flex flex-row my-14 flex-wrap">
        <SchoolAction />
      </div>
    </div>
  );
}
