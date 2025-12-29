const express = require("express");
const axios = require("axios");
const { sendAMessage } = require('../../message.sender');


const {
  requestPassword,
  checkPassword,
  isAdmin,
  sendResult,
  getUserState,
} = require("./auth.service");

class AuthController {
  sendMessage;
  state;
  
  constructor() {
    this.TOKEN = process.env.TOKEN;
    this.sendMessage = sendAMessage;
    this.state = getUserState;
  }

  // ----------------------first Message on Bot--------------------------------------------
  async startMessage(text, userId, chatId) {
    await this.sendMessage(
      chatId,
      "سلام! برای ورود به بخش ادمین /login را بزنید."
    );
  }

  // ------------------------ligin Message on bot------------------------------------------
  async loginMessage(text, userId, chatId) {
    const reply = requestPassword(userId);
    await this.sendMessage(chatId, reply);
  }

  // ------------------------admin password Message on bot------------------------------------------
  async getPassword(text, userId, chatId) {
    const result = checkPassword(userId, text);
    const reply = sendResult(result);
    await this.sendMessage(chatId, reply);
  }

  // ---------------------------admin send a invalid command----------------------------------------------
  async isAdminInvalidCommand(text, userId, chatId) {
    await this.sendMessage(
      chatId,
      "شما ادمین هستید. دستور نامعتبر است."
    );
  }

  // ---------------------------user send a invalid command----------------------------------------------
  async isUserInvalidCommand(text, userId, chatId) {
    await this.sendMessage(
      chatId,
      "دستور نامعتبر است."
    );
  }
}

module.exports = new AuthController;
