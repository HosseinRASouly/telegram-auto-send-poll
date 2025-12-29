const express = require('express');
const cron = require('node-cron');
const { sendPoll } = require('./src/common/qustion.sender');
const initWebhook = require('./src/app.routes.controller');

require('dotenv').config();

const app = express();


// connect to DataBase
require('./src/config/mongoDB.config')

// middleWares
app.use(express.json())

// bot AuthController
initWebhook.initWebhook(app)

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
