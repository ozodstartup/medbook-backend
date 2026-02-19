require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const bot = require('./bot');

app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.use('/api/auth', require('./routes/auth'));

app.get("/", (req, res) => {
  res.send("MedBook API ishlayapti");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`MedBook backend running on port ${PORT}`);
});


