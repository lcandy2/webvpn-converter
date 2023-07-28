// components/Navigation.js
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function Navigation() {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'inherit', boxShadow: 'none'}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Website
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Button color="primary" target="_blank" rel="noopener noreferrer">
            Sponsor
          </Button>
          <Button color="primary" href="https://github.com/lcandy2/webvpn-converter" target="_blank" rel="noopener noreferrer">
            GitHub
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
