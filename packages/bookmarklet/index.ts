import { BOOKMARKLET_CONFIG } from '~/src/app/_libs/config';
import { encryptUrl } from '~/src/app/_libs/url-convert';

const { HOST_SEPRATOR, KEY_SEPRATOR, IV_SEPRATOR } = BOOKMARKLET_CONFIG;

const href = window.location.href;
const host = HOST_SEPRATOR;
const key = KEY_SEPRATOR;
const iv = IV_SEPRATOR;

let params;
if (key.length !== 16 || iv.length !== 16) {
  params = { url: href, schoolHost: host };
} else {
  params = { url: href, schoolHost: host, key, iv };
}
const convertedUrl = encryptUrl(params);

window.open(`//${convertedUrl}`, '_blank');
