const createVoice = require('./downloadVoice');
const edit = require('./edit');
const OpenAi = require('./OpenAi');
const points_change = require('./points_change');

const voice_transcription = async (ctx, userId) => {
    try {
        let botMessage = await ctx.reply(code(`I get your message, waiting for transcription from server ...`));
        const my_interval = points_change(botMessage, ctx);

        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
        const voicePath = await createVoice(link, userId);
        const transcription = await OpenAi.transcription(voicePath);

        clearInterval(my_interval);

        botMessage.text = `Your voice sounds like: \n${transcription}`;
        await edit(ctx, botMessage);

        return { transcription, voicePath };
    } catch (error) {
        console.log(error);
    }
}

exports.exports = voice_transcription;