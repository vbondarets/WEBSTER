const { Telegraf, session } = require('telegraf');
const { message } = require('telegraf/filters');
const TNL = require('./utils/midjourney_api');
const AIrequest = require('./utils/AIrequest');
const { midjourney_imagine, midjourney_button } = require('./utils/midjourney_requests');
require('dotenv').config();

const removeFile = require('./utils/removeFile');
const voice_transcription = require('./utils/voice_transcription');

const bot = new Telegraf(process.env.BOT_TOKEN);
const tnl = new TNL(process.env.TNL_AUTH_TOKEN);
const actionQueue = [];

bot.launch();
bot.use(session({ defaultSession: () => ({ link_img: undefined, request_process: false }) }));

setInterval(async () => {
    if (actionQueue.length > 0) {
        const func = actionQueue.shift();
        if (func) {
            const ctx = await func();
            ctx.session.request_process = false;
            ctx.session.link_img = undefined;
        }
    }
}, 1200);

bot.start(async (ctx) => {
    await ctx.reply(`Hello, my name is WEBSTER-assistant, I'm your web assistant in image generating, send me a vioce with description of an image what you want to get.`);
    return;
});

bot.command('new', async (ctx) => {
    await ctx.reply(`Context cleared, waiting for your voice or text message`);
    return;
});

bot.action(/^([a-zA-Z0-9]+)+(-[a-zA-Z0-9]+)$/, async (ctx) => {
    try {
        if (ctx.session.request_process) {
            ctx.answerCbQuery('Please, wait. Your image in progress.');
            return;
        }
        ctx.session.request_process = true;
        (async () => {
            const arr = ctx.match[0].split('-');
            console.log('work')
            actionQueue.push(async () => {
                await midjourney_button(ctx, arr[1], arr[0], tnl);
                return ctx;
            });
        })()
        return;
    } catch (error) {
        console.log(error);
    }
});

bot.on('connected_website', async (ctx) => {
    await ctx.reply(`Hello, my name is WEBSTER-assistant, I'm your web assistant in image generating, send me a vioce with description of an image what you want to get.`);
    return;
});

bot.on(message('text'), async (ctx) => {
    try {
        if (ctx.session.request_process) {
            ctx.reply('Please, wait. Your image in progress.');
            return;
        }
        ctx.session.request_process = true;
        (async () => {
            console.log('wokr')
            await ctx.reply(`Your message looks like: \n${ctx.message.text}`);

            const prompts = await AIrequest(ctx, ctx.message.text);
            if (!prompts)
                return;
            actionQueue.push(async () => {
                await midjourney_imagine(ctx, prompts, tnl, ctx.session.link_img);
                return ctx;
            });
        })()
        return;

    } catch (error) {
        console.log(error);
    }
    return;

});


bot.on(message('voice'), async (ctx) => {
    try {
        if (ctx.session.request_process) {
            ctx.reply('Please, wait. Your image in progress.');
            return;
        }
        ctx.session.request_process = true;
        (async () => {
            const userId = ctx.message.from.id;

            const { transcription, voicePath } = await voice_transcription(ctx, userId);

            const prompts = await AIrequest(ctx, transcription);
            if (!prompts)
                return;

            removeFile(voicePath);

            actionQueue.push(async () => {
                await midjourney_imagine(ctx, prompts, tnl, ctx.session.link_img);
                return ctx;
            });
        })()
        return;

    } catch (error) {
        console.log(error);
    }
});

bot.on(message('photo'), async (ctx) => {
    try {
        if (ctx.session.request_process) {
            ctx.reply('Please, wait. Your image in progress.');
            return;
        }
        (async () => {
            const link = await ctx.telegram.getFileLink(ctx.message.photo[ctx.message.photo.length - 1].file_id);
            ctx.session.link_img = link.href;

            await ctx.reply('Send me text or voice message with theme for generate img.');
        })()

        return;

    } catch (error) {
        console.log(error);
    }
});