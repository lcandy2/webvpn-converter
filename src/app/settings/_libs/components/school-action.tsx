'use client';

import MdFab from '@/app/_libs/ui/floating-action-buttons';
import MdIcon from '@/app/_libs/ui/icon';
import MdButton from '@/app/_libs/ui/button';
import { useAtom } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useCallback, useEffect, useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';
import { isSchoolNotListedAtom } from '@/app/settings/_libs/atoms';

export default function SchoolAction() {
  const [selectedSchool] = useAtom(selectedSchoolAtom);
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);
  const [isSchoolNotListed, setIsSchoolNotListed] = useAtom(
    isSchoolNotListedAtom,
  );
  const router = useRouter();

  const handleSchoolListButton = useCallback(() => {
    if (!selectedSchool) {
      setIsSchoolSelected(false);
    } else {
      setIsSchoolSelected(true);
      router.prefetch('/');
    }
  }, [selectedSchool, router]);

  useEffect(() => {
    handleSchoolListButton();
  }, [selectedSchool, handleSchoolListButton]);

  const handleConfirmButtonClick = useCallback(() => {
    sendGAEvent({ event: 'buttonClicked', value: 'school-select-confirm' });
    router.push('/');
  }, [router]);

  const handleNotListedButtonClick = useCallback(() => {
    sendGAEvent({ event: 'buttonClicked', value: 'school-select-not-listed' });
    setIsSchoolNotListed(true);
  }, [setIsSchoolNotListed]);

  return (
    <>
      {isSchoolSelected && (
        <MdFab
          label="确认"
          className="w-[100%] sm:w-36 mb-8 sm:mr-8 sm:mb-0"
          onClick={handleConfirmButtonClick}
        >
          <MdIcon slot="icon">done</MdIcon>
        </MdFab>
      )}
      {!isSchoolNotListed && (
        <MdButton
          variant="text"
          className="w-[100%] sm:w-auto"
          onClick={handleNotListedButtonClick}
        >
          列表上没有我的学校？
        </MdButton>
      )}
    </>
  );
}
