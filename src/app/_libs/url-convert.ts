import * as crypto from 'crypto';
import { URL_CONVERT_CONFIG } from '@/app/_libs/config';
import { ConvertConfig } from '@/app/_libs/types';
import aesjs from 'aes-js';
// import * as nodeUrl from 'node:url';

// const KEY = 'wrdvpnisthebest!';
// const IV = 'wrdvpnisthebest!';
// const PROTOCOLS = ['http', 'https', 'ssh', 'vnc', 'telnet', 'rdp'];
const utf8 = aesjs.utils.utf8;
const hex = aesjs.utils.hex;
const AesCfb = aesjs.ModeOfOperation.cfb;

const { KEY, IV, PROTOCOLS, ALGORITHM } = URL_CONVERT_CONFIG;

const textRightAppend = (text: string, mode: 'utf8' | string) => {
  const segmentByteSize = mode === 'utf8' ? 16 : 32;
  const appendLength = segmentByteSize - (text.length % segmentByteSize);
  return text.padEnd(text.length + appendLength, '0');
};

export interface ConvertHostConfig {
  text: string;
  key: string;
  iv: string;
}

// const encryptHost = ({ text, key, iv }: ConvertHostConfig): string => {
//   const cipher = crypto.createCipheriv(
//     ALGORITHM,
//     Buffer.from(key),
//     Buffer.from(iv),
//   );
//   // Since the first argument is a Buffer, we don't need to specify 'utf8' here
//   let encrypted = cipher.update(
//     textRightAppend(text, 'utf8'),
//     undefined,
//     'hex',
//   );
//   encrypted += cipher.final('hex');
//   return encrypted;
// };

const createAesCfb = (key: string, iv: string) => {
  return new AesCfb(utf8.toBytes(key), utf8.toBytes(iv), 16);
};

const encryptHost = ({ text, key, iv }: ConvertHostConfig): string => {
  const aesCfb = createAesCfb(key, iv);
  const textBytes = utf8.toBytes(textRightAppend(text, 'utf8'));
  const encryptBytes = aesCfb.encrypt(textBytes);

  return (
    hex.fromBytes(utf8.toBytes(iv)) +
    hex.fromBytes(encryptBytes).slice(0, text.length * 2)
  );
};

// const decryptHost = ({ text, key, iv }: ConvertHostConfig) => {
//   const decipher = crypto.createDecipheriv(
//     ALGORITHM,
//     Buffer.from(key),
//     Buffer.from(iv)
//   );
//   let decrypted = decipher.update(text, 'hex', 'utf8');
//   decrypted += decipher.final('utf8');
//   return decrypted.trimEnd('\0'); // Remove the padding zeros
// };

interface ExtrectedUrl {
  url: URL | string;
  host: string;
  path: string;
  port?: string;
  protocol: string;
}

const extractUrl = (requiredUrl: string | URL): ExtrectedUrl => {
  let url: URL;
  let protocol: string;
  let host: string;
  let path: string;
  let port: string;

  const extractFromURL = (url: URL) => {
    const protocol = url.protocol.slice(0, -1);
    const host = url.host;
    const href = url.href;
    const hostIndex = href.indexOf(host);
    const hostLength = host.length;
    const path = url.href.slice(hostIndex + hostLength);
    const port = url.port;
    return { url, host, path, port, protocol };
  };

  if (URL.canParse(requiredUrl)) {
    url = new URL(requiredUrl);
    return extractFromURL(url);
  } else {
    const urlWithProtocol = 'http://' + requiredUrl.toString().trim();
    if (URL.canParse(urlWithProtocol)) {
      url = new URL(urlWithProtocol);
      return extractFromURL(url);
    } else {
      // url = nodeUrl.parse(urlWithProtocol);
      return { url: '', host: '', path: '', port: '', protocol: '' };
    }
  }
};

export const encryptUrl = ({
  url: inputUrl,
  key = KEY,
  iv = IV,
}: ConvertConfig) => {
  const {
    url: extractedUrl,
    host,
    path,
    port,
    protocol,
  } = extractUrl(inputUrl);

  /** ipv6 is not supported */
  // let ipv6 = '';
  // urlString = urlString.replace(/\[[0-9a-fA-F:]+?\]/, (match) => {
  //   ipv6 = match;
  //   return '';
  // });

  // let segments = urlString.split('?')[0].split(':');
  // let port = '';
  // if (segments.length > 1) {
  //   port = segments[1].split('/')[0];
  //   urlString =
  //     urlString.substring(0, segments[0].length) +
  //     urlString.substring(segments[0].length + port.length + 1);
  // }
  //
  // const i = urlString.indexOf('/');
  // let host = urlString;
  // let path = '';
  // if (i !== -1) {
  //   host = urlString.slice(0, i);
  //   path = urlString.slice(i);
  // }
  // if (ipv6 !== '') {
  //   host = ipv6;
  // }

  const encryptedHost = encryptHost({ text: host, key, iv });

  if (port !== '') {
    return `/${protocol}-${port}/${encryptedHost}${path}`;
  } else {
    return `/${protocol}/${encryptedHost}${path}`;
  }
};

// export const decryptUrl = (rawUrl, key = KEY, iv = IV) => {
//   try {
//     if (!rawUrl) return { url: '', error: null };
//
//     const url = new URL(rawUrl);
//     const segments = url.pathname.split('/');
//     const [protocol, port] = segments[1].split('-');
//     const decryptedHost = decryptText(segments[2], key, iv);
//     const remainingSegments = segments.slice(3).join('/');
//
//     return `${protocol}://${decryptedHost}${port ? ':' + port : ''}/${remainingSegments}`;
//   } catch (error) {
//     return 'Unknown error, check your URL.';
//   }
// }
// ;

// export const keys = (type) => {
//   if (type === 'KEY') return KEY;
//   else if (type === 'IV') return IV;
//   else return 'error';
// };
