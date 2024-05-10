import type { Metadata } from 'next';
import Title from '@/app/_libs/components/title';
import SettingsUI from '../_libs/ui/settings-ui';
import { SyncLocalStorageWithCookie } from '@/app/settings/_libs/components/sync-localstorage-with-cookie';

export const metadata: Metadata = {
  title: '选择学校',
};

export default async function Page() {
  return (
    <div className="flex flex-col">
      <SyncLocalStorageWithCookie withRedirect />
      <Title
        title={'选择学校'}
        subtitle={'欢迎使用，你需要配置学校信息以继续。'}
      />
      <SettingsUI mode={'init'} />
    </div>
  );
}
