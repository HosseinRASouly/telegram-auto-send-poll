const dotenv = require('dotenv');
dotenv.config();

const adminPass = process.env.ADMIN_PASS;
const userStates = {};

class auth {
    getUserState(userId) {
        return userStates[userId] ?? null;
      }
    
    
    requestPassword(userId) {
        userStates[userId] = "waiting_for_password";
        return "لطفاً رمز عبور را وارد کنید: ";
      }

      checkPassword(userId, password) {
        if (password === adminPass) {
            userStates[userId] = "admin_mode";
            return true;
        }
        delete userStates[userId];
        return null;
      }

    sendResult(result) {
        if (result) {
          return "رمز درست است. /adminPanel را وارد کنید.";
        } else {
          return "رمز عبور اشتباه است";
        }
      }

    isAdmin(userId) {
        return userStates[userId] === "admin_mode";
    }
}

module.exports = new auth();