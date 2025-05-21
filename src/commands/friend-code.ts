import type TelegramBot from "node-telegram-bot-api";
import type { ModifiedTelegramBot } from "..";
import prisma from "../prisma";
import { decryptString, encryptString } from "../encryption";

export default {
  name: "friend",
  description: "pong",
  run: async (
    bot: ModifiedTelegramBot,
    msg: TelegramBot.Message,
    args: string[],
  ) => {
    const userData = await prisma.user.findFirst({
      where: {
        telegramId: encryptString(msg.from!.id.toString()),
      },
    });
    if (!userData) {
      return bot.sendMessage(
        msg.chat.id,
        "You are not registered yet, please run /start ",
      );
    }

    const friendCode = args[0];
    if (!friendCode) {
      return bot.sendMessage(
        msg.chat.id,
        `Here is your friend code!: ${userData.id}`,
      );
    }
  },
};
