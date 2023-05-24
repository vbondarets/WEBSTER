const { Telegraf, session } = require('telegraf');
const { message } = require('telegraf/filters');
const TNL = require('./utils/midjourney_api');
const AIrequest = require('./utils/AIrequest');
const { midjourney_imagine, midjourney_button, midjourney_img2img } = require('./utils/midjourney_requests');
require('dotenv').config();

const removeFile = require('./utils/removeFile');
const voice_transcription = require('./utils/voice_transcription');

const bot = new Telegraf(process.env.BOT_TOKEN);
const tnl = new TNL(process.env.TNL_AUTH_TOKEN);
const actionQueue = [];
let isProcessingQueue = false;

bot.launch();
bot.use(session({ defaultSession: () => ({ link_img: undefined }) }));


bot.command('new', async (ctx) => {
    await ctx.reply(`Context cleared, waiting for your voice or text message`);
    return;
});

bot.command('start', async (ctx) => {
    await ctx.reply(`Hello, my name is WEBSTER-assistant, i'm your web assistant in image generating, send me a vioce with description of an image what you want to get`);
    return;
});

bot.action(/^([a-zA-Z0-9]+)+(-[a-zA-Z0-9]+)$/, async (ctx) => {
    try {
        const arr = ctx.match[0].split('-');
        actionQueue.push(async () => {
            await midjourney_button(ctx, arr[1], arr[0], tnl);
        });
        processActionQueue();
        return;
    } catch (error) {
        console.log(error);
    }
});

const processActionQueue = async () => {
    if (isProcessingQueue) return;
    isProcessingQueue = true;

    while (actionQueue.length > 0) {
        const nextAction = actionQueue.shift();
        if (nextAction) {
            await nextAction();
        }
    }

    isProcessingQueue = false;
};

bot.on(message('text'), async (ctx) => {
    try {

        await ctx.reply(`Your message looks like: \n${ctx.message.text}`);

        const prompts = await AIrequest(ctx, ctx.message.text);
        if (!prompts)
            return;

        ctx.session.link_img ? await midjourney_img2img(ctx, prompts, ctx.session.link_img, tnl)
            : await midjourney_imagine(ctx, prompts, tnl);
        ctx.session.link_img = undefined;
        return;

    } catch (error) {
        console.log(error);
    }
    return;

});


bot.on(message('voice'), async (ctx) => {
    try {
        const userId = ctx.message.from.id;

        const { transcription, voicePath } = await voice_transcription(ctx, userId);

        const prompts = await AIrequest(ctx, transcription);
        if (!prompts)
            return;

        removeFile(voicePath);

        ctx.session.link_img ? await midjourney_img2img(ctx, prompts, ctx.session.link_img, tnl)
            : await midjourney_imagine(ctx, prompts, tnl);
        ctx.session.link_img = undefined;
        return;

    } catch (error) {
        console.log(error);
    }
});

bot.on(message('photo'), async (ctx) => {
    try {
        console.log(ctx.message.photo[3])
        const link = await ctx.telegram.getFileLink(ctx.message.photo[3].file_id);
        ctx.session.link_img = link.href;
        console.log(link);

        ctx.reply('Send me text or voice message with theme for generate img.');

        return;

    } catch (error) {
        console.log(error);
    }
});