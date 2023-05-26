const { bot } = require("../index.js");
const { keyboardMain } = require("../utility/keyboard.js");
// import { shuffle } from "../utility/shuffle";
// const client = require("../test/index");
bot.command("start", async (ctx) => {
  const id = ctx?.from?.id;
  const username = ctx?.from?.username;
  const first_name = ctx?.from?.first_name;
  const last_name = ctx?.from?.last_name;
  let text;
  if (username === "coder_aaaa") {
    text = `Assalomu alaykum <b>${first_name}</b> botimizga xush kelibsiz!.\n <i>Men sizga tushgan contact aloqalarini yuborib turaman</i>`;

    ctx.replyWithHTML(text, keyboardMain);
  } else {
    text = `Assalomu alaykum <b>${first_name}</b> botimizga xush kelibsiz!.`;
    ctx.replyWithHTML(text);
  }

  return ctx.scene.enter("sceneWizard");
});
