const axios = require('axios');
const url = require('url');
const fs = require('fs');

const dir = './data/db/webvpn/raw/';

async function processURL(city, school, currentURL, writeStreams) {
    let parsedURL = url.parse(currentURL);
    parsedURL.host = 'webvpn.' + parsedURL.host.replace('www.', '');
    let newURL = url.format(parsedURL);
    try {
        let response = await axios.get(newURL, {
            timeout: 20000,
            maxRedirects: 5,
            validateStatus: function (status) {
                return status < 600; // Resolve only if the status code is less than 600
            }
        });
        if (response.status >= 200 && response.status < 400) {
            writeStreams.valid.write(`${city}\t${school}\t${newURL}\n`);
        } else if (response.status) {
            writeStreams.indeterminate.write(`${city}\t${school}\t${newURL}\n`);
        } else {
            writeStreams.invalid.write(`${city}\t${school}\t${newURL}\n`);
        }
    } catch (error) {
        if (error.message && error.message.includes('redirect')) {
            writeStreams.valid.write(`${city}\t${school}\t${newURL}\n`);
        } else {
            console.error(`Error with URL ${newURL}: ${error}`);
            writeStreams.invalid.write(`${city}\t${school}\t${newURL}\n`);
        }
    }
}

async function processURLs(data) {
    const validStream = fs.createWriteStream(dir + 'validURLs.txt', { flags: 'w' });
    const invalidStream = fs.createWriteStream(dir + 'invalidURLs.txt', { flags: 'w' });
    const indeterminateStream = fs.createWriteStream(dir + 'indeterminateURLs.txt', { flags: 'w' });
    const writeStreams = {
        valid: validStream,
        invalid: invalidStream,
        indeterminate: indeterminateStream
    };

    const tasks = [];
    for (const city in data) {
        for (const school in data[city]) {
            tasks.push(processURL(city, school, data[city][school], writeStreams));
        }
    }

    await Promise.allSettled(tasks);

    await Promise.all([validStream, invalidStream, indeterminateStream].map(s => s.end()));
}

axios.get('https://raw.githubusercontent.com/lcandy2/Chinese-Universities-with-Website/036358cc065414919214ab29637f42d1da9a559a/chinese_universities_with_website.json')
    .then(response => {
        const data = response.data;
        processURLs(data);
    })
    .catch(error => console.error(`Error fetching URL data: ${error}`));
