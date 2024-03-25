'use client';

import MdFab from '@/app/_libs/ui/floating-action-buttons';
import MdIcon from '@/app/_libs/ui/icon';
import MdButton from '@/app/_libs/ui/button';
import { useAtom } from 'jotai';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SchoolAction() {
  const [selectedSchool] = useAtom(selectedSchoolAtom);
  const [isSchoolSelected, setIsSchoolSelected] = useState(false);

  useEffect(() => {
    if (!selectedSchool) {
      setIsSchoolSelected(false);
    } else {
      setIsSchoolSelected(true);
    }
  }, [selectedSchool]);

  return (
    <>
      {isSchoolSelected && (
        <Link href="/">
          <MdFab label="确认" className="w-[100%] sm:w-36 mb-8 sm:mr-8 sm:mb-0">
            <MdIcon slot="icon">done</MdIcon>
          </MdFab>
        </Link>
      )}
      <MdButton variant="text" className="w-[100%] sm:w-auto">
        列表上没有我的学校？
      </MdButton>
    </>
  );
}
