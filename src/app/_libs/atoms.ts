import type { School } from '@/app/_libs/types';
import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';

export const selectedSchoolAtom = atomWithStorage<School | null>(
  'selectedSchool',
  null,
);

export const firstTimeUseAtom = atomWithStorage<boolean>('firstTimeUse', true);

export const originalUrlAtom = atom<string | null>(null);
export const convertedUrlAtom = atom<string | null>(null);
