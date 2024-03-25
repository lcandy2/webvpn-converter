// Define the data structure of the school list from data source
import type { School } from '@/app/_libs/types';

interface SchoolDataStructure {
  [province: string]: {
    [schoolName: string]: {
      host: string;
      crypto_key?: string | null;
      crypto_iv?: string | null;
    };
  };
}

// Build the school list from data source
export const buildSchoolList = (data: SchoolDataStructure): School[] => {
  const schoolList: School[] = [];
  for (const province in data) {
    if (data.hasOwnProperty(province)) {
      for (const school in data[province]) {
        if (data[province].hasOwnProperty(school)) {
          schoolList.push({
            province: province || '未知省份',
            name: school,
            host: data[province][school].host,
            crypto_key: data[province][school].crypto_key || null,
            crypto_iv: data[province][school].crypto_iv || null,
          });
        }
      }
    }
  }
  return schoolList;
};

// Sort the school alphabetically by province
export const schoolListSorter = (a: School, b: School): number => {
  // If 'a' doesn't have a province, place 'a' after 'b'
  if (a.province === null || a.province === undefined) return -1;
  // If 'b' doesn't have a province, place 'a' before 'b'
  if (b.province === null || b.province === undefined) return 0;

  // If both have province properties, sort alphabetically
  return -a.province.localeCompare(a.province);
};

export const schoolListMatcher = (option: School, value: string): boolean => {
  const normalizedValue = value.trim().toLowerCase();
  const normalizedName = option.name.trim().toLowerCase();
  const normalizedHost = option.host.trim().toLowerCase();
  const normalizedProvince = option.province?.trim().toLowerCase();
  return (
    normalizedName.includes(normalizedValue) ||
    normalizedHost.includes(normalizedValue) ||
    (normalizedProvince !== undefined &&
      normalizedProvince.includes(normalizedValue))
  );
};

export const schoolListLabel = (option: School): string => {
  const host = option.host;
  const name = option.name;
  if (host) {
    return `${name} (${host})`;
  } else {
    return name;
  }
};

export const schoolListGroupby = (option: School): string => {
  const province = option.province;
  return province || '';
};

export const schoolListIsOptionEqualToValue = (
  option: School,
  value: School,
): boolean => {
  return option.host === value.host;
};

export const handleSchoolChange = (
  event: React.ChangeEvent<{}>,
  newValue: School | null,
  setVirable: React.Dispatch<React.SetStateAction<School | null>>,
) => {
  setVirable(newValue);
};
