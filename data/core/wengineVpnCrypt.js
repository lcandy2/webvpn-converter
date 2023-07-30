const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const url = require('url');
const async = require('async');
const https = require('https');

const dir = './data/db/';
const dirExport = dir + 'wengineVpnCrypt/raw/'

async function processURL(city, school, currentURL, writeStreams) {
  // let parsedURL = url.parse(currentURL);
  // parsedURL.host = 'webvpn.' + parsedURL.host.replace('www.', '');
  // currentURL = url.format(parsedURL);
  try {
    let response = await axios.get(currentURL, {
      timeout: 20000,
      maxRedirects: 5,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false // 忽略 SSL 证书错误
      }),
      validateStatus: function (status) {
        return status < 600; // Resolve only if the status code is less than 600
      }
    });
    if (response.status) {
      const $ = cheerio.load(response.data);
      const script = $('script').map((_, elem) => $(elem).html()).get().join('\n');
      const matchedScript = script.match(/var crypt_key = "(.*?)";\nvar crypt_iv = "(.*?)";/);
      if (matchedScript) {
        writeStreams.wengine.write(`${city}\t${school}\t${currentURL}\t${matchedScript[1]}\t${matchedScript[2]}\n`);
      } else {
        writeStreams.nonWengine.write(`${city}\t${school}\t${currentURL}\tNo matched script found\n`);
      }
    } else {
      console.error(`Invalid status code for URL ${currentURL}: ${response.status}`);
      writeStreams.nonWengine.write(`${city}\t${school}\t${currentURL}\tInvalid status code for URL ${currentURL}: ${response.status}\n`);
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

  async.eachLimit(tasks, 150, async (task, callback) => {
    try {
      await processURL(task.city, task.school, task.url, writeStreams);
      callback();
    } catch (err) {
      callback(err);
    }
  }, err => {
    if (err) console.error(err);
    else {
      console.log('All tasks completed');
      Promise.all([wengineStream, nonWengineStream].map(s => new Promise((resolve, reject) => {
        s.end(err => {
          if (err) reject(err);
          else resolve();
        });
      })))
        .then(() => console.log('All streams closed'))
        .catch(err => console.error('Error closing streams:', err));
    }
  });
}

fs.readFile(dir + 'webvpnSupport/validURLs.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const data = JSON.parse(jsonString);
  processURLs(data);
});

// axios.get('https://raw.githubusercontent.com/lcandy2/Chinese-Universities-with-Website/036358cc065414919214ab29637f42d1da9a559a/chinese_universities_with_website.json')
//     .then(response => {
//         const data = response.data;
//         processURLs(data);
//     })
//     .catch(error => console.error(`Error fetching URL data: ${error}`));
