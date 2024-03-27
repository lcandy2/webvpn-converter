import { UrlConvertConfig } from '@/app/_libs/types';

/** Default URL Convert Config */
export const URL_CONVERT_CONFIG: UrlConvertConfig = {
  KEY: 'wrdvpnisthebest!',
  IV: 'wrdvpnisthebest!',
  PROTOCOLS: ['http', 'https', 'ssh', 'vnc', 'telnet', 'rdp'],
};

export const APP_MANIFEST = {
  name: 'Web VPN Converter',
  short_name: 'WebVPN Converter',
  description:
    '轻松访问校内网络资源，无需繁琐设置，只需粘贴链接，常规网址即刻转化为您学校的 Web VPN 网址。',
  theme_color: '#fff',
  background_color: '#fff',
};
