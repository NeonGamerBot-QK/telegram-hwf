import type TelegramBot from "node-telegram-bot-api";
import type { ModifiedTelegramBot } from "..";

export default {
  name: "help",
  description: "The help menu!",
  run: async (
    bot: ModifiedTelegramBot,
    msg: TelegramBot.Message,
    args: string[],
  ) => {
    //@ts-ignore
    const cmds = bot.commands.map(
      (d: any) => `/${d.name} ${d.usage ?? ""} - ${d.description}`,
    );
    bot.sendMessage(
      msg.chat.id,
      `Commands list (${cmds.length}):\n${cmds.join("\n")}`,
    );
  },
};
