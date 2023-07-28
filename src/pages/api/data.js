import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  
  const dataPath = path.join(process.cwd(), './data/webvpn.json');

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.error('File read error:', err);
      res.status(500).json({ message: 'Error reading data file' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (err) {
      console.error('JSON parse error:', err);
      res.status(500).json({ message: 'Error parsing JSON data' });
    }
  });
}
