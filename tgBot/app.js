const TelegramApi = require('node-telegram-bot-api');
require('dotenv').config()

const bot = new TelegramApi(process.env.BOT_TOKEN, {polling: true});

bot.on('message', async (message, data, more) =>{
    const text = message.text;
    const chatId = message.chat.id;
    console.log(message);
    const from = {
        name: message.from.first_name,
        id: message.from.id
    }
    router(text, chatId, from, bot);
    await bot.sendMessage(chatId, "I got your message");
});
bot.on('voice', async (message, data, more) =>{
    const text = message.text;
    const chatId = message.chat.id;
    console.log(message);
    const from = {
        name: message.from.first_name,
        id: message.from.id
    }
    router(text, chatId, from, bot);
    await bot.sendMessage(chatId, "I got your voice");
});