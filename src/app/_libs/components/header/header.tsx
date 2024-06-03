import Link from 'next/link';
import Image from 'next/image';
import { MdTextButton } from '@/app/_libs/ui/button';
import { GitHub } from '@mui/icons-material';
import { HeaderActionBookmarklet } from '@/app/_libs/components/header/header-actions';
import { Badge } from '@mui/material';

export default function Header() {
  return (
    <header className="fixed h-header inset-x-0 bottom-auto top-0 flex flex-row items-center box-border py-3 px-4 bg-surface-container z-2">
      <nav className="w-full flex flex-row items-center text-title-l">
        <Link href="/" className="order-first">
          <div className="flex flex-row flex-nowrap items-center">
            <Image
              src={'/logo/logo2.png'}
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
        <section className="order-last grow flex flex-row justify-end items-center">
          <Link href="/bookmarklet" prefetch={true}>
            <Badge badgeContent="New" color="primary">
              <HeaderActionBookmarklet />
            </Badge>
          </Link>
          {/*<Link href="https://afdian.net/a/Lcandy/plan" target="_blank">*/}
          <Link href="/donate" prefetch={true}>
            <Badge
              badgeContent={process.env.CV_EMAIL && '内推请求'}
              color="secondary"
            >
              <MdTextButton className="h-12">支持与捐赠</MdTextButton>
            </Badge>
          </Link>
          <Link
            href="https://github.com/lcandy2/webvpn-converter"
            target="_blank"
          >
            <MdTextButton title="GitHub" className="h-12 w-12">
              <GitHub titleAccess="GitHub" />
            </MdTextButton>
          </Link>
        </section>
        {/*</nav>*/}
      </nav>
    </header>
  );
}
