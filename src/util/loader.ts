import path from "path";
import type { ModifiedTelegramBot } from "..";
import { readdirSync } from "fs";

export function loadCommands(bot: ModifiedTelegramBot){
for(const file of readdirSync(path.join(__dirname, '../commands'))){
    const cmd = require(path.join(__dirname, '../commands', file)).default;
    bot.commands.set(cmd.name, cmd);
    console.log(" [I] Loaded command " + cmd.name);
}
}