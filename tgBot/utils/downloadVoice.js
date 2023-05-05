const axios = require('axios');
const {createWriteStream, createWriteStreamSync} = require('fs');
const path = require('path');
const toMp3 = require('./toMp3');
// const {fileURLToPath} = require('url');


const createVoice = async(url, filename) => {
    try {
        const oggPath = path.resolve(__dirname, '../static/voices', `${filename}.ogg`)
        const {data} = await axios({
            method: 'get',
            url,
            responseType: 'stream',
        });
        return new Promise((resolve) => {
            const stream = createWriteStream(oggPath);
            data.pipe(stream);
            stream.on('finish', async() => {
                resolve(await toMp3(oggPath, filename));
                // resolve(oggPath);
            })
        })
    } catch (error) {
        console.log('Error: ', error.message)
    }
}
module.exports = createVoice