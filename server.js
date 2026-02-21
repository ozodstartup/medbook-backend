require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const cron = require("node-cron");
const Appointment = require("./models/Appointment");
const User = require("./models/User");
const bot = require("./bot");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Telegram webhook
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Telegram connect route
app.use("/api/telegram", require("./routes/telegram"));

app.use('/api/auth', require('./routes/auth'));

app.get("/", (req, res) => {
  res.send("MedBook API ishlayapti");
});

// 🔔 Reminder system
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const next30Min = new Date(now.getTime() + 30 * 60000);

  const appointments = await Appointment.find({
    date: { $gte: now, $lte: next30Min },
    reminded: false
  }).populate("patient doctor");

  for (let appt of appointments) {
    if (appt.patient?.telegramId) {
      bot.sendMessage(
        appt.patient.telegramId,
        `🩺 Eslatma!\nBugun ${appt.date.toLocaleTimeString()} da shifokor bilan uchrashuv bor.`
      );
    }

    if (appt.doctor?.telegramId) {
      bot.sendMessage(
        appt.doctor.telegramId,
        `📅 Eslatma!\n${appt.date.toLocaleTimeString()} da bemor bilan uchrashuv bor.`
      );
    }

    appt.reminded = true;
    await appt.save();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MedBook backend running on port ${PORT}`);
});



