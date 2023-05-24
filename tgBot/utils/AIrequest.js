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
        let prompts = undefined;

        if (answer.content?.indexOf("Prompt:") === 0 || answer.content?.indexOf("prompt:") === 0) {
            answer.content.indexOf("Prompt:") === 0 ? prompts = answer.content.split('Prompt: ').slice(-1)[0]
                : prompts = answer.content.split('prompt: ').slice(-1)[0];
            botMessage.text = `Generated request by GPT: \n${prompts}`;
            await edit(ctx, botMessage);

            prompts = prompts.toLocaleLowerCase();

            if (prompts.split('').reverse().join('').indexOf(".") === 0) {
                prompts = prompts.slice(0, -1)
            }

        } else {
            botMessage.text = `Can't generate image by your request, please try again.`;
            await edit(ctx, botMessage);
            await ctx.reply(`Bot says: \n${answer.content || JSON.stringify(error.data)}`);
        }

        return prompts;
    } catch (error) {
        console.log(error);
        await edit(ctx, error.message);
    }
}

module.exports = AIrequest;