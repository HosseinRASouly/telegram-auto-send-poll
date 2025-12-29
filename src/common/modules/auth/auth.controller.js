const express = require("express");
const axios = require("axios");
const { sendAMessage, getKeyboardsBot } = require('../../message.sender');


const {
  requestPassword,
  checkPassword,
  isAdmin,
  sendResult,
  getUserState,
} = require("./auth.service");

class AuthController {
  sendMessage;
  keyboardsOption;
  state;
  
  constructor() {
    this.TOKEN = process.env.TOKEN;
    this.sendMessage = sendAMessage;
    this.keyboardsOption = getKeyboardsBot;
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

  // ---------------------------user not Admin---------------------------------------------
  async userNotAdmin(text, userId, chatId) {
    await this.sendMessage(
      chatId,
      "شما ادمین نیستید از /login استفاده کنید."
    );
  }

  // ---------------------------user send a invalid command----------------------------------------------
  async isUserInvalidCommand(text, userId, chatId) {
    await this.sendMessage(
      chatId,
      "دستور نامعتبر است."
    );
  }

  // ---------------------------give keyboards option----------------------------------------------
  async adminPanel(text, userId, chatId) {
    await this.keyboardsOption(chatId);

    await this.sendMessage(
      chatId
    );
  }
}

module.exports = new AuthController;
