import type { School } from '@/app/_libs/types';
export { buildSchoolList } from '@/app/_libs/schools';

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
  const normalizedCode = option.code.trim().toLowerCase();
  const normalizedName = option.name.trim().toLowerCase();
  const normalizedHost = option.host.trim().toLowerCase();
  const normalizedProvince = option.province?.trim().toLowerCase();
  return (
    normalizedCode.includes(normalizedValue) ||
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
    return `${name} /${option.code} (${host})`;
  } else {
    return `${name} /${option.code}`;
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
  return option.code === value.code || option.host === value.host;
};
