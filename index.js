const { Telegraf, Composer, session, Scenes } = require("telegraf");
// const { Sequelize } = require("sequelize");
const cron = require("node-cron");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({});

const TOKEN = process.env.BOT_TOKEN;
const dbUrl = process.env.DB;
const password = process.env.DB_PASS;

const connect = require("./model/index.js");
const Message = require("./model/user.js");

const bot = new Telegraf(TOKEN);

const newWizart = new Composer();
newWizart.action("call", async (ctx) => {
  ctx.reply("Foydalanuvchilar ro'yhati");
});
exports.newWizart = newWizart;

const menuSchema = new Scenes.WizardScene("sceneWizard", newWizart);

const stage = new Scenes.Stage([menuSchema]);
bot.use(session());
bot.use(stage.middleware());

import("./controller/start.js");

// bot.on("my_chat_member", (ctx) => {
//   console.log(ctx.update);
// });
bot.catch((error, ctx) => {
  console.log(error);
  const id = ctx?.from?.id;
  console.log(error.stack);
  if (id) {
    ctx.telegram.sendMessage(id, "Xatolik yuz berdi /start ni bosing ");
  }
});



exports.bot = bot;

const start = async () => {
  const data = await connect(dbUrl, password);
  const changeStream = data.changeStream;
  const db = data.db;
  changeStream.on("change", async (change) => {
    if (change.operationType === "insert") {
      const newData = change.fullDocument;
      console.log("New element inserted:", newData);
      const id = newData?.id;
      const name = newData?.name;
      const email = newData?.emailOrPhone;

      const message = newData?.message;
      const count = await db.db().collection("messages").countDocuments();
      console.log(count);
      const text = `<b>🔔 New Message</b>\n\n <b>📌 Application Number:</b> #${count}\n\n ****************\n<b>Name</b>: ${name}\n<b>Email-Phone</b>: ${email}\n<b>Message</b>: ${message}`;
      bot.telegram.sendMessage("-1001671077929", text, {
        parse_mode: "HTML",
      });
    }
  });
  console.log("Bot is running");

  bot.launch();
};

start();
