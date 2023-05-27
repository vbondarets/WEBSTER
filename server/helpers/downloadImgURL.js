const axios = require('axios');
const { createWriteStream } = require('fs');
const uuid = require('uuid');
const path = require('path');


const downloadImageURL = async (url) => {
    try {
        const splitedURL = url.split(/[/.]+/);
        const filename = `${uuid.v4()}.${splitedURL[splitedURL.length - 1]}`;
        const imgPath = path.resolve(__dirname, '../static/images', filename);
        const { data } = await axios({
            method: 'get',
            url,
            responseType: 'stream',
        });
        return new Promise((resolve) => {
            const stream = createWriteStream(imgPath);
            data.pipe(stream);
            stream.on('finish', async () => {
                resolve(`https://webster.pp.ua/api/images/${filename}`);
            })
        })
    } catch (error) {
        console.log('Error: ', error.message);
        return error;
    }
}
module.exports = downloadImageURL;