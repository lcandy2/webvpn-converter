import { URL_CONVERT_CONFIG } from '@/app/_libs/config';
import { encryptUrl } from '@/app/_libs/url-convert';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const schoolHost = searchParams.get('host') || undefined;
  const key = searchParams.get('key') || URL_CONVERT_CONFIG.KEY;
  const iv = searchParams.get('iv') || URL_CONVERT_CONFIG.IV;
  const type = searchParams.get('type') || URL_CONVERT_CONFIG.TYPE;

  interface EncryptResult {
    status: {
      code: number;
      message?: string;
    };
    url?: string;
    requestData?: {
      url?: string;
      host?: string;
      key: string;
      iv: string;
      type: string;
    };
  }

  const result: EncryptResult = {
    status: {
      code: 200,
      message: undefined,
    },
    url: undefined,
    requestData: {
      url: url || undefined,
      host: schoolHost,
      key,
      iv,
      type: type,
    },
  };

  try {
    if (!url) {
      throw new Error(
        'Url is required! Check https://wpn.citrons.cc/api for more information.',
      );
    }
    if (type !== 'wrdvpn' && type !== 'enlinkvpn') {
      throw new Error('Invalid type!');
    }
    const encryptedUrl = encryptUrl({ url, schoolHost, key, iv, type });
    result.url = encryptedUrl;
  } catch (e) {
    const error = e as Error;
    const errorString = error.toString();
    if (
      errorString.toLowerCase().includes('url is required') ||
      errorString.toLowerCase().includes('invalid type')
    ) {
      result.status.code = 400;
    } else {
      result.status.code = 500;
    }
    result.status.message = error.toString();
  }

  return new Response(JSON.stringify(result), {
    status: result.status.code,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
