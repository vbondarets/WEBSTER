const { Telegraf, session } = require('telegraf');
const { message } = require('telegraf/filters');
const TNL = require('./utils/midjourney_api');
const AIrequest = require('./utils/AIrequest');
const { midjourney_imagine, midjourney_button } = require('./utils/generating_requests');
require('dotenv').config();

const removeFile = require('./utils/removeFile');
const voice_transcription = require('./utils/voice_transcription');

const bot = new Telegraf(process.env.BOT_TOKEN);
const tnl = new TNL(process.env.TNL_AUTH_TOKEN);
const actionQueue = [];

bot.use(session({ defaultSession: () => ({ link_img: undefined, request_process: false, webster_id: undefined }) }));

const { Markup } = require("telegraf");
const { default: axios } = require('axios');

const get_webster_id = async (ctx) => {
    try {
        const { data } = await axios.post('https://webster.pp.ua/api/user/getter/', { username: (await ctx.telegram.getChat(ctx.chat.id)).username });
        ctx.session.webster_id = data.id;
        ctx.answerCbQuery('Authorization successful.');
    } catch (error) {
        console.log(error)
        ctx.answerCbQuery('Authorization error.');
    }
}

const start_keyboard = Markup.keyboard([
    [`Let's see. 👀`],
]).resize(true).oneTime(true);

const save_keyboard = Markup.inlineKeyboard([
    Markup.button.callback('Login', 'login'),
    Markup.button.login('Login on Webster', 'https://webster.pp.ua/auth', {
        bot_username: 'WEBSTER_assistant_bot',
        request_write_access: true,
    }),
]).resize(true);

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
    try {
        ctx.reply(`Hello, my name is WEBSTER-assistant, I'm your web assistant in image generating.`, start_keyboard);
    } catch (error) {
        console.log(error);
    }
});

bot.on('connected_website', async (ctx) => {
    try {
        ctx.reply(`Hello, my name is WEBSTER-assistant, I'm your web assistant in image generating.`, start_keyboard);
    } catch (error) {
        console.log(error);
    }
});

bot.hears(`Let's see. 👀`, async (ctx) => {
    try {
        ctx.reply(`For generation, you can send a text✍️ or voice🗣 message. Also send a picture🖼 (using compression) for editing.\nThe pictures will have different buttons, and depending on its type, a request will be made for different variations🤔 of "V1-V2" or a choice from the set🔎 "U1-U4".\nThere is also a "Save"💾 button, but it is available to those users who are authorized✅ on the site.`);
    } catch (error) {
        console.log(error);
    }
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

bot.action('login', async (ctx) => {
    get_webster_id(ctx);
})

bot.action('save', async (ctx) => {
    try {
        if (ctx.session.webster_id) {
            (async () => {
                try {
                    const link = (await ctx.telegram.getFileLink(ctx.callbackQuery.message.photo[ctx.callbackQuery.message.photo.length - 1].file_id)).href;
                    await axios.post('https://webster.pp.ua/api/images/telegram', { id: ctx.session.webster_id, url: link });
                    ctx.answerCbQuery('Image saved.');
                } catch (error) {
                    console.log(error);
                    ctx.answerCbQuery('Image save error.');
                }
            })()
        } else {
            ctx.reply('Have you ever logged in to the site using Telegram?\nIf yes, then use the "Login" button, and if not, then click the "Login on Webster" button, then return to the chat and click the first button.', save_keyboard);
        }
        return;
    } catch (error) {
        console.log(error);
    }
});

bot.on(message('text'), async (ctx) => {
    try {
        if (ctx.session.request_process) {
            ctx.reply('Please, wait. Your image in progress.');
            return;
        }
        ctx.session.request_process = true;
        (async () => {
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
            const link = await ctx.telegram.getFile(ctx.message.photo[ctx.message.photo.length - 1].file_id);
            if (ctx.session.link_img) {
                await ctx.reply('Image changed.')
            } else {
                await ctx.reply('Send me text or voice message with theme for generate img or another img for change choiсe.');
            }
            ctx.session.link_img = link.href;
        })()

        return;

    } catch (error) {
        console.log(error);
    }
});

bot.launch();