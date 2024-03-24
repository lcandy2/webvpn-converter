import type { School } from '@/app/_libs/types';
import { atomWithStorage } from 'jotai/utils';

export const selectedSchoolAtom = atomWithStorage<School | null>(
  'selectedSchool',
  null,
);
