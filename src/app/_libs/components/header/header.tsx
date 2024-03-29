import Link from 'next/link';
import {
  HeaderActionGitHub,
  HeaderActionSponsor,
} from '@/app/_libs/components/header/header-actions';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed h-header inset-x-0 bottom-auto top-0 flex flex-row items-center box-border py-3 px-4 bg-surface-container z-2">
      <nav className="w-full flex flex-row items-center text-title-l">
        <Link href="/" className="order-first">
          <div className="flex flex-row flex-nowrap items-center">
            <Image
              src={'/icon.webp'}
              alt={'Web VPN Converter Icon'}
              width={48}
              height={48}
            />
            <div className="flex flex-col px-3 ">
              <h1 className="text-primary leading-5">Web VPN Converter</h1>
              <p className="transition-all duration-md ease-md text-title-s sm:text-title-m text-secondary text-nowrap">
                A @lcandy2 project.
              </p>
            </div>
          </div>
        </Link>
        <section className="order-last grow flex flex-row justify-end">
          {/*<nav className="order-3 sm:order-last my-auto flex flex-row flex-nowrap justify-end sm:items-center">*/}
          <Link href="https://afdian.net/a/Lcandy/plan" target="_blank">
            <HeaderActionSponsor />
          </Link>
          <Link
            href="https://github.com/lcandy2/webvpn-converter"
            target="_blank"
          >
            <HeaderActionGitHub />
          </Link>
        </section>
        {/*</nav>*/}
      </nav>
    </header>
  );
}
