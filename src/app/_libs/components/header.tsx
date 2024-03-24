import Link from 'next/link';
import { Button } from '@mui/material-next';

export default function Header() {
  return (
    <header className="mx-4 my-3 min-h-12 h-24 sm:h-12 flex flex-col sm:flex-row flex-wrap justify-between">
      <div className="order-1 sm:order-first h-12 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-start">
        <Link href="/">
          <h1 className="text-2xl mx-4">Web VPN Cornverter</h1>
        </Link>
        <p className="text-inherit text-pretty mx-4">A @lcandy2 project.</p>
      </div>
      <div className="order-3 sm:order-last my-auto flex flex-row flex-nowrap justify-end sm:items-center">
        <Link href="https://afdian.net/a/Lcandy/plan" target="_blank">
          <Button className="h-12">捐赠</Button>
        </Link>
        <Link
          href="https://github.com/lcandy2/webvpn-converter"
          target="_blank"
        >
          <Button className="h-12">GitHub</Button>
        </Link>
      </div>
    </header>
  );
}
