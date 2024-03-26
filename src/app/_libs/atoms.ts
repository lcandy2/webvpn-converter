import type { School } from '@/app/_libs/types';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { encryptUrl } from '@/app/_libs/url-convert';

export const selectedSchoolAtom = atomWithStorage<School | null>(
  'selectedSchool',
  null,
);

export const firstTimeUseAtom = atomWithStorage<boolean>('firstTimeUse', true);

export const originalUrlAtom = atomWithReset<string>('');
// export const convertedUrlAtom = atom<string>('');
export const encryptedUrlAtom = atom<string>((get) => {
  const selectedSchool = get(selectedSchoolAtom);
  const encryptedPath = encryptUrl({
    url: get(originalUrlAtom),
    schoolHost: selectedSchool?.host,
    key: selectedSchool?.crypto_key,
    iv: selectedSchool?.crypto_iv,
  });
  return encryptedPath;
});
