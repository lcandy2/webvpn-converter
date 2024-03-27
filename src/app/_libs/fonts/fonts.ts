import { Inter, Lusitana, Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import localFont from 'next/font/local';

// export const lustiana = Lusitana({
//   weight: ['400', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-lustiana',
// });
//
// export const notoSerifSC = Noto_Serif_SC({
//   weight: ['400', '500', '600', '700'],
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-noto-serif-sc',
// });

export const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const notoSansSC = Noto_Sans_SC({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// export const lxgwNeoZhiSong = localFont({
//   src: [
//     { path: '/fonts/LXGWNeoZhiSong.woff2', weight: '400', style: 'normal' },
//   ],
//   variable: '--font-lxgw-neo-zhi-song',
// });

export const lxgwNeoZhiSong = localFont({
  src: './LXGWNeoZhiSong.woff2',
  display: 'swap',
  variable: '--font-lxgw-neo-zhi-song',
});
