'use client';

import {
  buildSchoolList,
  handleSchoolChange,
  schoolListGroupby,
  schoolListIsOptionEqualToValue,
  schoolListLabel,
  schoolListMatcher,
  schoolListSorter,
} from '@/app/_libs/actions/school-select';
import webvpnData from '@/data/webvpn.json';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import '@material/web/checkbox/checkbox.js';
import { useAtom } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';

export default function SchoolSelector() {
  const schoolData = buildSchoolList(webvpnData);
  const [selectedSchool, setSelectedSchool] = useAtom(selectedSchoolAtom);

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
        onChange={(event, newValue) => {
          handleSchoolChange(event, newValue, setSelectedSchool);
        }}
      />
    </>
  );
}

const schoolListRenderInput = (params: AutocompleteRenderInputParams) => {
  return (
    // <MdTextField {...params.inputProps} label="选择学校" />
    <TextField
      {...params}
      label="选择学校"
      InputProps={{
        ...params.InputProps,
        endAdornment: <>{params.InputProps.endAdornment}</>,
      }}
    />
    // <div ref={params.InputProps.ref}>
    //   <MdTextField ref={params.InputProps.ref}
    //     {...params.inputProps}
    //     label="选择学校"
    //   />
    // <div ref={params.InputProps.ref}>
    //   <MdTextField label="选择学校" {...params.inputProps} />
    // </div>
    // <CustomMdTextField {...params.inputProps} ref={params.InputProps.ref} />
  );
};

// const CustomMdTextField = React.forwardRef<HTMLInputElement, any>((props, ref) => {
//   const inputRefCallback = (element: HTMLElement | null) => {
//     if (element) {
//       const input = element.querySelector('.input-wrapper input');
//       console.log(input)
//       if (input && ref) {
//         (ref as React.MutableRefObject<HTMLInputElement>).current = input as HTMLInputElement;
//       }
//     }
//   };
//
//   return (
//     <MdTextField {...props} ref={inputRefCallback} />
//   );
// });
