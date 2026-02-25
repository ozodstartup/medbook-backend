const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/connect", async (req, res) => {
  const { telegramId, phone } = req.body;

  // Telefonni tozalaymiz
  const cleanedPhone = phone.replace(/\D/g, "");

  const user = await User.findOne({
    phone: { $regex: cleanedPhone }
  });

  if (!user) {
    return res.status(404).json({ message: "User topilmadi" });
  }

  user.telegramId = telegramId;
  await user.save();

  res.json({ message: "Telegram ulandi" });
});

module.exports = router;
