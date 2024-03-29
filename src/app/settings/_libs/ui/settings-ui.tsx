import SchoolSelector from '@/app/settings/_libs/components/school-selector';
import SchoolCustomization from '@/app/settings/_libs/components/school-customization';
import SchoolAction from '@/app/settings/_libs/components/school-action';
import { SettingsConfig } from '@/app/_libs/types';
import JumpToFullscreen from '@/app/settings/_libs/components/jump-to-fullscreen';

export default function SettingsUI({
  mode = 'settings',
  type = 'page',
}: SettingsConfig) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {type === 'modal' && <JumpToFullscreen />}
      <SchoolSelector />
      <SchoolCustomization mode={mode} type={type} />
      {type === 'page' && <SchoolAction mode={mode} type={type} />}
    </div>
  );
}
