const express = require("express");
const axios = require("axios");
const {
  requestPassword,
  checkPassword,
  isAdmin,
  sendResult,
  getUserState,
} = require("./auth");

class AuthController {
  constructor() {
    this.TOKEN = process.env.TOKEN;
  }

  async sendMessage(chatId, text) {
    try {
      await axios.post(
        `https://api.telegram.org/bot${this.TOKEN}/sendMessage`,
        {
          chat_id: chatId,
          text,
        }
      );
    } catch (err) {
      console.error("Telegram Error:", err.message);
    }
  }

  initWebhook(app) {
    app.post("/", async (req, res) => {
      try {
        const message = req.body.message;
        if (!message?.text) return res.sendStatus(200);

        const chatId = message.chat.id;
        const userId = message.from.id;
        const text = message.text;

        if (text === "/str") {
          await this.sendMessage(
            chatId,
            "سلام! برای ورود به بخش ادمین /login را بزنید."
          );
          return res.sendStatus(200);
        }

        if (text === "/login") {
          const reply = requestPassword(userId);
          await this.sendMessage(chatId, reply);
          return res.sendStatus(200);
        }

        const state = getUserState(userId);

        if (state === "waiting_for_password") {
          const result = checkPassword(userId, text);
          const reply = sendResult(result);
          await this.sendMessage(chatId, reply);
          return res.sendStatus(200);
        }

        if (isAdmin(userId)) {
          await this.sendMessage(
            chatId,
            "شما ادمین هستید. دستور نامعتبر است."
          );
          return res.sendStatus(200);
        }

        await this.sendMessage(chatId, "دستور نامعتبر است.");
        res.sendStatus(200);

      } catch (err) {
        console.error("Webhook Error:", err);
        res.sendStatus(200);
      }
    });
  }
}

module.exports = AuthController;
