const {Configuration, OpenAIApi} = require('openai');
const {createReadStream} = require('fs');

class OpenAi {
    roles ={
        ASSISTANT: 'assistant',
        USER: 'user',
        SYSTEM: 'system',
        // ROOT: 'super-user'
    }
    constructor(){

        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });
        this.openai = new OpenAIApi(configuration)
    }

    async chat(messages){
        try {
            // const instructions = await this.openai.createChatCompletion({
            //     model: 'gpt-3.5-turbo',
            //     messages: [{role: 'user', content: process.env.PROMPT_INSTRUCTION}]
            // });
            // console.log(instructions.data.choices[0].message)
            const {data} = await this.openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages
            });
            console.log(data.choices[0].message);
            return data.choices[0].message
        } catch (error) {
            console.log("Error: ", error.response.data)
        }
    }
    async transcription(filePath){
        try {
            const {data} = await this.openai.createTranscription(
                createReadStream(filePath),
                'whisper-1'
            )
            return data.text
        } catch (error) {
            console.log("Error: ", error)
        }
    }
}
module.exports = new OpenAi()