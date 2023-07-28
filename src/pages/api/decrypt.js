// pages/api/encrypt.js
import { decryptUrl, keys } from '../../lib/urlConverter';
export const runtime = 'edge';

export default async function handler(req, res) {
  const { url, key = keys('KEY'), iv = keys('IV')} = req.query;

  try {
    const decryptedUrl = decryptUrl(url, key, iv);
    res.status(200).json({ originalUrl: url, url: decryptedUrl, key, iv });
  } catch (error) {
    res.status(500).json({ error: 'Failed to decrypt the URL.' });
  }
}
