const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Bot ishlayapti 🚀");
});

module.exports = bot;
