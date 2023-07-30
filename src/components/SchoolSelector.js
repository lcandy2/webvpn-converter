import { useState, useEffect } from 'react';
import { Autocomplete, FormControl, TextField, CircularProgress, Box, Dialog, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import WebVPNDetails from './WebVPNDetails';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const CUSTOM_SCHOOL_NAME = '自定义';

const SchoolSelector = ({ selectedSchool, setSelectedSchool }) => {

  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  // const [selectedSchool, setSelectedSchool] = useState(null);
  const [revertSelectedSchool, setRevertSelectedSchool] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customSchool, setCustomSchool] = useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    getCustomSchool(setCustomSchool)
  }, []);

  const handleSchoolChange = (event, newValue) => {
    if (newValue && newValue.name === customSchool.name) {
      setSelectedSchool(newValue);
      if (!newValue.url) setDialogOpen(true);
    } else {
      setRevertSelectedSchool(newValue);
      setSelectedSchool(newValue);
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('selectedSchool', JSON.stringify(newValue));
    }

  };

  const handleSchoolChangeSubmit = () => {
    setSelectedSchool(getCustomSchool(setCustomSchool));
  }

  const closeDialog = () => {
    setDialogOpen(false);
    if (!selectedSchool.url) {
      setSelectedSchool(revertSelectedSchool);
    }
  };

  useEffect(() => {
    setLoading(true);
    const host = window.location.host;
    let url = '/api/data';
    if (host === 'wpn.pages.dev') url = '//wrdvpn.vercel.app' + url;
    axios.get(url)
      .then(res => {
        if (res.data.status === 'failed') {
          console.error('Server error:', res.data.message);
        } else {
          setSchools(buildSchoolList(res.data.data));

          if (typeof window !== 'undefined') {
            const storedSchool = window.localStorage.getItem('selectedSchool');
            if (storedSchool) {
              setSelectedSchool(JSON.parse(storedSchool));
            }
          }

          setLoading(false);
        }
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setLoading(false);
      });
  }, []);

  const schoolSorter = (a, b) => {
    if (a.province === undefined) return -1;  // 如果a没有province属性，将a放在b后面
    return -a.province.localeCompare(a.province);  // 如果都有province属性，按字母顺序排序
  };
  const schoolMatcher = (option, value) => option.name.includes(value) || option.url.includes(value);

  return (
    <Box>
      <FormControl fullWidth>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs>
            <Autocomplete
              options={[customSchool, ...schools].sort(schoolSorter)}
              filterOptions={(options, { inputValue }) => options.filter((option) => schoolMatcher(option, inputValue))}
              getOptionLabel={(option) => option.url ? `${option.name} (${option.url})` : option.name}
              groupBy={(option) => option.province}
              renderInput={(params) => renderInputField(params, loading)}
              value={selectedSchool}
              isOptionEqualToValue={(option, value) => option.url === value.url}
              onChange={handleSchoolChange}
              loading={loading}
            />
          </Grid>
          {selectedSchool && (
            <Grid item>
              <IconButton onClick={() => setDialogOpen(true)}>
                <EditIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </FormControl>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm">
        {selectedSchool && <WebVPNDetails
          data={selectedSchool}
          closeDialog={closeDialog}
          handleCustomSchoolSubmit={handleSchoolChangeSubmit} />}
      </Dialog>
    </Box>
  );
};

export default SchoolSelector;

const buildSchoolList = (data) => {
  const items = [];
  for (const province in data) {
    for (const school in data[province]) {
      items.push({
        province: province || "未知省份",  // 如果省份未知，设为 "未知"
        name: school,
        url: data[province][school]['host'],
        key: data[province][school]['crypt_key'],
        iv: data[province][school]['crypt_iv']
      });
    }
  }
  return items;
}

const renderInputField = (params, loading) => (<TextField
  {...params}
  label="选择学校"
  InputProps={{
    ...params.InputProps,
    endAdornment: (
      <>
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
        {params.InputProps.endAdornment}
      </>
    ),
  }}
/>);

const getCustomSchool = (setCustomSchool) => {
  const storedCustomSchool = localStorage.getItem('customSchool');
  let cSchool;
  if (storedCustomSchool) {
    cSchool = JSON.parse(storedCustomSchool);
    if (!cSchool.name) {
      cSchool.name = CUSTOM_SCHOOL_NAME;
    }
  } else {
    cSchool = {
      name: CUSTOM_SCHOOL_NAME,
      url: '',
      key: '',
      iv: '',
    };
  }
  setCustomSchool(cSchool);
  return cSchool;
}