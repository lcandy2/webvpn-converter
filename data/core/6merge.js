const fs = require('fs');
const path = require('path');
const pinyin = require('pinyin').default;


const dir = './data/'
const dirImport = dir + 'db/raw/'

// List of JSON files
const fileNames = ['wengine-vpn.export.json', 'wengine-vpn-crypt.export.json', 'list.export.json',];

// Empty object to store the merged data
let mergedData = {};

// Loop over each file
fileNames.forEach((fileName) => {
  // Read the file
  const data = fs.readFileSync(path.join(dirImport, fileName), 'utf8');
  // Parse the file content to a JavaScript object
  const jsonData = JSON.parse(data);
  // Merge jsonData into mergedData
  mergedData = { ...mergedData, ...jsonData };
});

// Convert mergedData to array
let dataArr = Object.keys(mergedData).map(key => ({ [key]: mergedData[key] }));

// Sort array
dataArr.sort((a, b) => {
  const aPinyin = pinyin(Object.keys(a)[0], {style: pinyin.STYLE_NORMAL}).join('');
  const bPinyin = pinyin(Object.keys(b)[0], {style: pinyin.STYLE_NORMAL}).join('');
  return aPinyin.localeCompare(bPinyin);
});

// Convert sorted array back to object
let sortedData = {};
dataArr.forEach(item => {
  const key = Object.keys(item)[0];
  sortedData[key] = item[key];
});

// Write the merged data to a new JSON file
fs.writeFileSync(dir + 'webvpn.json', JSON.stringify(sortedData, null, 2));
console.log('The file has been saved to ' + dir + 'webvpn.json');
