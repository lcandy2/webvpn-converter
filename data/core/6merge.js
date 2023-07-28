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
  // Change all 'host' values in jsonData
  Object.keys(jsonData).forEach((city) => {
    Object.keys(jsonData[city]).forEach((university) => {
      Object.keys(jsonData[city][university]).forEach((property) => {
        if (property === 'host') {
          try {
            jsonData[city][university][property] = new URL(jsonData[city][university][property]).hostname;
          } catch (error) {}
        }
      });
    });
  });
  // Merge jsonData into mergedData
  Object.keys(jsonData).forEach((city) => {
    if (mergedData[city]) {
      // If the city exists in the mergedData, go through each university
      Object.keys(jsonData[city]).forEach((university) => {
        if (mergedData[city][university]) {
          // If the university exists, go through each property in university data
          Object.keys(jsonData[city][university]).forEach((property) => {
            // Merge the property
            mergedData[city][university][property] = jsonData[city][university][property];
          });
        } else {
          // If the university does not exist, add it to mergedData
          mergedData[city][university] = jsonData[city][university];
        }
      });
    } else {
      // If the city does not exist, add it to mergedData
      mergedData[city] = jsonData[city];
    }
  });
});

// Convert mergedData to array
let dataArr = Object.keys(mergedData).map(key => ({ [key]: mergedData[key] }));

// Sort array
dataArr.sort((a, b) => {
  const aPinyin = pinyin(Object.keys(a)[0], { style: pinyin.STYLE_NORMAL }).join('');
  const bPinyin = pinyin(Object.keys(b)[0], { style: pinyin.STYLE_NORMAL }).join('');
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
