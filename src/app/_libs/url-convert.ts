import { URL_CONVERT_CONFIG } from '@/app/_libs/config';
import { ConvertConfig } from '@/app/_libs/types';
import aesjs from 'aes-js';

const utf8 = aesjs.utils.utf8;
const hex = aesjs.utils.hex;
const AesCfb = aesjs.ModeOfOperation.cfb;
const { KEY, IV, PROTOCOLS, DECRYPT_FAILED_SEPARATOR } = URL_CONVERT_CONFIG;

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

const createAesCfb = (key: string, iv: string) => {
  return new AesCfb(utf8.toBytes(key), utf8.toBytes(iv), 16);
};

const encryptHost = ({ text, key, iv }: ConvertHostConfig): string => {
  try {
    const aesCfb = createAesCfb(key, iv);
    const textBytes = utf8.toBytes(textRightAppend(text, 'utf8'));
    const encryptBytes = aesCfb.encrypt(textBytes);

    return (
      hex.fromBytes(utf8.toBytes(iv)) +
      hex.fromBytes(encryptBytes).slice(0, text.length * 2)
    );
  } catch (e) {
    return (e as Error).toString();
  }
};

const decryptText = ({ text, key, iv }: ConvertHostConfig): string => {
  try {
    const aesCfb = createAesCfb(key, iv);
    const textLength = (text.length - iv.length * 2) / 2;
    const decryptBytes = aesCfb.decrypt(
      hex.toBytes(textRightAppend(text.slice(IV.length * 2), 'hex')),
    );

    return utf8.fromBytes(decryptBytes).slice(0, textLength);
  } catch (e) {
    return (e as Error).toString();
  }
};

interface ExtrectedUrl {
  url: URL | string;
  host: string;
  path: string;
  port?: string;
  protocol: string;
}

/**
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

 try {
 url = new URL(requiredUrl);
 // if (url) {
 return extractFromURL(url);
 // } else {
 //   const urlWithProtocol = 'http://' + requiredUrl.toString().trim();
 //   if (URL.canParse(urlWithProtocol)) {
 //     url = new URL(urlWithProtocol);
 //     return extractFromURL(url);
 //   } else {
 //     // url = nodeUrl.parse(urlWithProtocol);
 //     return { url: '', host: '', path: '', port: '', protocol: '' };
 //   }
 // }
 } catch (e1) {
 const urlWithProtocol = 'http://' + requiredUrl.toString().trim();
 try {
 url = new URL(urlWithProtocol);
 return extractFromURL(url);
 } catch (e2) {
 return { url: '', host: '', path: '', port: '', protocol: '' };
 }
 }
 };*/

const extractUrlLegacy = (requiredUrl: string | URL): ExtrectedUrl => {
  const url: string = requiredUrl.toString().trim();
  let protocol = 'http';
  let host: string;
  let path = '';
  let port = '';

  let urlString = url;

  /** Extract protocol */
  for (const p of PROTOCOLS) {
    const protoLength = protocol.length + 3;
    const url = urlString;
    if (url.substring(0, protoLength).toLowerCase() === protocol + '://') {
      protocol = p;
      urlString = url.substring(protoLength);
    }
  }

  /** Extract host and path */
  const segments = urlString.split('?')[0].split(':');
  if (segments.length > 1) {
    port = segments[1].split('/')[0];
    urlString =
      urlString.substring(0, segments[0].length) +
      urlString.substring(segments[0].length + port.length + 1);
  }

  const pathStart = urlString.indexOf('/');
  if (pathStart !== -1) {
    host = urlString.slice(0, pathStart);
    path = urlString.slice(pathStart);
  } else {
    host = urlString;
  }

  return { url, host, path, port, protocol };
};

export const encryptUrl = ({
  url: inputUrl,
  schoolHost,
  key = KEY,
  iv = IV,
}: ConvertConfig): string => {
  /** Extract URL
   *  Use Legacy instead
   const {
   url: extractedUrl,
   host,
   path,
   port,
   protocol
   } = extractUrl(inputUrl);
   */

  const {
    url: extractedUrl,
    host,
    path,
    port,
    protocol,
  } = extractUrlLegacy(inputUrl);

  if (!(key && iv)) {
    key = KEY;
    iv = IV;
  }
  try {
    const encryptedHost = encryptHost({ text: host, key, iv });

    schoolHost = schoolHost || '';

    if (port !== '') {
      return `${schoolHost}/${protocol}-${port}/${encryptedHost}${path}`;
    } else {
      return `${schoolHost}/${protocol}/${encryptedHost}${path}`;
    }
  } catch (error) {
    const errorMessage = (error as Error).toString();
    console.error('[WebVPN Converter] Encryption failed: ', error);
    return `转换失败: ${errorMessage}`;
  }
};

export const decryptUrl = ({
  url: inputUrl,
  key = KEY,
  iv = IV,
}: ConvertConfig): string => {
  let result = '';
  try {
    if (!inputUrl) throw new Error('URL is required!');

    const { path } = extractUrlLegacy(inputUrl);

    const segments = path.split('/');
    const [protocol, port] = segments[1].split('-');
    const host = segments[2];
    const decryptedHost = decryptText({ text: host, key, iv });
    const remainingSegments = segments.slice(3).join('/');

    result = `${protocol}://${decryptedHost}${port ? ':' + port : ''}/${remainingSegments}`;

    if (!(decryptedHost !== '') || !(host !== ''))
      throw new Error(
        'Decrypted host is empty, decryption might be failed! Check if your url, key, iv is correct.',
      );

    new URL(result);
  } catch (error) {
    result =
      'Decryption failed: ' +
      (error as Error).toString() +
      DECRYPT_FAILED_SEPARATOR +
      result;
  }
  return result;
};
