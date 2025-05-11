import type TelegramBot from "node-telegram-bot-api"
import type { ModifiedTelegramBot } from ".."

export default {
    name: "ping",
    description: "pong",
    run: async (bot: ModifiedTelegramBot, msg: TelegramBot.Message, args: string[]) => {
        bot.sendMessage(msg.chat.id, "ping pong "+ args.join(" "))
    }
}
