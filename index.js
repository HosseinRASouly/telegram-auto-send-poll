const express = require('express');
const cron = require('node-cron');
const { sendPoll } = require('./src/common/handler');
const AuthController = require("./src/common/modules/auth/auth.controller");
const authController = new AuthController();

require('dotenv').config();

const app = express();

// 
app.use(express.json())

// bot AuthController
authController.initWebhook(app)

// daylee cron
cron.schedule("54 17 * * *", () => {
    console.log("Running daily poll...");
    sendPoll();
});

// bot alive test
app.get("/", (req, res) => res.send("Bot is alive!"));

// run server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
