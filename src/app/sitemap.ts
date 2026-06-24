import { MetadataRoute } from 'next';
import { SCHOOL_LIST } from '@/app/_libs/schools';
import { SITE_URL } from '@/app/_libs/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const schoolRoutes = SCHOOL_LIST.flatMap((school) => [
    {
      url: `${SITE_URL}/${school.code}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${school.code}/decrypt`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/${school.code}/bookmarklet`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]);

  return [
    ...schoolRoutes,
    {
      url: `${SITE_URL}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sitemap`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/license`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ];
}
