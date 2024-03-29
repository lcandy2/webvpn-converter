import SchoolSelector from '@/app/settings/_libs/components/school-selector';
import type { Metadata } from 'next';
import SchoolAction from '@/app/settings/_libs/components/school-action';
import Title from '@/app/_libs/components/title';
import SchoolCustomization from '@/app/settings/_libs/components/school-customization';
import SettingsUI from './_libs/ui/settings-ui';

export const metadata: Metadata = {
  title: '设置',
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <Title title={'设置'} />
      <SettingsUI />
    </div>
  );
}
