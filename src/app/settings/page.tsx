import type { Metadata } from 'next';
import { TitleComponent } from '@/app/_libs/components/title';
import SettingsUI from './_libs/ui/settings-ui';
import GoBackButton from './_libs/components/go-back-button';
import type { SchoolService } from '@/app/_libs/types';
import { noIndexMetadata } from '@/app/_libs/seo';

export const metadata: Metadata = {
  title: '设置',
  ...noIndexMetadata,
};

const getServiceParam = (value?: string | string[]): SchoolService => {
  const service = Array.isArray(value) ? value[0] : value;
  return service === 'decrypt' || service === 'bookmarklet'
    ? service
    : 'encrypt';
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const { service } = await searchParams;

  return (
    <div className="flex flex-col">
      <TitleComponent marginBottom={false}>
        设置
        <GoBackButton />
      </TitleComponent>
      <SettingsUI
        type={'page'}
        mode={'settings'}
        service={getServiceParam(service)}
      />
    </div>
  );
}
