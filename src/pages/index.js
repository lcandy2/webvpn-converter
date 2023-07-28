import React, { useState, useEffect } from 'react';
import { Box ,alpha} from '@mui/system';
import { Container, Typography } from '@mui/material';
import SchoolSelector from '../components/SchoolSelector';
import UrlConverter from '../components/UrlConverter';

const IndexPage = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => { }, [selected]);

  return (
    <Container maxWidth="md" sx={{ overflow: 'hidden' }}>
      <Box>
        <Typography variant="h2" component="h1" gutterBottom>
          Web VPN Converter
        </Typography>
        <Typography variant="body1" gutterBottom>
          Convert local network URLs into Web VPN URLs.
        </Typography>
        <Box></Box>
        <Box 
          mt={8}
          mb={8}
          component="form" 
          noValidate 
          autoComplete="off"
          sx={{
            position: 'relative',
            zIndex: 1,
            '::after': {
              content: '""',
              position: 'absolute',
              top: '-32px',
              left: '-32px',
              right: '-32px',
              bottom: '-22px',
              backgroundColor: (theme) => alpha(theme.palette.surfaceVariant.main, 0.45),
              borderRadius: '30px 30px 25px 25px',
              zIndex: -1,
            },
          }}
        >
          <SchoolSelector selectedSchool={selected} setSelectedSchool={setSelected} />
          <UrlConverter host={selected?.url || ''} />
        </Box>
      </Box>
    </Container>
  );
};

export default IndexPage;