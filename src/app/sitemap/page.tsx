import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SubtitleComponent,
  TitleComponent,
} from '@/app/_libs/components/title';
import { getSchoolRoute, SCHOOL_LIST } from '@/app/_libs/schools';

export const metadata: Metadata = {
  title: 'Sitemap',
  description:
    'Web VPN Converter 学校页面索引，包含所有学校的转换、还原和小书签入口。',
  alternates: {
    canonical: '/sitemap',
  },
};

const groupedSchools = SCHOOL_LIST.reduce(
  (groups, school) => {
    const province = school.province || '其他';
    groups[province] = [...(groups[province] || []), school];
    return groups;
  },
  {} as Record<string, typeof SCHOOL_LIST>,
);

export default function Page() {
  const groups = Object.entries(groupedSchools).sort(([a], [b]) =>
    a.localeCompare(b, 'zh-CN'),
  );

  return (
    <>
      <TitleComponent marginBottom={false}>Sitemap</TitleComponent>
      <SubtitleComponent>
        所有学校的 Web VPN 转换、还原和小书签页面索引。
      </SubtitleComponent>
      <div className="grid gap-8 pb-8">
        {groups.map(([province, schools]) => (
          <section key={province}>
            <h2 className="mb-3 text-title-m text-on-surface">{province}</h2>
            <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {schools.map((school) => (
                <li
                  key={school.code}
                  className="rounded-lg border border-outline-variant p-4"
                >
                  <p className="font-medium text-on-surface">{school.name}</p>
                  <p className="truncate text-xs text-on-surface-variant">
                    /{school.code} · {school.host || '自定义 Web VPN'}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <Link
                      href={getSchoolRoute(school, 'encrypt')}
                      className="underline"
                    >
                      转换
                    </Link>
                    <Link
                      href={getSchoolRoute(school, 'decrypt')}
                      className="underline"
                    >
                      还原
                    </Link>
                    <Link
                      href={getSchoolRoute(school, 'bookmarklet')}
                      className="underline"
                    >
                      小书签
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
