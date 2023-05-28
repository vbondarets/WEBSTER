const { Configuration, OpenAIApi } = require('openai');
const { createReadStream } = require('fs');
const edit = require('./edit');

class OpenAi {
    roles = {
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
        // ROOT: 'super-user'
    }
    constructor() {

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration)
    }

    async chat(messages, ctx) {
        try {
            const { data } = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages,
            });
            console.log(data.choices[0].message);
            return data.choices[0].message
        } catch (error) {
            console.log(error)
            await edit(ctx, JSON.stringify(error.data));
        }
    }

    async transcription(filePath) {
        try {
            const { data } = await this.openai.createTranscription(
                createReadStream(filePath),
                'whisper-1'
            )
            return data.text
        } catch (error) {
            console.log("Error: ", error)
        }
    }

    async imagine(prompts) {
        try {
            const request = {
                prompt: prompts,
                n: 4,
                size: '1024x1024',
            }
            const { data } = await this.openai.createImage(request);
            return data.data;
        } catch (error) {
            console.log("Error: ", error);
        }
    }
}
module.exports = new OpenAi()