import { useState, useEffect } from 'react';
import { Autocomplete, FormControl, TextField, CircularProgress, Box, Dialog, IconButton, Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
import WebVPNDetails from './WebVPNDetails';

const CUSTOM_SCHOOL_NAME = '自定义';

const SchoolSelector = ({ selectedSchool, setSelectedSchool }) => {

  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  // const [selectedSchool, setSelectedSchool] = useState(null);
  const [revertSelectedSchool, setRevertSelectedSchool] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [customSchool, setCustomSchool] = useState([]);

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
    axios.get('/api/data')
      .then(res => {
        setSchools(buildSchoolList(res.data));

        if (typeof window !== 'undefined') {
          const storedSchool = window.localStorage.getItem('selectedSchool');
          if (storedSchool) {
            setSelectedSchool(JSON.parse(storedSchool));
          }
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        setLoading(false);
      });
  }, []);

  const schoolSorter = (a, b) => -a.province.localeCompare(a.province);
  const schoolMatcher = (option, value) => option.name.includes(value) || option.url.includes(value);

  return (
    <Box>
      <FormControl fullWidth>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={selectedSchool ? 11 : 12}>
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
            <Grid item xs={1}>
              <IconButton onClick={() => setDialogOpen(true)}>
                <SettingsIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </FormControl>

      <Dialog open={dialogOpen} onClose={closeDialog} aria-labelledby="form-dialog-title">
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
        province: province,
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
      <div>
        {loading ? <CircularProgress color="inherit" size={20} /> : null}
        {params.InputProps.endAdornment}
      </div>
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