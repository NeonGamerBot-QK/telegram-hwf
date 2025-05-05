import type TelegramBot from "node-telegram-bot-api"
import type { ModifiedTelegramBot } from ".."

export default {
    name: "help",
    run: async (bot: ModifiedTelegramBot, msg: TelegramBot.Message, args: string[]) => {
        bot.sendMessage(msg.chat.id, "hiii this is a help menu which will be multi lang later...")
    }
}