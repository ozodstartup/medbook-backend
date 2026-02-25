const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { webHook: true });

// Webhook ni o‘rnatamiz
bot.setWebHook(`${process.env.BACKEND_URL}/webhook`);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
`MedBook botga xush kelibsiz ✅

MedBook saytida qaysi telefon raqam bilan ro'yxatdan o'tgan bo'lsangiz,
o'sha raqamni yozing.

Masalan:
998901234567`
  );
});

bot.on("message", async (msg) => {
  if (msg.text === "/start") return;

  const telegramId = msg.from.id;
  const phone = msg.text.trim();

  try {
    await axios.post(`${process.env.BACKEND_URL}/api/telegram/connect`, {
      telegramId,
      phone,
    });

    bot.sendMessage(msg.chat.id, "Telegram muvaffaqiyatli ulandi 🎉");
  } catch (error) {
    bot.sendMessage(
      msg.chat.id,
      "Bu telefon MedBook tizimida topilmadi ❌\nIltimos, saytda ro'yxatdan o'tgan raqamingizni kiriting."
    );
  }
});

module.exports = bot;