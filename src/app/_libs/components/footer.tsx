import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center text-xs font-[300] text-on-surface-variant flex flex-col sm:flex-row sm:divide-x flex-wrap gap-1 sm:gap-0 pb-8 pt-14 box-border">
      <section className="order-first flex flex-row divide-x items-start">
        <Link
          href="https://webvpn-converter-git-legacy-lcandy.vercel.app/"
          className="underline"
        >
          <p className="px-2">返回旧版</p>
        </Link>
        <Link href="/license" className="underline">
          <p className="px-2">MIT License</p>
        </Link>
        <Link href="/privacy" className="underline">
          <p className="px-2">Privacy</p>
        </Link>
      </section>
      <section className="order-last flex flex-row divide-x items-start">
        <Link href="/about" className="underline">
          <p className="px-2">About</p>
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
      </section>
    </footer>
  );
}
