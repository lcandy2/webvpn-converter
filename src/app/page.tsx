import InitSelectSchool from '@/app/_libs/components/init-select-school';
import { TitleComponent } from '@/app/_libs/components/title';
import UrlConverter from '@/app/_libs/components/url-converter/url-converter';
import HomeStatus from '@/app/_libs/components/home-status';
import '@/../package.json';
import { getPackageVersion } from 'next/dist/lib/get-package-version';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100%]">
      <section className="grow">
        <InitSelectSchool />
        <TitleComponent title="转换" marginBottom={false} />
        <HomeStatus />
        <UrlConverter />
      </section>
      <footer className="text-center text-xs text-gray-500 flex flex-row flex-wrap divide-x">
        <p className="px-2">MIT License</p>
        <p className="px-2">
          甜檸Cirtron🍋 &copy; 2023 - {new Date().getFullYear()}
        </p>
        <p className="px-2">Privacy</p>
      </footer>
    </div>
  );
}
