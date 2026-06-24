import type { Metadata } from 'next';
import type { School, SchoolService } from '@/app/_libs/types';
import { APP_MANIFEST } from '@/app/_libs/config';
import { getSchoolRoute } from '@/app/_libs/schools';

export const SITE_URL = 'https://wpn.citrons.cc';

export const SEO_IMAGES = [
  {
    url: 'https://wrdvpn.vercel.app/promotion/promotion2.png',
    width: 1280,
    height: 640,
    alt: APP_MANIFEST.name,
  },
  {
    url: 'https://wrdvpn.vercel.app/promotion/promotion.png',
    width: 2638,
    height: 1024,
    alt: APP_MANIFEST.name,
  },
];

const SCHOOL_SERVICE_LABEL: Record<SchoolService, string> = {
  encrypt: '转换链接',
  decrypt: '还原链接',
  bookmarklet: '小书签插件',
};

const getSchoolServiceDescription = (
  school: School,
  service: SchoolService,
) => {
  if (service === 'decrypt') {
    return `将 ${school.name} 的 Web VPN 链接还原为原始网址，适用于 ${school.host}。`;
  }
  if (service === 'bookmarklet') {
    return `为 ${school.name} 生成 Web VPN 小书签，快速从浏览器收藏栏访问校内资源。`;
  }
  return `将常规网址转换为 ${school.name} 的 Web VPN 访问链接，适用于 ${school.host}。`;
};

export const buildSchoolServiceMetadata = (
  school: School,
  service: SchoolService,
): Metadata => {
  const label = SCHOOL_SERVICE_LABEL[service];
  const path = getSchoolRoute(school, service);
  const title = `${school.name} - ${label}`;
  const description = getSchoolServiceDescription(school, service);

  return {
    title,
    description,
    keywords: [
      school.name,
      school.code,
      school.host,
      `${school.name} WebVPN`,
      `${school.name} VPN`,
      `WebVPN ${label}`,
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type: 'website',
      images: SEO_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SEO_IMAGES[0].url],
    },
  };
};

export const noIndexMetadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};
