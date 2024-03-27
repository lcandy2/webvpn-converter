'use client';

import MdFab from '@/app/_libs/ui/floating-action-buttons';
import MdIcon from '@/app/_libs/ui/icon';
import MdButton from '@/app/_libs/ui/button';
import { useAtom } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { sendGAEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';

export default function SchoolAction() {
  const [selectedSchool] = useAtom(selectedSchoolAtom);
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);
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
      <MdButton variant="text" className="w-[100%] sm:w-auto">
        列表上没有我的学校？
      </MdButton>
    </>
  );
}
