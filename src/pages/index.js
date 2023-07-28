import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Container, Typography } from '@mui/material';
import SchoolSelector from '../components/SchoolSelector';
import UrlConverter from '../components/UrlConverter';
import { useLocalStorage } from 'react-storage-complete';

const IndexPage = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
  }, [selected]);
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Web VPN Converter
        </Typography>
        <Typography variant="body1" gutterBottom>
          Convert local network URLs into Web VPN URLs.
        </Typography>

        <Box component="form" noValidate autoComplete="off">
          <SchoolSelector selectedSchool={selected} setSelectedSchool={setSelected} />
          <UrlConverter host={selected?.url || ''}/>
        </Box>
      </Box>
    </Container>
  );
};

export default IndexPage;
