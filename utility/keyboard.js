const { Markup } = require("telegraf");

 const keyboardMain = Markup.inlineKeyboard([
  Markup.button.callback("Foydalanuvchilar ro'yhati", "call"),
  Markup.button.callback("Xabarlar ro'yhati", "message"),
]);

module.exports = { keyboardMain };