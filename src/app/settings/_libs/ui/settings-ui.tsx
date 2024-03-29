import SchoolSelector from '@/app/settings/_libs/components/school-selector';
import SchoolCustomization from '@/app/settings/_libs/components/school-customization';
import SchoolAction from '@/app/settings/_libs/components/school-action';
import { SettingsConfig } from '@/app/_libs/types';

export default function SettingsUI({ mode = 'settings' }: SettingsConfig) {
  return (
    <div className="flex flex-col gap-6">
      <SchoolSelector />
      <SchoolCustomization />
      <SchoolAction />
    </div>
  );
}
