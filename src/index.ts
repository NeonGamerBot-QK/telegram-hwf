import { decryptString, encryptString } from './encryption';
import env from './env'
import prisma from "./prisma"
import TelegramBot from 'node-telegram-bot-api';
import { getConstants } from './util/read-constants';
const bot = new TelegramBot(env.TELEGRAM_TOKEN!, {polling: true});
const constants = await getConstants()
bot.on("polling_error", function (err) {
    console.log(err);
});
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
   if(!userEntry) {
    await prisma.user.create({
        data: {
            mainChatId: encryptString(chatId.toString()),
            telegramId: encryptString(msg.from?.id.toString()!)
        }
    }).then(d=>console.log(d))
    bot.sendMessage(chatId, 'Welcome! i just created your account.. here is something your should know\n'+constants.start_string)
   } else {
    bot.sendMessage(chatId, "Hi you are already registered! hi there " + decryptString( userEntry.mainChatId) + "here is the breifing anyways:\n"+constants.start_string)
   }
    } else if (txt == "/help") {
        bot.sendMessage(chatId, "hiii this is a help menu which will be multi lang later...")
    }
})
