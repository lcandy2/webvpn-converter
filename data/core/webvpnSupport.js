const axios = require('axios');
const url = require('url');
const fs = require('fs');
const async = require('async');
const https = require('https');
const prase = require('./prase.js');

const dir = './data/db/webvpnSupport/';
const rawDir = dir + 'raw/'

async function processURL(city, school, currentURL, writeStreams) {
    let parsedURL = url.parse(currentURL);
    parsedURL.host = 'webvpn.' + parsedURL.host.replace('www.', '');
    let newURL = url.format(parsedURL);
    try {
        const response = await fetchUrl(newURL);
        if (response.status) writeStreams.valid.write(`${city}\t${school}\t${newURL}\n`);
    } catch (error) {
        if (error.message && error.message.includes('redirect')) {
            writeStreams.indeterminate.write(`${city}\t${school}\t${newURL}\t${error}\n`);
        } else {
            console.error(`Error with webvpn prefix, try vpn instead. URL ${newURL}: ${error}`);
            try {
                newURL = newURL.replace('webvpn', 'vpn')
                const vpnResponse = await fetchUrl(newURL);
                if (vpnResponse.status) writeStreams.valid.write(`${city}\t${school}\t${newURL}\n`);
            } catch (error) {
                if (error.message && error.message.includes('redirect')) {
                    writeStreams.indeterminate.write(`${city}\t${school}\t${newURL}\n`);
                } else {
                    console.error(`Error with vpn prefix. URL ${newURL}: ${error}`);
                    writeStreams.invalid.write(`${city}\t${school}\t${newURL}\t${error}\n`);
                }
            }
        }
    }
}

async function fetchUrl(url) {
    return await axios.get(url, {
        timeout: 5000,
        maxRedirects: 5,
        httpsAgent: new https.Agent({
            rejectUnauthorized: false // 忽略 SSL 证书错误
        }),
        validateStatus: function (status) {
            return status < 600; // Resolve only if the status code is less than 600
        }
    });
}

async function processURLs(data) {
    const validStream = fs.createWriteStream(rawDir + 'validURLs.txt', { flags: 'w' });
    const invalidStream = fs.createWriteStream(rawDir + 'invalidURLs.txt', { flags: 'w' });
    const indeterminateStream = fs.createWriteStream(rawDir + 'indeterminateURLs.txt', { flags: 'w' });
    const writeStreams = {
        valid: validStream,
        invalid: invalidStream,
        indeterminate: indeterminateStream
    };

    const tasks = [];
    for (const city in data) {
        for (const school in data[city]) {
            tasks.push({ city, school, url: data[city][school] });
        }
    }

    const concurrencyLimit = 500;

    return new Promise((resolve, reject) => {
        async.eachLimit(tasks, concurrencyLimit, function (task, callback) {
            processURL(task.city, task.school, task.url, writeStreams)
                .then(() => callback())
                .catch(callback);
        }, function (err) {
            if (err) {
                console.error('A task failed:', err);
                reject(err);
            } else {
                console.log('All tasks have been processed successfully');
                Promise.all([validStream, invalidStream, indeterminateStream].map(s => new Promise((resolve, reject) => {
                    s.end(err => {
                        if (err) reject(err);
                        else resolve();
                    });
                })))
                    .then(resolve)
                    .catch(reject);
            }
        });
    });
}

axios.get('https://raw.githubusercontent.com/lcandy2/Chinese-Universities-with-Website/main/chinese_universities_with_website.json')
    .then(response => {
        const data = response.data;
        return processURLs(data);
    })
    .then(() => {
        prase(rawDir + 'validURLs.txt', dir + 'validURLs.json')
    })
    .catch(error => console.error(`Error fetching URL data: ${error}`));