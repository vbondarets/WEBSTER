const { Markup } = require("telegraf");
const { code } = require("telegraf/format");
const downloadImage = require("./downloadImage");
const edit = require("./edit");
const points_change = require("./points_change");
const removeFile = require("./removeFile");

const progress_interval = async (ctx, tnl_request, tnl) => {
    try {
        var botMessage_2 = await ctx.reply(code(`Progress 0%`));
        let back_progress = 0;
        return await new Promise(function (resolve) {
            var my_interval_2 = setInterval(async () => {
                try {
                    let my_result = await tnl.getMessageAndProgress(tnl_request.messageId, 3);
                    let { progress, response } = my_result;

                    if (back_progress != progress) {
                        botMessage_2.text = `Progress ${progress}%`;
                        await edit(ctx, botMessage_2, true);
                    }
                    back_progress = progress;
                    if (progress === 'incomplete') {
                        console.log("err");
                        throw my_result;
                    }
                    if (progress === 100) {
                        clearInterval(my_interval_2);

                        await ctx.deleteMessage(botMessage_2.message_id);

                        console.log(response)
                        resolve(response);

                    }
                } catch (error) {
                    console.log(error)
                    clearInterval(my_interval_2);
                    await ctx.deleteMessage(botMessage_2.message_id);
                    if (error.response.hasOwnProperty('data')) {
                        await ctx.reply(JSON.stringify(error.response.data));
                    }
                    if (error.hasOwnProperty('progress')) {
                        await ctx.reply((error.progress));
                    }
                    resolve(error?.response)
                }
            }, 1500);
        });
    } catch (error) {
        console.log(error);
    }
}

const photo_reply = async (ctx, response, keyboard = []) => {
    try {
        if (response.imageUrl) {
            await ctx.reply(`Your image:`);

            const imageFilePath = await downloadImage(response.imageUrl);

            await ctx.replyWithPhoto(
                { source: imageFilePath },
                {
                    parse_mode: "Markdown",
                    ...Markup.inlineKeyboard([
                        keyboard.slice(0, 4).map((element) => {
                            return Markup.button.callback(element.text, element.data, element.hide);
                        }),
                        keyboard.slice(4, 8).map((element) => {
                            return Markup.button.callback(element.text, element.data, element.hide);
                        }),
                    ]
                    ).resize(true),
                },
            );

            await ctx.replyWithDocument(
                { source: imageFilePath },
            );

            removeFile(imageFilePath);
        }
    } catch (error) {
        console.log(error);
    }
}

const midjourney_imagine = async (ctx, prompt, tnl) => {
    try {

        var botMessage_1 = await ctx.reply(code(`Your image in progress ...`));
        var my_interval_1 = points_change(botMessage_1, ctx);

        // const tnl_request = await tnl.imagine(prompt, { userId, chatId: ctx.chat.id, prompt }, 'https://webster.pp.ua/api/images');
        const tnl_request = await tnl.imagine(prompt);


        await new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });

        const response = await progress_interval(ctx, tnl_request, tnl);

        clearInterval(my_interval_1);

        await ctx.deleteMessage(botMessage_1.message_id);

        const keyboard = response.buttons.map((element) => {
            return { text: element, data: `${response.buttonMessageId}-${element}`, hide: false };
        })

        await photo_reply(ctx, response, keyboard);

    } catch (error) {
        console.log(error)
        clearInterval(my_interval_1);
        await ctx.deleteMessage(botMessage_1.message_id);
        if (error.response.hasOwnProperty('data')) {
            await ctx.reply(JSON.stringify(error.response.data));
        }
    }
}

const midjourney_button = async (ctx, button_type, buttonMessageId, tnl) => {
    try {

        var botMessage_1 = await ctx.reply(code(`Your image in progress ...`));
        var my_interval_1 = points_change(botMessage_1, ctx);

        // const tnl_request = await tnl.button(button_type, buttonMessageId, { userId, chatId: ctx.chat.id, prompt }, 'https://webster.pp.ua/api/images');
        const tnl_request = await tnl.button(button_type, buttonMessageId);


        await new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });

        const response = await progress_interval(ctx, tnl_request, tnl);

        clearInterval(my_interval_1);

        await ctx.deleteMessage(botMessage_1.message_id);

        let keyboard = [];

        if (button_type[0] === 'V')
            keyboard = response.buttons.map((element) => {
                return { text: element, data: `${response.buttonMessageId}-${element}`, hide: false };
            })

        await photo_reply(ctx, response, keyboard);

    } catch (error) {
        console.log(error)
        clearInterval(my_interval_1);
        await ctx.deleteMessage(botMessage_1.message_id);
        if (error.response.hasOwnProperty('data')) {
            await ctx.reply(JSON.stringify(error.response.data));
        }
    }
}

const midjourney_img2img = async (ctx, prompt, imgUrl, tnl) => {
    try {
        var botMessage_1 = await ctx.reply(code(`Your image in progress ...`));
        var my_interval_1 = points_change(botMessage_1, ctx);
        console.log(imgUrl)

        // const tnl_request = await tnl.button(button_type, buttonMessageId, { userId, chatId: ctx.chat.id, prompt }, 'https://webster.pp.ua/api/images');
        const tnl_request = await tnl.img2img(prompt, imgUrl);


        await new Promise((resolve) => {
            setTimeout(resolve, 3000);
        });

        const response = await progress_interval(ctx, tnl_request, tnl);

        clearInterval(my_interval_1);

        await ctx.deleteMessage(botMessage_1.message_id);

        const keyboard = response.buttons.map((element) => {
            return { text: element, data: `${response.buttonMessageId}-${element}`, hide: false };
        })

        await photo_reply(ctx, response, keyboard);

    } catch (error) {
        console.log(error)
        clearInterval(my_interval_1);
        await ctx.deleteMessage(botMessage_1.message_id);
        if (error.response.hasOwnProperty('data')) {
            await ctx.reply(JSON.stringify(error.response.data));
        }
    }
}

module.exports = { midjourney_imagine, midjourney_button, midjourney_img2img };