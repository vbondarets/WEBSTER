const { code } = require('telegraf/format');

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

module.exports = edit;