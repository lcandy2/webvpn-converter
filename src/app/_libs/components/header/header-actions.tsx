import { MdTextButton } from '@/app/_libs/ui/button';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import Image from 'next/image';
import { GitHub } from '@mui/icons-material';

export const HeaderActionGitHub = () => {
  // return <MdTextButton className="h-12">GitHub</MdTextButton>;
  return (
    <MdTextButton className="h-12 w-12">
      <GitHub />
    </MdTextButton>
  );
};

export const HeaderActionSponsor = () => {
  return <MdTextButton className="h-12">捐赠</MdTextButton>;
};
