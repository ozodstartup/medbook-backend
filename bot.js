const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "MedBook botga xush kelibsiz ✅\n\nTelefon raqamingizni yuboring:",
    {
      reply_markup: {
        keyboard: [[{ text: "📱 Telefon yuborish", request_contact: true }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
});

bot.on("contact", async (msg) => {
  const telegramId = msg.from.id;
  const phone = msg.contact.phone_number;

  try {
    await axios.post("https://medbook-backend-6.onrender.com/api/telegram/connect", {
      telegramId,
      phone,
    });

    bot.sendMessage(msg.chat.id, "Telegram muvaffaqiyatli ulandi 🎉");
  } catch (error) {
    bot.sendMessage(msg.chat.id, "Xatolik yuz berdi ❌");
  }
});

module.exports = bot;
