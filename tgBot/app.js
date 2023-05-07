const { Telegraf, session } = require('telegraf');
const { message } = require('telegraf/filters');
const { code } = require('telegraf/format');
require('dotenv').config();
const createVoice = require('./utils/downloadVoice');

const OpenAi = require('./utils/OpenAi');
const { TNL } = require('tnl-midjourney-api');
const tnlRequests = require('./utils/tnlRequests');
const fs = require('fs');
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
    console.log(ctx);
    return;

});

bot.on(message('voice'), async (ctx) => {
    try {
        const edit = async (ctx, botMessage) => {
            await ctx.telegram.editMessageText(
                ctx.chat.id,
                botMessage.message_id,
                null,
                code(botMessage.text)
            );
        }

        ctx.session ??= INITIAL_SESSION
        let botMessage = await ctx.reply(code(`I get your message, waiting for reply from server ...`));
        const serverInterval = setInterval(async () => {
            const points = botMessage.text.split(' ').slice(-1)[0];
            const str = botMessage.text.split(points)[0];
            if (points === '...') {
                botMessage.text = `${str}.`
                edit(ctx, botMessage)
            }
            else if (points === '.') {
                botMessage.text = `${str}..`
                edit(ctx, botMessage)
            }
            else {
                botMessage.text = `${str}...`
                edit(ctx, botMessage)
            }
        }, 500);
        const link = await ctx.telegram.getFileLink(ctx.message.voice.file_id);
        const userId = ctx.message.from.id
        console.log(ctx.message.from);
        const voicePath = await createVoice(link, userId);
        const transcription = await OpenAi.transcription(voicePath);
        clearInterval(serverInterval);
        removeFile(voicePath);
        await ctx.telegram.editMessageText(
            ctx.chat.id,
            botMessage.message_id,
            null,
            `Your voice sounds like: \n${transcription}`
        );
        // ctx.session.messages.push({ role: OpenAi.roles.USER, content: process.env.PROMPT_INSTRUCTION + transcription });
        botMessage = await ctx.reply(code(`Waiting for reply from GPT ...`));
        const gptInterval = setInterval(async () => {
            const points = botMessage.text.split(' ').slice(-1)[0];
            const str = botMessage.text.split(points)[0];
            if (points === '...') {
                botMessage.text = `${str}.`
                edit(ctx, botMessage)
            }
            else if (points === '.') {
                botMessage.text = `${str}..`
                edit(ctx, botMessage)
            }
            else {
                botMessage.text = `${str}...`
                edit(ctx, botMessage)
            }
        }, 500);
        const AIRes = await OpenAi.chat([{ role: OpenAi.roles.USER, content: process.env.PROMPT_INSTRUCTION + transcription }]);
        clearInterval(gptInterval);
        if (AIRes.content.toLocaleLowerCase().indexOf("prompt:") === 0) {
            await ctx.telegram.editMessageText(
                ctx.chat.id,
                botMessage.message_id,
                null,
                `${AIRes.content}`
            );
            ctx.session.messages.push({ role: OpenAi.roles.ASSISTANT, content: AIRes.content });
            // console.log("res: ",AIRes.content.toLocaleLowerCase().split('prompt:').slice(-1))
            let prompts = AIRes.content.toLocaleLowerCase().split('prompt:').slice(-1)[0];
            if (prompts.split('').reverse().join('').indexOf(".") === 0) {
                prompts = prompts.slice(0, -1)
            }
            console.log(prompts);
            try {
                const response = await tnlRequests.sendReq(prompts, { userId: userId, chatId: ctx.chat.id, prompts: prompts });
                console.log(response);
                if (response.success) {
                    botMessage = await ctx.reply(code(`Your image in progress ...`));
                    setTimeout(async () => {
                        const tnl = new TNL(process.env.TNL_AUTH_TOKEN);
                        try {
                            const result = await tnl.getMessageAndProgress(response.messageId);
                            let progress = result.progress;
                            const progressMessage = await ctx.reply(code(`Progress ${progress}%`));
                            const tnlInterval = setInterval(async () => {
                                try {
                                    const result = await tnl.getMessageAndProgress(response.messageId);
                                    if (result.progress != progress) {
                                        progress = result.progress;
                                        progressMessage.text = `Progress ${progress}%`
                                        await ctx.telegram.editMessageText(
                                            ctx.chat.id,
                                            progressMessage.message_id,
                                            0,
                                            code(progressMessage.text)
                                        );
                                    }
                                    if (result.progress === 100) {
                                        clearInterval(tnlInterval);
                                        ctx.deleteMessage(progressMessage.message_id);
                                        ctx.deleteMessage(botMessage.message_id);
                                        if (result.response.imageUrl) {
                                            await ctx.reply(`Your image:`);
                                            const imageFilePath = await downloadImage(result.response.imageUrl, userId);
                                            //const imageFile = fs.readFileSync(imageFilePath)
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
                                        else {
                                            if (result.hasOwnProperty('isNaughty')) {
                                                console.log('Ban word: ', error.response.phrase);
                                                return;
                                            }
                                            else if (result.hasOwnProperty(response)) {
                                                await ctx.reply(`Ops, something went wrong: \n${error}`);
                                                console.log('Error: ', error.response);
                                                return;
                                            }
                                            else {
                                                if(result.content === "Invalid parameter"){
                                                    await ctx.reply(`Ops, something went wrong: \n${result.content}`);
                                                    await ctx.reply(`Resend me a voice message, and I will try again`);
                                                    console.log('Error: ', result);
                                                    return;
                                                }
                                                await ctx.reply(`Ops, something went wrong: \n${result}`);
                                                console.log('Error: ', result);
                                                return;
                                            }
                                        }
                                    }
                                } catch (error) {
                                    if (error.hasOwnProperty(response) && error.response.hasOwnProperty('isNaughty')) {
                                        console.log('Ban word: ', error.response.phrase);
                                        return;
                                    }
                                    else if (error.hasOwnProperty(response)) {
                                        await ctx.reply(`Ops, something went wrong: \n${error}`);
                                        console.log('Error: ', error.response);
                                        return;
                                    }
                                    else {
                                        await ctx.reply(`Ops, something went wrong: \n${error}`);
                                        console.log('Error: ', error);
                                        return;
                                    }
                                }
                            }, 1500);
                        } catch (error) {
                            if (error.hasOwnProperty(response) && error.response.hasOwnProperty('isNaughty')) {
                                console.log('Ban word: ', error.response.phrase);
                                return;
                            }
                            else if (error.hasOwnProperty(response)) {
                                await ctx.reply(`Ops, something went wrong: \n${error}`);
                                console.log('Error: ', error.response);
                                return;
                            }
                            else {
                                await ctx.reply(`Ops, something went wrong: \n${error}`);
                                console.log('Error: ', error);
                                return;
                            }
                        }
                    }, 3000)
                }
            } catch (error) {
                if (error.hasOwnProperty(response) && error.response.hasOwnProperty('isNaughty')) {
                    console.log('Ban word: ', error.response.phrase);
                    return;
                }
                else if (error.hasOwnProperty(response)) {
                    await ctx.reply(`Ops, something went wrong: \n${error}`);
                    console.log('Error: ', error.response);
                    return;
                }
                else {
                    await ctx.reply(`Ops, something went wrong: \n${error}`);
                    console.log('Error: ', error);
                    return;
                }
            }
        }
        else {
            await ctx.telegram.editMessageText(
                ctx.chat.id,
                botMessage.message_id,
                null,
                `Can't generate image by your request, please try again`
            );
            await ctx.reply(`Bot says: \n${AIRes.content}`);
            return;
        }
    } catch (error) {
        // clearInterval();
        if (error.hasOwnProperty(response) && error.response.hasOwnProperty('isNaughty')) {
            console.log('Ban word: ', error.response.phrase);
            return;
        }
        else if (error.hasOwnProperty(response)) {
            await ctx.reply(`Ops, something went wrong: \n${error}`);
            console.log('Error: ', error.response);
            return;
        }
        else {
            await ctx.reply(`Ops, something went wrong: \n${error}`);
            console.log('Error: ', error);
            return;
        }
    }
});
