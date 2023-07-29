import React, { useState, useEffect } from 'react';
import { Box, alpha } from '@mui/system';
import { Container, Typography, Grid } from '@mui/material';
import SchoolSelector from '../components/SchoolSelector';
import UrlConverter from '../components/UrlConverter';

const IndexPage = () => {
  const [selected, setSelected] = useState(null);

  useEffect(() => { }, [selected]);

  return (
    <Container maxWidth="md" sx={{ overflow: 'hidden', flexGrow: 1 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Web VPN <Box sx={{ whiteSpace: 'nowrap' }}>网址转换工具</Box>
      </Typography>
      <Typography variant="body1" gutterBottom>
        轻松访问校内网络资源，无需繁琐设置，只需粘贴链接，常规网址即刻转化为您学校的 Web VPN 网址。
      </Typography>
      <Box
        my={6}
        p={1}
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          height: "100%",
          position: 'relative',
          zIndex: 1,
          '::after': {
            content: '""',
            position: 'absolute',
            top: '-24px',
            left: '-24px',
            right: '-24px',
            bottom: '-100vh',
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
    </Container>
  );
};

export default IndexPage;