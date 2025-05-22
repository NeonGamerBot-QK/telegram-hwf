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
        `Here is your friend code!: ${userData.id}, Your name will be set to \`${msg.chat.id}\` so make sure to tell whoever ur sending this to to set ur name under that chat id`,
      );
    }
    // try to get such friend
    //@ts-ignore stfu
    if(isNaN(friendCode.trim())) {
      return bot.sendMessage(
        msg.chat.id,
        `Invalid friend code, please try again`,
      );
    }
    const friend = await prisma.user.findFirst({
      where: {
        id: parseInt(friendCode.trim()),
      },
    });
    if(!friend) {
      return bot.sendMessage(
        msg.chat.id,
        `No such user with id ${friendCode.trim()}`,
      );
    }
    const currentUserData = await prisma.user.findFirst({
      where: {
        telegramId: encryptString(msg.from!.id.toString()),
      },
    })
    const msgg = await bot.sendMessage(msg.chat.id, "Adding you as a friend, please wait...")
    const myfriendsList = JSON.parse(currentUserData?.friendsList || "[]")
    myfriendsList.push(decryptString(friend.telegramId))
    const friendsFriendList = JSON.parse(friend.friendsList || "[]")
    friendsFriendList.push(decryptString(currentUserData?.telegramId || ""))
    // update the user
     await Promise.all([prisma.user.update({
      //@ts-ignore
      where: {
        telegramId: encryptString(msg.from!.id.toString())!,
      },
      data: {
        friendsList: decryptString(JSON.stringify(myfriendsList))
      },
    }),
     prisma.user.update({
      //@ts-ignore
      where: {
        telegramId: encryptString(friend.telegramId)!,
      },
      data: {
        friendsList: decryptString(JSON.stringify(friendsFriendList))
      },
    })])
await bot.editMessageText("Added you as a friend!", {
  chat_id: msg.chat.id,
  message_id: msgg.message_id,
})
  },
};
