import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '@/app/_libs/components/header/header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { CssVarsProvider } from '@mui/material';
import MuiTheme from '@/app/_libs/mui-theme';
import { GoogleAnalytics } from '@next/third-parties/google';
import { APP_MANIFEST } from '@/app/_libs/config';
import Footer from './_libs/components/footer';
import * as Fonts from '@/app/_libs/fonts/fonts';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import WPNUmamiProvider from './_libs/umami-provider';
import { SEO_IMAGES, SITE_URL } from '@/app/_libs/seo';

const APP_NAME = APP_MANIFEST.name;
const APP_DEFAULT_TITLE = APP_MANIFEST.name;
const APP_TITLE_TEMPLATE = '%s - ' + APP_MANIFEST.name;
const APP_DESCRIPTION = APP_MANIFEST.description;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: APP_NAME,
  icons: {
    icon: '/favicon.png',
    shortcut: '/icons/192x192.png',
    apple: [
      { url: '/icons/192x192.png' },
      { url: '/icons/384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icons/512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icons/384x384.png',
    },
  },
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  keywords: [
    'nextjs',
    'webvpn',
    'react',
    'material-ui',
    'university',
    'school',
    'college',
    'converter',
    'webvpn-converter',
    'pwa',
    'progressive web app',
    'webvpn 转换器',
    '大学',
    '学校',
    '学院',
    '转换器',
    'webvpn 转换',
    'vpn',
    'web-application',
  ],
  authors: {
    name: '甜檸Citron🍋 (lcandy2)',
    url: 'https://github.com/lcandy2',
  },
  creator: '甜檸Citron🍋 (lcandy2)',
  description: APP_DESCRIPTION,
  category: 'education',
  alternates: {
    canonical: '/',
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    startupImage: ['/icons/192x192.png'],
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    type: 'website',
    siteName: APP_NAME,
    description: APP_DESCRIPTION,
    url: '/',
    locale: 'zh_CN',
    images: SEO_IMAGES,
  },
  twitter: {
    card: 'summary_large_image',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    creator: '@vanillaCirtron',
    images: [SEO_IMAGES[0].url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7ebea' },
    { media: '(prefers-color-scheme: dark)', color: '#241e1e' },
  ],
  colorScheme: 'light dark',
};
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" className={Fonts.notoSansSC.className}>
      {process.env.GAID && <GoogleAnalytics gaId={process.env.GAID} />}
      <body className={`${Fonts.inter.className} bg-surface-container`}>
        <AppRouterCacheProvider
          options={{
            key: 'css',
            prepend: true,
          }}
        >
          <CssVarsProvider theme={MuiTheme}>
            <WPNUmamiProvider>
              <section className="flex flex-col sm:mb-l">
                <div className="h-header block">
                  <Header />
                </div>
                <div className="grow flex flex-col justify-start sm:ml-xl sm:mr-l transition-all duration-md ease-md">
                  <div className="grow transition-all duration-md ease-md box-border overflow-auto w-full h-content-sm sm:h-content bg-surface sm:rounded-shape-xl rounded-t-shape-xl">
                    <div className="pt-xl scrollbar-track-primary scrollbar-thin overflow-y-auto h-full rounded-[inherit] box-border">
                      <div className="grow flex flex-row items-start box-border px-xl w-full h-full">
                        <div className="flex flex-col w-full h-full text-on-surface">
                          <main className="grow block w-full">
                            {children}
                            {modal}
                          </main>
                          <Footer />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section id="modal-root" />
              <Analytics />
              {process.env.CFTOKEN && (
                <Script
                  defer
                  src="https://static.cloudflareinsights.com/beacon.min.js"
                  data-cf-beacon={`{"token": "${process.env.CFTOKEN}"}`}
                ></Script>
              )}
              {process.env.MSID && (
                <Script
                  type="text/javascript"
                  strategy="lazyOnload"
                  id="clarity-script"
                >
                  {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.MSID}");`}
                </Script>
              )}
            </WPNUmamiProvider>
          </CssVarsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
