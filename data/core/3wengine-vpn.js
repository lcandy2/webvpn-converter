const axios = require('axios');
const fs = require('fs');

const dir = './data/db/';
const dirExport = dir + 'wengine-vpn/raw/'

async function processURL(city, school, currentURL, writeStreams) {
  try {
    let response = await axios.get(currentURL, {
      timeout: 20000,
      maxRedirects: 15
    });  // Use string URL
    if (response.data.includes('wengine-vpn')) {
      writeStreams.wengineVpn.write(`${city}\t${school}\t${currentURL}\n`);
    } else {
      writeStreams.nonWengineVpn.write(`${city}\t${school}\t${currentURL}\n`);
    }
  } catch (error) {
    writeStreams.indeterminateWengineVpn.write(`${city}\t${school}\t${currentURL}\n`);
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
      tasks.push(processURL(city, school, data[city][school], writeStreams));
    }
  }

  await Promise.allSettled(tasks);

  await Promise.all([wengineVpnStream, nonWengineVpnStream, indeterminateWengineVpnStream].map(s => s.end()));
}

fs.readFile(dir + 'validURLs.json', 'utf8', (err, jsonString) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  const data = JSON.parse(jsonString);
  processURLs(data);
});