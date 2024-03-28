import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center text-xs text-on-surface-variant flex flex-row flex-wrap divide-x pb-8 pt-14 box-border">
      <Link
        href="https://webvpn-converter-git-legacy-lcandy.vercel.app/"
        className="underline"
      >
        <p className="px-2">返回旧版</p>
      </Link>
      <Link href="/license" className="underline">
        <p className="px-2">MIT License</p>
      </Link>
      <p className="px-2">
        <Link
          href="https://github.com/lcandy2"
          className="underline"
          target="_blank"
        >
          甜檸Cirtron🍋
        </Link>{' '}
        &copy; 2023 - {new Date().getFullYear()}
      </p>
      <Link href="/privacy" className="underline">
        <p className="px-2">Privacy</p>
      </Link>
    </footer>
  );
}
