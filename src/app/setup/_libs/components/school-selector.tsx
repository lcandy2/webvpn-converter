'use client';

import {
  buildSchoolList,
  schoolListGroupby,
  schoolListIsOptionEqualToValue,
  schoolListLabel,
  schoolListMatcher,
  schoolListSorter,
} from '@/app/setup/_libs/hooks/school-select';
import webvpnData from '@/data/webvpn.json';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import '@material/web/checkbox/checkbox.js';
import { useAtom } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { School } from '@/app/_libs/types';

export default function SchoolSelector() {
  const schoolData = buildSchoolList(webvpnData);
  const [selectedSchool, setSelectedSchool] = useAtom(selectedSchoolAtom);

  const handleSchoolChange = (
    event: React.SyntheticEvent,
    newValue: School | null,
  ) => {
    setSelectedSchool(newValue);
  };

  return (
    <>
      <Autocomplete
        options={[...schoolData].sort(schoolListSorter)}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) => schoolListMatcher(option, inputValue))
        }
        getOptionLabel={schoolListLabel}
        groupBy={schoolListGroupby}
        renderInput={schoolListRenderInput}
        value={selectedSchool}
        isOptionEqualToValue={schoolListIsOptionEqualToValue}
        onChange={handleSchoolChange}
      />
    </>
  );
}

const schoolListRenderInput = (params: AutocompleteRenderInputParams) => {
  return (
    // <div ref={params.InputProps.ref}>
    //   <MdOutlinedTextField {...params.inputProps} label="选择学校" />
    // </div>
    <TextField
      {...params}
      label="选择学校"
      InputProps={{
        ...params.InputProps,
        endAdornment: <>{params.InputProps.endAdornment}</>,
      }}
    />
  );
};
