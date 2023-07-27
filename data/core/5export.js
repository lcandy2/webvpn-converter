const fs = require('fs');
const readline = require('readline');

const base = './data/db/'
const dirs = ['', 'wengine-vpn/raw/', 'wengine-vpn-crypt/raw/'];
const files = ['list', 'wengine-vpn', 'wengine-vpn-crypt'];
// const dirExport = dir + 'wengine-vpn/'
// const dirImport = dirExport + 'raw/'

async function processLineByLine(inPath, outPath) {
  const fileStream = fs.createReadStream(inPath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let result = {};

  for await (const line of rl) {
    // Process line by line
    const [city, school, url, crypt_key, crypt_iv] = line.replace(/ /g,'\t').split('\t');
    if (!result[city]) {
      result[city] = {};
    }
    result[city][school] = {
      host: url,
      crypt_key,
      crypt_iv
    };
  }

  // Write the result to a file
  fs.writeFile(outPath, JSON.stringify(result, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved to ' + outPath);
  });
}

for (let i = 0; i < dirs.length; i++) {
  function exp(file) {
    const inputFilePath = base + dirs[i] + `${file}.txt`;
    const outputFilePath = base + `raw/${file}.export.json`;

    processLineByLine(inputFilePath, outputFilePath);
  };
  exp(files[i]);
}