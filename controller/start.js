const { bot } = require("../index.js");
// import { shuffle } from "../utility/shuffle";
// const client = require("../test/index");
bot.command("start", async (ctx) => {
  const id = ctx?.from?.id;
  const username = ctx?.from?.username;
  const first_name = ctx?.from?.first_name;
  const last_name = ctx?.from?.last_name;
  let text;
  if (username === "abbossth") {
    text = `Assalomu alaykum <b>${first_name}</b> botimizga xush kelibsiz!.\nMen sizga tushgan contact aloqalarini yuborib turaman`;
  } else {
    text = `Assalomu alaykum <b>${first_name}</b> botimizga xush kelibsiz!.`;
  }
  ctx.replyWithHTML(text);
  return ctx.scene.enter("sceneWizard");
});
