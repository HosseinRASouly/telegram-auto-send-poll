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


    async getKeyboardsBot(chatId) {

        try {
            await axios.post(
                `https://api.telegram.org/bot${this.TOKEN}/sendMessage`,
                {
                  chat_id: chatId,
                  text:  "برای شروع گزینه موردنظر خودتو انتخاب کن ⬇️⬇️ \n روی هر بخش کلیک کنی درمورد اینکه چیکار کنی توضیح میده 😉",
                  reply_markup: {
                    keyboard: [
                      ["✏️ تغییر یک نظرسنجی", "➕ اضافه کردن نظرسنجی جدید"],
                      ["❌ حذف یک نظرسنجی", "👀 مشاهده همه نظرسنجی ها"]
                    ],
                    resize_keyboard: true,
                    persistent_keyboard: true
                  }
                }
              );
              
        } catch (err) {
          console.error("Telegram Error:", err.message);
        }
      }
}

module.exports = new sendMessage()