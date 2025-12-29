const {
    requestPassword,
    checkPassword,
    isAdmin,
    sendResult,
    getUserState,
  } = require("./common/modules/auth/auth.service");

const AuthController = require("./common/modules/auth/auth.controller");
const authController = require("./common/modules/auth/auth.controller");

class initWebhook {
    initWebhook(app) {
        app.post('/', async (req, res) => {

            try {
                const message = req.body.message
                if (!message?.text) return res.sendStatus(200);
      
              const chatId = message.chat.id;
              const userId = message.from.id;
              const text = message.text;
              const state = getUserState(userId);

      
              if (text === "/start") {
                AuthController.startMessage(text, userId, chatId)
                return res.sendStatus(200);
              }
      
              if (text === "/login") {
                AuthController.loginMessage(text, userId, chatId)
                return res.sendStatus(200);
              }
            
              if (state === "waiting_for_password") {
                AuthController.getPassword(text, userId, chatId)
                return res.sendStatus(200);
              }
              
            // give question
            
              if (text === "/adminPanel") {
                if (state === "admin_mode") {
                  authController.adminPanel(text , userId, chatId);
                }else {
                  authController.userNotAdmin(text , userId, chatId);
                }

                return res.sendStatus(200);
              }
      

              authController.isUserInvalidCommand(text, userId, chatId)
              res.sendStatus(200);
      
            } catch (err) {
              console.error("Webhook Error:", err);
              res.sendStatus(200);
            }
        })


    }
}

module.exports = new initWebhook