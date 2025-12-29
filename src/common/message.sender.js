const axios = require('axios');
class sendMessage {
    TOKEN;
    constructor() {
        this.TOKEN = process.env.TOKEN;
    }
    async sendAMessage(chatId, text) {

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
}

module.exports = new sendMessage()