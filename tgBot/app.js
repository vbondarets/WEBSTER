const { Telegraf, session } = require('telegraf');
const { message } = require('telegraf/filters');
const { code } = require('telegraf/format');
require('dotenv').config();
const createVoice = require('./utils/downloadVoice');

const OpenAi = require('./utils/OpenAi');
const { TNL } = require('tnl-midjourney-api');
const downloadImage = require('./utils/downloadImage');
const removeFile = require('./utils/removeFile');

// const bot2 = new TelegramApi(process.env.BOT_TOKEN, {polling: true});


let INITIAL_SESSION = {
    messages: [],
}

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.launch()

bot.use(session());

bot.command('new', async (ctx) => {
    ctx.session = INITIAL_SESSION
    await ctx.reply(`Context cleared, waiting for your voice or text message`);
    return;
});

bot.command('start', async (ctx) => {
    ctx.session = INITIAL_SESSION
    await ctx.reply(`Hello, my name is WEBSTER-assistant, i'm your web assistant in image generating, send me a vioce with description of an image what you want to get`);
    return;
});

bot.on(message('text'), async (ctx) => {
    try {
        ctx.session ??= INITIAL_SESSION

        const userId = ctx.message.from.id;

        await ctx.reply(`Your message looks like: \n${ctx.message.text}`);

        const prompts = await AIrequest(ctx, ctx.message.text);
        if (!prompts)
            return;

        await midjourney_request(userId, ctx, prompts);
        return;

    } catch (error) {
        console.log(error);
    }
    return;

});


bot.on(message('voice'), async (ctx) => {
    try {
        ctx.session ??= INITIAL_SESSION

        const userId = ctx.message.from.id;
        const { transcription, voicePath } = await voice_transcription(ctx, userId);

        const prompts = await AIrequest(ctx, transcription);
        if (!prompts)
            return;

        removeFile(voicePath);

        await midjourney_request(userId, ctx, prompts);
        return;

    } catch (error) {
        console.log(error);
    }
});

const edit = async (ctx, botMessage, if_Code = false) => {
    try {
        if (if_Code) {
            await ctx.telegram.editMessageText(
                ctx.chat.id,
                botMessage.message_id,
                null,
                code(botMessage.text),
            );
        } else {
            await ctx.telegram.editMessageText(
                ctx.chat.id,
                botMessage.message_id,
                null,
                botMessage.text,
            );
        }
    } catch (error) {
        console.log(error);
    }
}

const points_change = (botMessage, ctx) => {
    return setInterval(() => {
        const points = botMessage.text.split(' ').slice(-1)[0];
        const str = botMessage.text.split(points)[0];
        if (points === '...') {
            botMessage.text = `${str}.`
            edit(ctx, botMessage, true)
        }
        else if (points === '.') {
            botMessage.text = `${str}..`
            edit(ctx, botMessage, true)
        }
        else {
            botMessage.text = `${str}...`
            edit(ctx, botMessage, true)
        }
    }, 500);
}

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

const AIrequest = async (ctx, text) => {
    try {
        let botMessage = await ctx.reply(code(`Waiting for reply from GPT ...`));
        const my_interval = points_change(botMessage, ctx);

        const answer = await OpenAi.chat([{ role: OpenAi.roles.USER, content: process.env.PROMPT_INSTRUCTION + text }]);

        clearInterval(my_interval);
        let prompts = undefined;

        if (answer.content.indexOf("Prompt:") === 0 || answer.content.indexOf("prompt:") === 0) {
            answer.content.indexOf("Prompt:") === 0 ? prompts = answer.content.split('Prompt: ').slice(-1)[0]
                : prompts = answer.content.split('prompt: ').slice(-1)[0];
            botMessage.text = `Generated request by GPT: \n${prompts}`;
            await edit(ctx, botMessage);

            ctx.session.messages.push({ role: OpenAi.roles.ASSISTANT, content: answer.content });
            prompts = prompts.toLocaleLowerCase();

            if (prompts.split('').reverse().join('').indexOf(".") === 0) {
                prompts = prompts.slice(0, -1)
            }

        } else {
            botMessage.text = `Can't generate image by your request, please try again.`;
            await edit(ctx, botMessage);
            await ctx.reply(`Bot says: \n${answer.content}`);
        }

        return prompts;
    } catch (error) {
        console.log(error);
    }
}

const midjourney_request = async (userId, ctx, prompt) => {
    try {
        const tnl = new TNL(process.env.TNL_AUTH_TOKEN);

        var botMessage_1 = await ctx.reply(code(`Your image in progress ...`));
        var my_interval_1 = points_change(botMessage_1, ctx);

        const tnl_request = await tnl.imagine(prompt, { userId, chatId: ctx.chat.id, prompt }, 'https://webster.pp.ua/api/images');

        await new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });

        var botMessage_2 = await ctx.reply(code(`Progress 0%`));
        let back_progress = 0;
        var my_interval_2 = setInterval(async () => {
            const { progress, response } = await tnl.getMessageAndProgress(tnl_request.messageId, 3);
            if (back_progress != progress) {
                botMessage_2.text = `Progress ${progress}%`;
                await edit(ctx, botMessage_2, true);
            }
            back_progress = progress;
            if (progress === 'incomplete')
                throw response;
            if (progress === 100) {
                clearInterval(my_interval_1);
                clearInterval(my_interval_2);

                await ctx.deleteMessage(botMessage_2.message_id);

                if (response.imageUrl) {
                    botMessage_1.text = `Your image:`;
                    await edit(ctx, botMessage_1);

                    const imageFilePath = await downloadImage(response.imageUrl, userId);

                    const fileType = imageFilePath.split('.').pop();
                    await ctx.telegram.sendPhoto(ctx.chat.id, {
                        source: imageFilePath,
                        filename: `${ctx.message.from.first_name}.${fileType}`
                    });

                    await ctx.telegram.sendDocument(ctx.chat.id, {
                        source: imageFilePath,
                        filename: `${ctx.message.from.first_name}.${fileType}`
                    });
                    removeFile(imageFilePath);
                }
            }
        }, 1500);
    } catch (error) {
        clearInterval(my_interval_1);
        clearInterval(my_interval_2);
        if (botMessage_2) {
            await ctx.deleteMessage(botMessage_2.message_id);
        }
        if (error.response.hasOwnProperty('data')) {
            botMessage_1.text = `Ban word: ${error.response.data.phrase}`;
            await edit(ctx, botMessage_1);
        } else {
            console.log(error)
        }
    }
}