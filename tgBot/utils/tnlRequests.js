const { createReadStream } = require('fs');
const axios = require('axios');
const { TNL } = require('tnl-midjourney-api');


class TNLReq {
    async sendReq(prompts, ref) {
        try {
            const tnl = new TNL(process.env.TNL_AUTH_TOKEN); 
            const response = await tnl.imagine(prompts, ref, 'https://webster.pp.ua/api/images');
            return response;
        } catch (error) {
            console.log("Error: ", error.response.data)
        }
    }
    async getImage(imageId) {
        try {
            setTimeout(async () => {
                const tnl = new TNL(process.env.TNL_AUTH_TOKEN); 
                return await tnl.getMessageAndProgress(imageId, 2);
            }, 2000)
        } catch (error) {
            console.log("Error: ", error.response.data)
        }
    }
    async deleteImage(filePath) {
        try {

        } catch (error) {
            console.log("Error: ", error)
        }
    }
}
module.exports = new TNLReq()