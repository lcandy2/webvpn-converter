'use client';

import { SubtitleComponent } from '@/app/_libs/components/title';
import { useAtomValue } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';

export default function HomeStatus() {
  const selectedSchool = useAtomValue(selectedSchoolAtom);
  const subtitleText =
    selectedSchool && `${selectedSchool.name} (${selectedSchool.host})`;
  return subtitleText && <SubtitleComponent subtitle={subtitleText} />;
}
