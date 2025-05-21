import path from "path";
import type { ModifiedTelegramBot } from "..";
import { readdirSync } from "fs";

export async function loadCommands(bot: ModifiedTelegramBot) {
  for (const file of readdirSync(path.join(__dirname, "../commands"))) {
    try {
      const cmd = (await import(path.join(__dirname, "../commands", file))).default;
      bot.commands.set(cmd.name, cmd);
      console.log(" [I] Loaded command " + cmd.name);
    } catch (e) {
      console.error(e);
      console.error(`[E] Failed to load cmd - ${file}`);
    }
  }
}
