import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="text-center text-xs text-gray-500 flex flex-row flex-wrap divide-x pt-8">
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
