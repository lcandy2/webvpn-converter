import { Suspense } from 'react';
import { TitleComponent } from '@/app/_libs/components/title';
import UrlConverter from '@/app/_libs/components/url-converter/url-converter';
import SchoolStatus from '@/app/_libs/components/school-status';
import SyncCurrentSchool from '@/app/_libs/components/sync-current-school';
import ToggleConvertButton from '@/app/_libs/components/toggle-convert-button';
import type { School, UrlConvertMode } from '@/app/_libs/types';

export default function SchoolConverterPage({
  school,
  mode = 'encrypt',
}: {
  school: School;
  mode?: UrlConvertMode;
}) {
  const isDecryptMode = mode === 'decrypt';

  return (
    <>
      <SyncCurrentSchool school={school} />
      <TitleComponent marginBottom={false}>
        {isDecryptMode ? '还原' : '转换'}
        <ToggleConvertButton mode={mode} schoolCode={school.code} />
      </TitleComponent>
      <SchoolStatus school={school} service={mode} />
      <Suspense fallback={null}>
        <UrlConverter school={school} mode={mode} />
      </Suspense>
    </>
  );
}
