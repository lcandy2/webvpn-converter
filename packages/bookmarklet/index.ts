import { BOOKMARKLET_CONFIG } from '~/src/app/_libs/config';
import type { CryptoType } from '~/src/app/_libs/types';
import { encryptUrl } from '~/src/app/_libs/url-convert';

const { HOST_SEPRATOR, KEY_SEPRATOR, IV_SEPRATOR, TYPE_SEPRATOR } =
  BOOKMARKLET_CONFIG;

const href = window.location.href;
const host = HOST_SEPRATOR;
const key = KEY_SEPRATOR;
const iv = IV_SEPRATOR;
const type = TYPE_SEPRATOR;

let params;
if (key.length !== 16 || iv.length !== 16) {
  params = {
    url: href,
    schoolHost: host,
    type: type as CryptoType,
  };
} else {
  params = {
    url: href,
    schoolHost: host,
    key,
    iv,
    type: type as CryptoType,
  };
}
const convertedUrl = encryptUrl(params);

window.open(`//${convertedUrl}`, '_blank');
