import type TelegramBot from "node-telegram-bot-api";
import type { ModifiedTelegramBot } from "..";
import { decryptString, encryptString } from "../encryption";
import prisma from "../prisma";

export default {
  name: "start",
  description: "telegrams start cmd",
  run: async (
    bot: ModifiedTelegramBot,
    msg: TelegramBot.Message,
    args: string[],
  ) => {
    const constants = bot.constants;
    const chatId = msg.chat.id;
    const userEntry = await prisma.user.findFirst({
      where: {
        mainChatId: encryptString(chatId.toString()),
      },
    });
    if (!userEntry) {
      await prisma.user
        .create({
          data: {
            mainChatId: encryptString(chatId.toString()),
            telegramId: encryptString(msg.from?.id.toString()!),
          },
        })
        .then((d) => console.log(d));
      bot.sendMessage(
        chatId,
        "Welcome! i just created your account.. here is something your should know\n" +
          constants.start_string,
      );
    } else {
      bot.sendMessage(
        chatId,
        "Hi you are already registered! hi there " +
          decryptString(userEntry.mainChatId) +
          "here is the breifing anyways:\n" +
          constants.start_string,
          {
            reply_markup: {
              inline_keyboard: [[
                {
                  text: "Open App",
                  web_app: {
                    url: "https://saahild.com" // Must be HTTPS
                  }
                }
              ]]
            }
          });
    }
  },
};
