const fs = require('fs');

const dirs = ['./data/db/webvpn/', './data/db/wengine-vpn/'];
const files = [['validURLs', 'invalidURLs', 'indeterminateURLs'], ['wengine-vpn', 'non-wengine-vpn', 'indeterminate-wengine-vpn']]

function convertToJSON(file_path) {
  const data = {};

  try {
    const fileContent = fs.readFileSync(file_path, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const [province, school, url] = trimmedLine.split('\t');
        if (!data[province]) {
          data[province] = {};
        }
        data[province][school] = url;
      }
    }
  } catch (err) {
    console.error('Error reading or processing the file:', err);
  }

  return data;
}

function saveJSONToFile(jsonData, outputFileName) {
  try {
    const jsonDataString = JSON.stringify(jsonData, null, 4);
    fs.writeFileSync(outputFileName, jsonDataString, 'utf-8');
    console.log('JSON data has been saved to', outputFileName);
  } catch (err) {
    console.error('Error saving JSON data to file:', err);
  }
}

for (let i = 0; i < dirs.length; i++) {
  files[i].forEach(file => {
    const inputFilePath = dirs[i] + `raw/${file}.txt`;
    const outputFilePath = dirs[i] + `${file}.json`;

    const jsonData = convertToJSON(inputFilePath);
    saveJSONToFile(jsonData, outputFilePath);
    console.log(dirs[i], file)
  });
}


