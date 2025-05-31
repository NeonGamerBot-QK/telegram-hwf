import type TelegramBot from "node-telegram-bot-api";
import type { ModifiedTelegramBot } from "..";
import prisma from "../prisma";
import { encryptString } from "../encryption";

export default {
  name: "prevfeelings",
  description: "What did i prev log huh...",
  run: async (
    bot: ModifiedTelegramBot,
    msg: TelegramBot.Message,
    args: string[],
  ) => {
    // bot.sendMessage(msg.chat.id, "ping pong " + args.join(" "));
const userWithFeelings = await prisma.user.findUnique({
  where: {
        telegramId: encryptString(msg.from!.id.toString()),
  },
  include: {
    feelings: true
  }
})
if(!userWithFeelings) {
    return bot.sendMessage(msg.chat.id, "You are not registered yet, please run /start ");
}
if(userWithFeelings.feelings.length === 0) {
    return bot.sendMessage(msg.chat.id, "You have no previous feelings logged yet, please run /feel to log your feelings.");
}
console.log(userWithFeelings?.feelings)
// TODO: finish this cmd :3 
},
};
