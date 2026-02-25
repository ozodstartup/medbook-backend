const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/connect", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { telegramId, phone } = req.body;

    if (!telegramId || !phone) {
      return res.status(400).json({ message: "Ma'lumot yetarli emas" });
    }

    // Telefonni tozalaymiz (+, probel, tire olib tashlanadi)
    const cleanedPhone = phone.replace(/\D/g, "");
    console.log("CLEANED PHONE:", cleanedPhone);

    // Bazadagi telefonni ham regex orqali tekshiramiz
    const user = await User.findOne({
      phone: { $regex: cleanedPhone }
    });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(404).json({ message: "User topilmadi" });
    }

    user.telegramId = telegramId;
    await user.save();

    res.json({ message: "Telegram ulandi" });

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;