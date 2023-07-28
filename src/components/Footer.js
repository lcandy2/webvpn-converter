// components/Footer.js
import React from 'react';
import { Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Container maxWidth="md" sx={{ py: 3, backgroundColor: 'surfaceVariant.main', color: 'onSurfaceVariant.main', textAlign: 'center' }}>
        <Typography variant="body2">Created with love at HUNAU<br /><Link href="https://github.com/lcandy2" underline="hover" color="primary">seril🍋</Link> © 2023</Typography>
    </Container >
  );
};

export default Footer;
