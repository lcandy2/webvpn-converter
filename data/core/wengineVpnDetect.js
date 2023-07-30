const axios = require('axios');
const fs = require('fs');
const https = require('https');
const async = require('async');
const prase = require('./prase.js');

const dir = './data/db/';
const dirExp =  dir + 'wengineVpnDetect/'
const dirExport = dirExp + 'raw/'

async function processURL(city, school, currentURL, writeStreams) {
  try {
    let response = await axios.get(currentURL, {
      timeout: 10000,
      maxRedirects: 15,
      httpsAgent: new https.Agent({
          rejectUnauthorized: false // 忽略 SSL 证书错误
      }),
      validateStatus: function (status) {
          return status < 600; // Resolve only if the status code is less than 600
      }
    });  // Use string URL
    if (response.data.includes('wengine')) {
      writeStreams.wengineVpn.write(`${city}\t${school}\t${currentURL}\n`);
    } else {
      writeStreams.nonWengineVpn.write(`${city}\t${school}\t${currentURL}\t${response.data}\n`);
    }
  } catch (error) {
    writeStreams.indeterminateWengineVpn.write(`${city}\t${school}\t${currentURL}\t${error}\n`);
    console.error(`Error with URL ${currentURL}: ${error}`);
  }
}

async function processURLs(data) {
  const wengineVpnStream = fs.createWriteStream(dirExport + 'wengine-vpn.txt', { flags: 'w' });
  const nonWengineVpnStream = fs.createWriteStream(dirExport + 'non-wengine-vpn.txt', { flags: 'w' });
  const indeterminateWengineVpnStream = fs.createWriteStream(dirExport + 'indeterminate-wengine-vpn.txt', { flags: 'w' });
  const writeStreams = {
    wengineVpn: wengineVpnStream,
    nonWengineVpn: nonWengineVpnStream,
    indeterminateWengineVpn: indeterminateWengineVpnStream
  };

  const tasks = [];
  for (const city in data) {
    for (const school in data[city]) {
      tasks.push(() => processURL(city, school, data[city][school]['host'], writeStreams));
    }
  }

  return new Promise((resolve, reject) => {
    async.eachLimit(tasks, 150, function(task, callback) {
      task().then(callback).catch(callback);
    }, function(err) {
      if (err) {
        console.error('A task failed:', err);
        reject(err);
      } else {
        console.log('All tasks have been processed successfully');
        Promise.all([wengineVpnStream, nonWengineVpnStream, indeterminateWengineVpnStream].map(s => new Promise((resolve, reject) => {
          s.end(err => {
            if (err) reject(err);
            else resolve();
          });
        }))).then(resolve).catch(reject);
      }
    });
  });
}

fs.readFile(dir + '/webvpnSupport/validURLs.json', 'utf8', async (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const data = JSON.parse(jsonString);
  try {
    await processURLs(data);
    prase(dirExport + 'wengine-vpn.txt', dirExp + 'wengine-vpn.json');
  } catch (err) {
    console.error('Error in processURLs:', err);
  }
});