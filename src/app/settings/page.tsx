import type { Metadata } from 'next';
import Title from '@/app/_libs/components/title';
import SettingsUI from './_libs/ui/settings-ui';

export const metadata: Metadata = {
  title: '设置',
};

export default function Page() {
  return (
    <div className="flex flex-col">
      <Title title={'设置'} />
      <SettingsUI type={'page'} mode={'settings'} />
    </div>
  );
}
