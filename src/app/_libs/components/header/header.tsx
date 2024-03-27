import Link from 'next/link';
import HeaderTitleText from '@/app/_libs/components/header/header-title-text';
import {
  HeaderActionGitHub,
  HeaderActionSponsor,
} from '@/app/_libs/components/header/header-actions';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="mx-4 my-3 min-h-12 h-24 sm:h-12 flex flex-col sm:flex-row flex-wrap justify-between">
      <div className="order-1 sm:order-first h-12 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-start">
        <Link href="/">
          <div className="flex flex-row flex-nowrap items-center mx-4 gap-4">
            <Image
              src={'/icon.webp'}
              alt={'Web VPN Converter Icon'}
              width={48}
              height={48}
            />
            {/*<HeaderTitleText />*/}
            <h1 className="text-2xl">Web VPN Cornverter</h1>
          </div>
        </Link>
        <p className="text-inherit text-pretty mx-4">A @lcandy2 project.</p>
      </div>
      <nav className="order-3 sm:order-last my-auto flex flex-row flex-nowrap justify-end sm:items-center">
        <Link href="https://afdian.net/a/Lcandy/plan" target="_blank">
          <HeaderActionSponsor />
        </Link>
        <Link
          href="https://github.com/lcandy2/webvpn-converter"
          target="_blank"
        >
          <HeaderActionGitHub />
        </Link>
      </nav>
    </header>
  );
}
