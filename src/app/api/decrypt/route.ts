import { URL_CONVERT_CONFIG } from '@/app/_libs/config';
import { selectedSchoolAtom } from '@/app/_libs/atoms';
import { decryptUrl, encryptUrl } from '@/app/_libs/url-convert';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const key = searchParams.get('key') || URL_CONVERT_CONFIG.KEY;
  const iv = searchParams.get('iv') || URL_CONVERT_CONFIG.IV;

  interface DecryptResult {
    status: {
      code: number;
      message?: string;
    };
    url?: string;
    requestData?: {
      url?: string;
      key: string;
      iv: string;
    };
  }

  const result: DecryptResult = {
    status: {
      code: 200,
      message: undefined,
    },
    url: undefined,
    requestData: {
      url: url || undefined,
      key,
      iv,
    },
  };

  try {
    if (!url) {
      throw new Error('Url is required!');
    }
    const decryptedUrl = decryptUrl({ url, key, iv });
    result.url = decryptedUrl;
    try {
      new URL(decryptedUrl);
    } catch {
      const index = decryptedUrl.indexOf(
        URL_CONVERT_CONFIG.DECRYPT_FAILED_SEPARATOR,
      );
      if (index !== -1) {
        const length = URL_CONVERT_CONFIG.DECRYPT_FAILED_SEPARATOR.length;
        result.url = decryptedUrl.slice(index + length);
      }
      throw new Error('Decrypted URL is invalid: ' + decryptedUrl);
    }
  } catch (e) {
    const error = e as Error;
    const errorString = error.toString();
    if (errorString.toLowerCase().includes('url is required')) {
      result.status.code = 400;
    }
    if (errorString.toLowerCase().includes('invalid')) {
      result.status.code = 403;
    } else {
      result.status.code = 500;
    }
    let msg = errorString;
    const index = errorString.indexOf(
      URL_CONVERT_CONFIG.DECRYPT_FAILED_SEPARATOR,
    );
    if (index !== -1) {
      msg = errorString.slice(0, index);
    }
    result.status.message =
      msg + ' Check https://wpn.citrons.cc/api for more information.';
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
