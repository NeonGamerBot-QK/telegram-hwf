import type TelegramBot from "node-telegram-bot-api";
import type { ModifiedTelegramBot } from "..";
import { getEmojiFromName } from "../util/getEmoji";

export default {
  name: "feelingoptions",
  description: "Lists all possible feeling options by category",
  run: async (
    bot: ModifiedTelegramBot,
    msg: TelegramBot.Message,
    args: string[],
  ) => {
    const feelings: { [key: string]: any[] } = {};
    for (const emotion of bot.constants.allFeelings) {
      if (!feelings[emotion.category]) feelings[emotion.category] = [];
      feelings[emotion.category].push(emotion);
    }

    if (!args[0]) {
      bot.sendMessage(
        msg.chat.id,
        `Your missing a category to list?\n${Object.keys(feelings)
          .map((d) => `${d} - ${feelings[d].length} emotions`)
          .join("\n")}`,
      );
    } else {
      const selection = feelings[args[0]];
      if (!selection) {
        return bot.sendMessage(
          msg.chat.id,
          `Cant find the emotion: ${args[0]}`,
        );
      }
      let str = "";
      for (const { feeling, category } of selection) {
        str += `${getEmojiFromName(category)}: ${feeling}\n`;
      }
      bot.sendMessage(msg.chat.id, str);
    }
  },
};
