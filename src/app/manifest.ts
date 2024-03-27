import { MetadataRoute } from 'next';
import { APP_MANIFEST } from '@/app/_libs/config';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_MANIFEST.name,
    short_name: APP_MANIFEST.short_name,
    description: APP_MANIFEST.description,
    start_url: '/',
    display: 'standalone',
    background_color: APP_MANIFEST.background_color,
    theme_color: APP_MANIFEST.theme_color,
    icons: [
      {
        src: '/icons/192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/384x384.png',
        sizes: '384x384',
        type: 'image/png',
      },
      {
        src: '/icons/512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '32x32',
        type: 'image/x-icon',
      },
      // {
      //   src: '/favicon.png',
      //   sizes: '64x64',
      //   type: 'image/png',
      // },
    ],
  };
}
