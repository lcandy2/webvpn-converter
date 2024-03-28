import Link from 'next/link';
import HeaderTitleText from '@/app/_libs/components/header/header-title-text';
import {
  HeaderActionGitHub,
  HeaderActionSponsor,
} from '@/app/_libs/components/header/header-actions';
import Image from 'next/image';

export default function Header() {
  return (
    // <section className="sticky top-0 mx-4 my-3 min-h-12 h-24 sm:h-12 flex flex-col sm:flex-row flex-wrap justify-between">
    // <section className="fixed inset-0 right-auto flex flex-row z-10 py-3 px-4 items-center box-border h-20">
    <header className="fixed h-header inset-x-0 bottom-auto top-0 flex flex-row items-center box-border py-3 px-4 bg-surface-container z-10">
      <nav className="w-full flex flex-row items-center text-title-l">
        {/*<div className="order-1 sm:order-first h-12 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-start">*/}
        <Link href="/" className="order-first">
          <div className="flex flex-row flex-nowrap items-center">
            <Image
              src={'/icon.webp'}
              alt={'Web VPN Converter Icon'}
              width={48}
              height={48}
            />
            <div className="flex flex-col  px-3">
              <h1 className="text-primary">Web VPN Converter</h1>
              <p className="text-title-s text-secondary">A @lcandy2 project.</p>
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
