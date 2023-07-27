const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const url = require('url');

const dir = './data/db/';
const dirExport = dir + 'wengine-vpn-crypt/raw/'

async function processURL(city, school, currentURL, writeStreams) {
  let parsedURL = url.parse(currentURL);
  parsedURL.host = 'webvpn.' + parsedURL.host.replace('www.', '');
  currentURL = url.format(parsedURL);
  try {
    let response = await axios.get(currentURL, { timeout: 20000 });
    if (response.status >= 200 && response.status < 400) {
      const $ = cheerio.load(response.data);
      const script = $('script').map((_, elem) => $(elem).html()).get().join('\n');
      const matchedScript = script.match(/var __vpn_host_crypt_key = "(.*?)";\nvar __vpn_host_crypt_iv = "(.*?)";/);
      if (matchedScript) {
        writeStreams.wengine.write(`${city}\t${school}\t${currentURL}\t${matchedScript[1]}\t${matchedScript[2]}\n`);
      } else {
        writeStreams.nonWengine.write(`${city}\t${school}\t${currentURL}\tNo matched script found\n`);
      }
    } else {
      console.error(`Invalid status code for URL ${currentURL}: ${response.status}`);
    }
  } catch (error) {
    writeStreams.nonWengine.write(`${city}\t${school}\t${currentURL}\t${error}\n`);
    console.error(`Error with URL ${currentURL}: ${error}`);
  }
}

async function processURLs(data) {
  const wengineStream = fs.createWriteStream(dirExport + 'wengine-vpn-crypt.txt', { flags: 'w' });
  const nonWengineStream = fs.createWriteStream(dirExport + 'non-wengine-vpn-crypt.txt', { flags: 'w' });
  const writeStreams = {
    wengine: wengineStream,
    nonWengine: nonWengineStream
  };

  const tasks = [];
  for (const city in data) {
    for (const school in data[city]) {
      tasks.push(processURL(city, school, data[city][school], writeStreams));
    }
  }

  await Promise.allSettled(tasks);

  await Promise.all([wengineStream, nonWengineStream].map(s => new Promise((resolve, reject) => {
    s.end(err => {
      if (err) reject(err);
      else resolve();
    });
  })));
}

// fs.readFile(dir + 'webvpn/validURLs.json', 'utf8', (err, jsonString) => {
//   if (err) {
//     console.log("File read failed:", err);
//     return;
//   }
//   const data = JSON.parse(jsonString);
//   processURLs(data);
// });

axios.get('https://raw.githubusercontent.com/lcandy2/Chinese-Universities-with-Website/036358cc065414919214ab29637f42d1da9a559a/chinese_universities_with_website.json')
    .then(response => {
        const data = response.data;
        processURLs(data);
    })
    .catch(error => console.error(`Error fetching URL data: ${error}`));
