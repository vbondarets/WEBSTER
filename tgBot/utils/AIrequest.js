const { code } = require("telegraf/format");
const edit = require("./edit");
const OpenAi = require("./OpenAi");
const points_change = require("./points_change");

const AIrequest = async (ctx, text) => {
    try {
        var botMessage = await ctx.reply(code(`Waiting for reply from GPT ...`));
        const my_interval = points_change(botMessage, ctx);

        const answer = await OpenAi.chat([{ role: OpenAi.roles.USER, content: process.env.PROMPT_INSTRUCTION + text }], ctx);

        clearInterval(my_interval);
        if (!answer.content)
            throw answer;
        let prompts = answer.content.replace(/"/g, '').trim().replace(/^P/, 'p');

        if (prompts.indexOf("prompt:") === 0) {
            prompts = prompts.split('prompt: ').slice(-1)[0];
            botMessage.text = `Generated request by GPT: \n${prompts}`;
            await edit(ctx, botMessage);
            prompts = prompts.replace(/\.$/, '');
        } else {
            botMessage.text = `Can't generate image by your request, please try again.`;
            await edit(ctx, botMessage);
            await ctx.reply(`Bot says: \n${answer.content || JSON.stringify(error.data)}`);
            ctx.session.request_process = false;
            throw { data: 'Bad request.' };
        }

        return prompts;
    } catch (error) {
        console.log(error);
        await ctx.reply(JSON.stringify(error.data ? error.data: error.response.data));
        ctx.session.request_process = false;
    }
}

module.exports = AIrequest;