import webvpnData from '~/data/webvpn.json';
import type { School, SchoolService } from '@/app/_libs/types';

type SchoolDataStructure = Record<
  string,
  Record<
    string,
    {
      host: string;
      crypto_key?: string | null;
      crypto_iv?: string | null;
      crypto_type?: string | null;
    }
  >
>;

const sanitizeCodePart = (value: string) =>
  value
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getHostCodeParts = (host: string, fallback: string) => {
  const normalizedHost = sanitizeCodePart(host).replace(/-/g, '.');
  const labels = normalizedHost.split('.').filter(Boolean);
  const eduIndex = labels.lastIndexOf('edu');

  if (eduIndex > 0) {
    return {
      base: sanitizeCodePart(labels[eduIndex - 1]),
      prefix: sanitizeCodePart(labels[eduIndex - 2] || labels[0] || ''),
    };
  }

  if (labels.length >= 2) {
    return {
      base: sanitizeCodePart(labels[labels.length - 2]),
      prefix: sanitizeCodePart(labels[labels.length - 3] || labels[0] || ''),
    };
  }

  return {
    base: sanitizeCodePart(host) || sanitizeCodePart(fallback),
    prefix: sanitizeCodePart(fallback),
  };
};

const buildBaseRows = (data: SchoolDataStructure) => {
  const rows: (Omit<School, 'code'> & {
    baseCode: string;
    prefixCode: string;
  })[] = [];

  for (const [province, schools] of Object.entries(data)) {
    for (const [name, config] of Object.entries(schools)) {
      const { base, prefix } = getHostCodeParts(config.host, name);
      rows.push({
        baseCode: base,
        prefixCode: prefix,
        province: province || '未知省份',
        name,
        host: config.host,
        crypto_key: config.crypto_key || undefined,
        crypto_iv: config.crypto_iv || undefined,
        crypto_type: (config.crypto_type as School['crypto_type']) || undefined,
      });
    }
  }

  return rows;
};

export const buildSchoolList = (
  data: SchoolDataStructure = webvpnData,
): School[] => {
  const rows = buildBaseRows(data);
  const baseCounts = new Map<string, number>();
  const codeCounts = new Map<string, number>();

  for (const row of rows) {
    baseCounts.set(row.baseCode, (baseCounts.get(row.baseCode) || 0) + 1);
  }

  return rows.map(({ baseCode, prefixCode, ...school }, index) => {
    const base = baseCode || `school-${index + 1}`;
    const shouldDisambiguate = (baseCounts.get(base) || 0) > 1;
    const preferredCode =
      shouldDisambiguate && prefixCode ? `${base}-${prefixCode}` : base;
    const usedCount = codeCounts.get(preferredCode) || 0;
    codeCounts.set(preferredCode, usedCount + 1);

    return {
      ...school,
      code: usedCount > 0 ? `${preferredCode}-${usedCount + 1}` : preferredCode,
    };
  });
};

export const SCHOOL_LIST = buildSchoolList();

export const getSchoolByCode = (code: string) =>
  SCHOOL_LIST.find((school) => school.code === code);

export const getSchoolByHost = (host: string) =>
  SCHOOL_LIST.find((school) => school.host === host);

export const getSchoolByCookieValue = (
  selectedSchool?: string,
  customSchool?: string,
): School | null => {
  if (!selectedSchool) {
    return null;
  }

  const knownSchool =
    getSchoolByCode(selectedSchool) || getSchoolByHost(selectedSchool);
  if (knownSchool) {
    return knownSchool;
  }

  try {
    const parsed = JSON.parse(selectedSchool) as Partial<School>;
    if (parsed.code && getSchoolByCode(parsed.code)) {
      return getSchoolByCode(parsed.code) || null;
    }
    if (parsed.host && getSchoolByHost(parsed.host)) {
      return getSchoolByHost(parsed.host) || null;
    }
  } catch {
    // Ignore legacy non-JSON cookie values.
  }

  if (selectedSchool === 'custom' && customSchool) {
    try {
      const parsed = JSON.parse(customSchool) as Partial<School>;
      if (parsed.host) {
        return {
          code: 'custom',
          province: null,
          name: parsed.name || '自定义',
          host: parsed.host,
          crypto_key: parsed.crypto_key || undefined,
          crypto_iv: parsed.crypto_iv || undefined,
          crypto_type: parsed.crypto_type || undefined,
        };
      }
    } catch {
      return null;
    }
  }

  return null;
};

export const getSchoolCodeRoute = (
  code: string,
  service: SchoolService = 'encrypt',
) => {
  if (service === 'decrypt') {
    return `/${code}/decrypt`;
  }
  if (service === 'bookmarklet') {
    return `/${code}/bookmarklet`;
  }
  return `/${code}`;
};

export const getSchoolRoute = (
  school: School,
  service: SchoolService = 'encrypt',
) => getSchoolCodeRoute(school.code, service);
