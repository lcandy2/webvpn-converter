import { UrlConvertConfig } from '@/app/_libs/types';

/** Default URL Convert Config */
export const URL_CONVERT_CONFIG: UrlConvertConfig = {
  KEY: 'wrdvpnisthebest!',
  IV: 'wrdvpnisthebest!',
  PROTOCOLS: ['http', 'https', 'ssh', 'vnc', 'telnet', 'rdp'],
  ALGORITHM: 'aes-128-cfb',
};
