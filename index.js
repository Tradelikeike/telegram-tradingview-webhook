const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/", async (req, res) => {
  const message = req.body.message || "❌ No message received";

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });

    console.log("✅ Sent to Telegram:", message);
    res.send("OK");
  } catch (err) {
    console.error("❌ Telegram error:", err.response?.data || err.message);
    res.status(500).send("Telegram Error");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
