import type TelegramBot from "node-telegram-bot-api"
import type { ModifiedTelegramBot } from ".."
import {getEmojiFromName} from "../util/getEmoji"

export default {
    name: "feelingoptions",
    run: async (bot: ModifiedTelegramBot, msg: TelegramBot.Message, args: string[]) => {
    const strings = bot.constants.allFeelings.map(e=>`${getEmojiFromName(e.category)} - ${e.feeling}`).join('\n')
    bot.sendMessage(msg.chat.id, strings)
    }
}
