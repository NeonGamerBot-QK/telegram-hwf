/**
 * @see https://pmc.ncbi.nlm.nih.gov/articles/PMC7749626/ - gov articles
 *
 */

import type TelegramBot from "node-telegram-bot-api";
import type { ModifiedTelegramBot } from "..";
import prisma from "../prisma";
import { decryptString, encryptString } from "../encryption";
import { getEmojiFromName } from "../util/getEmoji";
import { massSend } from "../util/mass-send";

export default {
  name: "feel",
  description: "Log how do u feel",
  usage:
    "[emotions (separated by comma)] [tags (separated by comma)] [description]",
  run: async (
    bot: ModifiedTelegramBot,
    msg: TelegramBot.Message,
    args: string[],
  ) => {
    if (!args[0]) {
      return bot.sendMessage(msg.chat.id, "Please provide emotions");
    }
    // how do u feel
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

    const emotions = args[0].split(",");
    const tags = (args[1] || "").split(",");
    const memo = args.slice(2).join(" ");
    if (emotions.length == 0) {
      return bot.sendMessage(msg.chat.id, "Please provide emotions");
    }
    // create emotion
    await prisma.feeling.create({
      data: {
        types: encryptString(emotions.join(",")),
        tags: encryptString(tags.join(",")),
        description: encryptString(memo),
        User: {
          connect: {
            id: userData.id,
          },
        },
      },
    });
    const string = `${emotions.map((e) => getEmojiFromName(e)) || "X"} - ${memo} (${tags.join(",")})`;
    bot.sendMessage(msg.chat.id, string);
    // TODO: sent to friends list
    const friends = userData.friendsList
      ? JSON.parse(decryptString(userData.friendsList!))
      : [];
    // queue via func
    massSend(bot, string, friends);
  },
};
