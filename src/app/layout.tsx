import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/app/_libs/components/header/header';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import {
  Experimental_CssVarsProvider,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material';
import MuiTheme from '@/app/_libs/mui-theme';
import { GoogleAnalytics } from '@next/third-parties/google';
import { APP_MANIFEST } from '@/app/_libs/config';
import Footer from './_libs/components/footer';
import * as Fonts from '@/app/_libs/fonts/fonts';

const APP_NAME = APP_MANIFEST.name;
const APP_DEFAULT_TITLE = APP_MANIFEST.name;
const APP_TITLE_TEMPLATE = '%s - ' + APP_MANIFEST.name;
const APP_DESCRIPTION = APP_MANIFEST.description;

export const metadata: Metadata = {
  applicationName: APP_NAME,
  icons: {
    icon: '/favicon.png',
  },
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          <Experimental_CssVarsProvider theme={MuiTheme}>
            <section className="flex flex-col sm:mb-l">
              <div className="h-header block">
                <Header />
              </div>
              {/*<section className="relative h-screen overflow-hidden bg-[#eff2fc]">*/}
              {/*  <Header />*/}
              {/*  <div className="transition-all absolute sm:left-[28px] sm:right-[16px] sm:bottom-[16px] top-[108px] sm:top-[72px] left-0 right-0 bottom-0 bg-white rounded-t-[28px] sm:rounded-[28px] z-0 bg-[#fdfcff]">*/}
              {/*    <div className="overflow-auto h-full p-7 pr-5">*/}
              {/*      <div className="flex flex-col min-h-[100%]">*/}
              {/*        <main className="grow">{children}</main>*/}
              {/*        <Footer />*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</section>*/}
              {/*{children}*/}
              <div className="grow flex flex-col justify-start sm:ml-xl sm:mr-l transition-all duration-md ease-md">
                <div className="grow transition-all duration-md ease-md box-border overflow-auto w-full h-content bg-surface rounded-shape-xl">
                  <div className="pt-xl scrollbar scrollbar-track-primary scrollbar-thin overflow-y-auto h-full rounded-[inherit] box-border">
                    <div className="grow flex flex-row items-start box-border px-xl w-full h-full">
                      <div className="flex flex-col w-full h-full text-on-surface">
                        <main className="grow block w-full">{children}</main>
                        <Footer />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Experimental_CssVarsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
