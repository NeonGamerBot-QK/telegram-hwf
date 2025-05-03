import { decryptString, encryptString } from './encryption';
import env from './env'
import prisma from "./prisma"
import TelegramBot from 'node-telegram-bot-api';

// console.log(envImport);

const bot = new TelegramBot(env.TELEGRAM_TOKEN!, {polling: true});

bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const txt = msg.text
    if(!txt) return;
    if(!msg.from) return;
    console.log(msg)
    // bot.sendMessage(chatId, "hi")
    if(txt=="/start") {
   const userEntry = await prisma.user.findFirst({
    where: {
        mainChatId: encryptString(chatId.toString())   
    }
   })
   console.log(userEntry)
   if(!userEntry) {
    await prisma.user.create({
        data: {
            mainChatId: encryptString(chatId.toString()),
            telegramId: encryptString(msg.from?.id.toString()!)
        }
    }).then(d=>console.log(d))
    bot.sendMessage(chatId, 'Welcome! i just created your account..')
   } else {
    bot.sendMessage(chatId, "Hi you are already registered! hi there " + decryptString( userEntry.mainChatId))
   }
    }
})