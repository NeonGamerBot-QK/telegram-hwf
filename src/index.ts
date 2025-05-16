import { decryptString, encryptString } from "./encryption";
import env from "./env";
import prisma from "./prisma";
import TelegramBot from "node-telegram-bot-api";
import { getConstants, type Constants } from "./util/read-constants";
import { loadCommands } from "./util/loader";
// @ts-ignore stfu
const bot: ModifiedTelegramBot = new TelegramBot(env.TELEGRAM_TOKEN!, {
  polling: true,
});

export interface ModifiedTelegramBot extends TelegramBot {
  commands: Map<string, any>;
  constants: Constants;
}
bot.commands = new Map();
bot.commands.map = (f: any) => {
  const mv = [];
  bot.commands.forEach((...args) => {
    mv.push(f(...args));
  });
  return mv;
};
loadCommands(bot);
bot.constants = await getConstants();
bot.on("polling_error", function (err) {
  console.log(err);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const txt = msg.text;
  if (!txt || !msg.from) return;
  if (!msg.from) return;
  console.log(msg);
  const args = txt.split(" ");
  const command = args.shift();
  if (!command) return;
  if (command.startsWith("/")) {
    const cmd = bot.commands.get(command.slice(1));
    if (!cmd) return;
    cmd.run(bot, msg, args);
  }
});

startWebServer(bot, env.PORT)
