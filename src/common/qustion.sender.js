const express = require('express');
const axios = require('axios');
const cron = require('node-cron');
const dotenv = require('dotenv');
dotenv.config();
const chatId = process.env.CHAT_ID;
const token = process.env.TOKEN;

class handlers {
    async sendPoll() {
        try {
            const res = await axios.post(`https://api.telegram.org/bot${token}/sendPoll`, {
                chat_id: chatId,
                question: "بهترین گزینه کدومه؟",
                options: JSON.stringify(["گزینه ۱", "گزینه ۲", "گزینه ۳"]),
                is_anonymous: true,
                type: "quiz",
                correct_option_id: 0,
            });
            console.log("pollSended");
        } catch (err) {
            console.error("Error sending poll:", err.response?.data || err.message);
        }
    }   
}

module.exports = new handlers();