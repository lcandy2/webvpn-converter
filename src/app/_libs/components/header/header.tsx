import Link from 'next/link';
import { Button } from '@mui/material-next';
import HeaderTitleText from '@/app/_libs/components/header/header-title-text';
import {
  HeaderActionGitHub,
  HeaderActionSponsor,
} from '@/app/_libs/components/header/header-actions';

export default function Header() {
  return (
    <header className="mx-4 my-3 min-h-12 h-24 sm:h-12 flex flex-col sm:flex-row flex-wrap justify-between">
      <div className="order-1 sm:order-first h-12 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-start">
        <Link href="/public">
          <HeaderTitleText />
        </Link>
        <p className="text-inherit text-pretty mx-4">A @lcandy2 project.</p>
      </div>
      <div className="order-3 sm:order-last my-auto flex flex-row flex-nowrap justify-end sm:items-center">
        <Link href="https://afdian.net/a/Lcandy/plan" target="_blank">
          {/*<Button className="h-12">捐赠</Button>*/}
          <HeaderActionSponsor />
        </Link>
        <Link
          href="https://github.com/lcandy2/webvpn-converter"
          target="_blank"
        >
          {/*<Button className="h-12">GitHub</Button>*/}
          <HeaderActionGitHub />
        </Link>
      </div>
    </header>
  );
}
