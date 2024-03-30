import SettingsUI from '@/app/settings/_libs/ui/settings-ui';
import { Modal } from '@/app/@modal/(.)settings/modal';
import { DialogContent, DialogTitle } from '@mui/material';

export default function Page() {
  return (
    <Modal>
      <DialogTitle className="pl-6 pt-6 text-title-l sm:text-2xl">
        设置
      </DialogTitle>
      <DialogContent className="pb-2 p-6">
        <SettingsUI mode="settings" type="modal" />
      </DialogContent>
    </Modal>
  );
}
