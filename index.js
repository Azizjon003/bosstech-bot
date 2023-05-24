const { Telegraf, Composer, session, Scenes } = require("telegraf");
// const { Sequelize } = require("sequelize");
const cron = require("node-cron");

const dotenv = require("dotenv");

dotenv.config({});

const TOKEN = process.env.BOT_TOKEN;
const dbUrl = process.env.DB;
const password = process.env.DB_PASS;

const connect = require("./model/index.js");

const bot = new Telegraf(TOKEN);

const newWizart = new Composer();
newWizart.on("text", async (ctx) => {
  ctx.reply("Xabar muvaffaqiyatli yuborildi");
  return ctx.scene.leave();
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
cron.schedule("0 * * * *", () => {
  // Bu qismda har soatda bajarilishi kerak bo'lgan vazifalarni yozing
});

exports.bot = bot;

const start = async () => {
  const changeStream = await connect(dbUrl, password);
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const newElement = change.fullDocument;
      console.log("New element inserted:", newElement);
      const id = newElement?.id;
      const name = newElement?.name;
      const email = newElement?.email;
      const phone = newElement?.phone;
      const message = newElement?.message;

      const text = `Yangi xabar keldi\n\nIsmi: ${name}\nEmail: ${email}\nTelefon raqami: ${phone}\nXabari: ${message}`;
      bot.telegram.sendMessage("6201463713", text);
    }
  });
  console.log("Bot is running");
  bot.launch();
};

start();
