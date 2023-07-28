// components/Footer.js
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box mt={2} py={3} sx={{ backgroundColor: 'surfaceVariant.main', color: 'onSurfaceVariant.main', textAlign: 'center' }}>
      <Typography variant="body2">Created with love at HUNAU<br /><Link href="https://github.com/lcandy2" underline="hover" color="primary">seril🍋</Link> © 2023</Typography>
    </Box>
  );
};

export default Footer;
