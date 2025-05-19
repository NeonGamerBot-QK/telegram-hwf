/**
 * @see https://pmc.ncbi.nlm.nih.gov/articles/PMC7749626/ - gov articles
 *
*/

import type TelegramBot from "node-telegram-bot-api";
import type { ModifiedTelegramBot } from "..";

export default {
    name: "feel",
    description: "Log how do u feel",
    run: async (
        bot: ModifiedTelegramBot,
        msg: TelegramBot.Message,
        args: string[],
    ) => {
        // how do u feel
    },
};
