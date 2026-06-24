import SettingsUI from '@/app/settings/_libs/ui/settings-ui';
import { Modal } from '@/app/@modal/(.)settings/modal';
import { DialogContent, DialogTitle } from '@mui/material';
import type { SchoolService } from '@/app/_libs/types';
import type { Metadata } from 'next';
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
  const schoolService = getServiceParam(service);

  return (
    <Modal service={schoolService}>
      <DialogTitle className="pl-6 pt-6 text-title-l sm:text-2xl">
        设置
      </DialogTitle>
      <DialogContent className="pb-2 p-6">
        <SettingsUI mode="settings" type="modal" service={schoolService} />
      </DialogContent>
    </Modal>
  );
}
