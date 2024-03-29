'use client';

import { GitHub } from '@mui/icons-material';
import { MdTextButton } from '../../ui/button';
import { useMediaQuery, useTheme } from '@mui/material';

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

export const HeaderActionBookmarklet = () => {
  const muiTheme = useTheme();
  const smMediaQuery = useMediaQuery(muiTheme.breakpoints.up('sm'));

  return <MdTextButton>{smMediaQuery ? 'Bookmarklet' : '小书签'}</MdTextButton>;
};
