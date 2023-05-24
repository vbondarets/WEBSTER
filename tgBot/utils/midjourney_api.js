const { default: axios } = require("axios");

class TNL {
    header;

    constructor(token) {
        this.header = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        }
    }

    imagine = async (msg, ref = '', webhookOverride = '') => {
        const request = {
            msg: msg,
            ref: ref,
            webhookOverride: webhookOverride,
        };
        const { data } = await axios.post('https://api.thenextleg.io/v2/imagine', request, this.header);
        return data;
    }

    button = async (button, buttonMessageId, ref = '', webhookOverride = '') => {
        const request = {
            button: button,
            buttonMessageId: buttonMessageId,
            ref: ref,
            webhookOverride: webhookOverride,
        }
        const { data } = await axios.post('https://api.thenextleg.io/v2/button', request, this.header);
        return data;
    }

    img2img = async (msg, imgUrl, ref = '', webhookOverride = '') => {
        const request = {
            msg: `${imgUrl} ${msg}`,
            ref: ref,
            webhookOverride: webhookOverride,
        }
        const { data } = await axios.post('https://api.thenextleg.io/v2/imagine', request, this.header);
        return data;
    }

    getMessageAndProgress = async (messageId, expireMins = 3) => {
        const { data } = await axios.get(`https://api.thenextleg.io/v2/message/${messageId}?expireMins=${expireMins}`, this.header);
        return data;
    }
}

module.exports = TNL;