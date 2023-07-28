// components/Navigation.js
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();
  return (
    <AppBar position="static" sx={{ backgroundColor: 'background.default', boxShadow: 'none' }}>
      <Toolbar>

        <Typography color="primary" variant="h6" component="div" noWrap sx={{ flexGrow: 1 }}>
          {router.pathname !== '/' && (<Link href="/" underline="none" >WebVPN 网址转换</Link>)}
        </Typography>

        <Box sx={{ display: 'flex' }}>
          <Button color="primary" target="_blank" rel="noopener noreferrer">
            赞助
          </Button>
          <Button color="primary" href="https://github.com/lcandy2/webvpn-converter" target="_blank" rel="noopener noreferrer">
            GitHub
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
