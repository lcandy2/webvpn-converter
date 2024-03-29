'use client';
import { GitHub } from '@mui/icons-material';
import { MdTextButton } from '../../ui/button';

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
