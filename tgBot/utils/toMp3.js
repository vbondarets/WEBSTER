const ffmpeg = require('fluent-ffmpeg');
const installer = require('@ffmpeg-installer/ffmpeg')
const path = require('path');
const removeFile = require('./removeFile');

const toMp3 = async (input, output) => {
    try {
        const outputPath = path.resolve(__dirname, '../static/voices', `${output}.mp3`);
        // console.log(outputPath);
        ffmpeg.setFfmpegPath(installer.path)
        return new Promise((resolve, reject) => {
            ffmpeg(input)
                .inputOption('-t 300')
                .output(outputPath)
                .on('end', () => {
                    removeFile(input)
                    resolve(outputPath);
                })
                .on('error', (error) => {
                    reject(error.message)
                })
                .run()
        })
    } catch (error) {
        console.log('Error: ', error.message)
    }
}

module.exports = toMp3