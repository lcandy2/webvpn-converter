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
export const encryptedUrlAtom = atom<string>((get) =>
  encryptUrl({ url: get(originalUrlAtom) }),
);
