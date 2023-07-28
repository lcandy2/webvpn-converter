import React, { useState, useEffect } from 'react';
import { Box, alpha } from '@mui/system';
import { Container, Typography,Grid } from '@mui/material';
import SchoolSelector from '../components/SchoolSelector';
import UrlConverter from '../components/UrlConverter';

const IndexPage = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => { }, [selected]);

  return (
    <Container maxWidth="md" sx={{ overflow: 'hidden' }}>
      <Grid>
        <Grid item>
          <Typography variant="h2" component="h1" gutterBottom>
            Web VPN Converter
          </Typography>
          <Typography variant="body1" gutterBottom>
            Convert local network URLs into Web VPN URLs.
          </Typography>
        </Grid>

        <Grid item xs>
        <Box
          mt={8}
          mb={8}
          p={1}
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            position: 'relative',
            zIndex: 1,
            '::after': {
              content: '""',
              position: 'absolute',
              top: '-24px',
              left: '-24px',
              right: '-24px',
              bottom: '-14px',
              color: 'onSecondaryContainer.main',
              backgroundColor: (theme) => alpha(theme.palette.secondaryContainer.main, 0.4),
              borderRadius: '30px 30px 25px 25px',
              zIndex: -1,
            },
          }}
        >
          <SchoolSelector selectedSchool={selected} setSelectedSchool={setSelected} />
          <UrlConverter host={selected?.url || ''} />
        </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default IndexPage;