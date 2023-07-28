// pages/api/encrypt.js
import { encryptUrl, keys } from '../../lib/urlConverter';

export default async function handler(req, res) {
  const { url, host: prehost, key = keys('KEY'), iv = keys('IV') } = req.query;

  try {
    const encryptedUrl = encryptUrl(url, key, iv);
    res.status(200).json({ originalUrl: url, url: prehost + encryptedUrl, key, iv });
  } catch (error) {
    res.status(500).json({ error: 'Failed to encrypt the URL.' });
  }
}