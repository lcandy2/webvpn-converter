import type { Metadata } from 'next';
import { TitleComponent } from '@/app/_libs/components/title';
import SettingsUI from './_libs/ui/settings-ui';
import GoBackButton from './_libs/components/go-back-button';

export const metadata: Metadata = {
  title: '设置',
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <TitleComponent marginBottom={false}>
        设置
        <GoBackButton />
      </TitleComponent>
      <SettingsUI type={'page'} mode={'settings'} />
    </div>
  );
}
