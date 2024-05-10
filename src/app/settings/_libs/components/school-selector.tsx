'use client';

import {
  buildSchoolList,
  schoolListGroupby,
  schoolListIsOptionEqualToValue,
  schoolListLabel,
  schoolListMatcher,
  schoolListSorter,
} from '@/app/settings/_libs/hooks/school-select';
import webvpnData from '~/data/webvpn.json';
import type { AutocompleteRenderInputParams } from '@mui/material';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '@material/web/checkbox/checkbox.js';
import { useAtom } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { School } from '@/app/_libs/types';

export default async function SchoolSelector() {
  const schoolData = buildSchoolList(webvpnData);
  const [selectedSchool, setSelectedSchool] = useAtom(selectedSchoolAtom);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isSelectorReady =
    (hasMounted || selectedSchool) && schoolData.length > 0;

  const handleSchoolChange = useCallback(
    (_: React.SyntheticEvent, newValue: School | null) => {
      setSelectedSchool(newValue);
    },
    [setSelectedSchool],
  );

  const handleOptions = useMemo(() => {
    const sortedSchoolData = [...schoolData].sort(schoolListSorter);
    if (!selectedSchool) {
      return sortedSchoolData;
    }
    const isSelectedSchoolInData = sortedSchoolData.find((school) =>
      schoolListIsOptionEqualToValue(school, selectedSchool),
    );
    if (!isSelectedSchoolInData && selectedSchool) {
      sortedSchoolData.unshift(selectedSchool);
    }
    return sortedSchoolData;
  }, [schoolData, selectedSchool]);

  return (
    <>
      <Autocomplete
        options={handleOptions}
        filterOptions={(options, { inputValue }) =>
          options.filter((option) => schoolListMatcher(option, inputValue))
        }
        getOptionLabel={schoolListLabel}
        groupBy={schoolListGroupby}
        renderInput={(params) =>
          schoolListRenderInput({ params, loading: !isSelectorReady })
        }
        value={selectedSchool}
        isOptionEqualToValue={schoolListIsOptionEqualToValue}
        onChange={handleSchoolChange}
        loading={!isSelectorReady}
        openOnFocus
        autoSelect
        blurOnSelect="mouse"
        disableCloseOnSelect
        className="pt-6"
      />
    </>
  );
}

const schoolListRenderInput = ({
  params,
  loading,
}: {
  params: AutocompleteRenderInputParams;
  loading?: boolean;
}) => {
  return (
    // <div ref={params.InputProps.ref}>
    //   <MdOutlinedTextField {...params.inputProps} label="选择学校" />
    // </div>
    <TextField
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
    />
  );
};
