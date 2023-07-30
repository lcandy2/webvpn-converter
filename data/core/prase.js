const fs = require('fs');

function convertToJSON(file_path) {
  const data = {};

  try {
    const fileContent = fs.readFileSync(file_path, 'utf-8');
    const lines = fileContent.split('\n');

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const [province, school, url, key, iv] = trimmedLine.replace(/ /g,'\t').split('\t');
        if (!data[province]) {
          data[province] = {};
        }
        if (!data[province][school]) {
          data[province][school] = {};
        }
        data[province][school]["host"] = url;
        data[province][school]["crypt_key"] = key;
        data[province][school]["crypt_iv"] = iv;
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

function prase(inputFilePath, outputFilePath) {
  const jsonData = convertToJSON(inputFilePath);
  saveJSONToFile(jsonData, outputFilePath);
}

module.exports = prase;

